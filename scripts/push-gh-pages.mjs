// 用 GitHub Git Database API 推送 dist/ 到 gh-pages 分支
// 步骤：收集文件 → 创建 blobs → 创建新 tree（无 base_tree，完全替换）→ 创建 commit → PATCH ref（force）
// 用法：先设置环境变量 METAGO_GH_TOKEN，然后 node scripts/push-gh-pages.mjs
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

const TOKEN = process.env.METAGO_GH_TOKEN;
if (!TOKEN) {
  console.error('错误：未设置 METAGO_GH_TOKEN 环境变量');
  console.error('用法：$env:METAGO_GH_TOKEN="<your-github-token>"; node scripts/push-gh-pages.mjs');
  process.exit(1);
}
const OWNER = 'metago-ai';
const REPO = 'metago-website';
const DIST_DIR = path.resolve('dist');
const BRANCH = 'gh-pages';

function api(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request({
      method,
      hostname: 'api.github.com',
      path: `/repos/${OWNER}/${REPO}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'metago-deploy',
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      },
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString('utf8');
        let parsed;
        try { parsed = JSON.parse(text); } catch { parsed = text; }
        resolve({ status: res.statusCode, body: parsed, raw: text });
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

// 递归收集目录下所有文件，返回 [{absPath, relPath}]
function collectFiles(dir, base = dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...collectFiles(abs, base));
    } else if (entry.isFile()) {
      result.push({ absPath: abs, relPath: path.relative(base, abs).replace(/\\/g, '/') });
    }
  }
  return result;
}

(async () => {
  console.log('=== 推送 dist/ 到 gh-pages 分支 ===\n');

  // 1. 收集文件
  const files = collectFiles(DIST_DIR);
  console.log(`1. 收集到 ${files.length} 个文件:`);
  files.forEach((f) => console.log(`   - ${f.relPath}  (${fs.statSync(f.absPath).size} bytes)`));

  // 2. 获取 gh-pages 当前 HEAD（作为 parent）
  console.log(`\n2. 获取 gh-pages HEAD（parent）...`);
  const refRes = await api('GET', `/git/ref/heads/${BRANCH}`);
  if (refRes.status !== 200) {
    console.log(`   失败: ${refRes.status} ${refRes.raw.slice(0, 300)}`);
    process.exit(1);
  }
  const parentSha = refRes.body.object.sha;
  console.log(`   parentSha: ${parentSha}`);

  // 3. 为每个文件创建 blob（base64）
  console.log(`\n3. 创建 blobs...`);
  const treeItems = [];
  for (const f of files) {
    const content = fs.readFileSync(f.absPath);
    const base64 = content.toString('base64');
    const blobRes = await api('POST', '/git/blobs', { content: base64, encoding: 'base64' });
    if (blobRes.status !== 201) {
      console.log(`   失败 ${f.relPath}: ${blobRes.status} ${blobRes.raw.slice(0, 200)}`);
      process.exit(1);
    }
    treeItems.push({
      path: f.relPath,
      mode: '100644',
      type: 'blob',
      sha: blobRes.body.sha,
    });
    process.stdout.write(`   ✓ ${f.relPath} (${content.length}B → blob ${blobRes.body.sha.slice(0, 7)})\n`);
  }
  console.log(`   全部 ${treeItems.length} 个 blob 创建完成`);

  // 4. 创建新 tree（不带 base_tree，完全替换）
  console.log(`\n4. 创建新 tree（完全替换，无 base_tree）...`);
  const treeRes = await api('POST', '/git/trees', { tree: treeItems });
  if (treeRes.status !== 201) {
    console.log(`   失败: ${treeRes.status} ${treeRes.raw.slice(0, 300)}`);
    process.exit(1);
  }
  const newTreeSha = treeRes.body.sha;
  console.log(`   新 tree sha: ${newTreeSha}`);

  // 5. 创建 commit（parent = gh-pages HEAD）
  console.log(`\n5. 创建 commit...`);
  const commitRes = await api('POST', '/git/commits', {
    message: 'deploy: website with Demo page\n\n- 新增 Demo 演示页面（三场景：risk/codeReview/metaEvolve）\n- 新增 demo-animation.html（832 行单文件动画）\n- 导航栏新增 "演示"/"Demo" 入口\n- 中英双语完整翻译\n- SPA fallback 修复 demo 路由\n\nGenerated: 2026-06-30',
    tree: newTreeSha,
    parents: [parentSha],
  });
  if (commitRes.status !== 201) {
    console.log(`   失败: ${commitRes.status} ${commitRes.raw.slice(0, 300)}`);
    process.exit(1);
  }
  const newCommitSha = commitRes.body.sha;
  console.log(`   新 commit sha: ${newCommitSha}`);

  // 6. PATCH ref（force: true，因为是孤儿分支替换）
  console.log(`\n6. 更新 gh-pages ref（force: true）...`);
  const patchRes = await api('PATCH', `/git/refs/heads/${BRANCH}`, {
    sha: newCommitSha,
    force: true,
  });
  if (patchRes.status !== 200) {
    console.log(`   失败: ${patchRes.status} ${patchRes.raw.slice(0, 300)}`);
    process.exit(1);
  }
  console.log(`   ✓ gh-pages 已更新到 ${newCommitSha}`);
  console.log(`\n=== 部署完成 ===`);
  console.log(`GitHub Pages URL: https://metago-ai.github.io/metago-website/`);
  console.log(`Demo URL: https://metago-ai.github.io/metago-website/#/demo`);
  console.log(`demo-animation.html URL: https://metago-ai.github.io/metago-website/demo-animation.html`);
})().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
