// 为 metagolifeform 仓库创建孤儿 gh-pages 分支，含重定向到 metago-website 的 index.html
// 解决用户访问 https://metago-ai.github.io/metagolifeform/ 时 404 问题
import https from 'node:https';

const TOKEN = process.env.METAGO_GH_TOKEN;
if (!TOKEN) {
  console.error('错误：未设置 METAGO_GH_TOKEN');
  process.exit(1);
}
const OWNER = 'metago-ai';
const REPO = 'metagolifeform'; // 实际仓库名（无连字符）
const TARGET = 'https://metago-ai.github.io/metago-website/';

function api(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      method,
      hostname: 'api.github.com',
      path: `/repos/${OWNER}/${REPO}${path}`,
      headers: {
        Authorization: `token ${TOKEN}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'metago-setup-pages',
        'Content-Type': 'application/json',
        'Content-Length': data ? Buffer.byteLength(data) : 0,
      },
    }, (res) => {
      let buf = '';
      res.on('data', (c) => (buf += c));
      res.on('end', () => {
        const json = buf ? JSON.parse(buf) : {};
        if (res.statusCode >= 400) {
          reject(new Error(`${res.statusCode} ${method} ${path}\n${buf}`));
        } else {
          resolve({ status: res.statusCode, data: json });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

const REDIRECT_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MetaGO Lifeform · 跳转中</title>
<meta http-equiv="refresh" content="0; url=${TARGET}">
<meta name="robots" content="noindex">
<script>location.replace('${TARGET}');</script>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;background:#0d1117;color:#c9d1d9;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center}
a{color:#56d4b0;text-decoration:none;font-weight:600}
h1{font-size:20px;margin-bottom:8px}
p{color:#8b949e;margin:8px 0}
</style>
</head>
<body>
<div>
<h1>MetaGO Lifeform</h1>
<p>正在跳转到官方网站 / Redirecting to official website</p>
<p style="margin-top:12px"><a href="${TARGET}">点击进入 / Click to enter</a></p>
</div>
</body>
</html>`;

async function main() {
  console.log('=== Step 1: 创建重定向 index.html blob ===');
  const blob = await api('POST', '/git/blobs', {
    content: REDIRECT_HTML,
    encoding: 'utf-8',
  });
  console.log(`  blob sha: ${blob.data.sha}`);
  console.log(`  size: ${blob.data.size} bytes`);

  console.log('\n=== Step 2: 创建孤儿 tree（仅含 index.html，无 base_tree）===');
  const tree = await api('POST', '/git/trees', {
    tree: [
      { path: 'index.html', mode: '100644', type: 'blob', sha: blob.data.sha },
    ],
  });
  console.log(`  tree sha: ${tree.data.sha}`);

  console.log('\n=== Step 3: 创建孤儿 commit（无 parent）===');
  const commit = await api('POST', '/git/commits', {
    message: 'chore(pages): init gh-pages redirect to metago-website\n\n用户访问 github.com/metago-ai/metagolifeform 后自然以为 Pages URL 也是 metagolifeform，\n但实际 Pages 在 metago-website 仓库。创建孤儿 gh-pages 分支只含重定向页面，\n让 https://metago-ai.github.io/metagolifeform/ 自动跳转到正确官网。',
    tree: tree.data.sha,
  });
  console.log(`  commit sha: ${commit.data.sha}`);

  console.log('\n=== Step 4: 创建 gh-pages ref（若已存在则强制更新）===');
  try {
    const ref = await api('POST', '/git/refs', {
      ref: 'refs/heads/gh-pages',
      sha: commit.data.sha,
    });
    console.log(`  ref created: ${ref.data.ref} -> ${ref.data.object.sha.slice(0, 7)}`);
  } catch (e) {
    console.log('  ref create failed, patching existing ref...');
    const ref = await api('PATCH', '/git/refs/heads/gh-pages', {
      sha: commit.data.sha,
      force: true,
    });
    console.log(`  ref patched: -> ${ref.data.object.sha.slice(0, 7)}`);
  }

  console.log('\n=== Step 5: 启用 Pages（source: gh-pages / root）===');
  try {
    const pages = await api('POST', '/pages', {
      source: { branch: 'gh-pages', path: '/' },
    });
    console.log(`  Pages enabled: ${pages.data.html_url}`);
    console.log(`  status: ${pages.data.status}`);
  } catch (e) {
    console.log(`  Pages enable failed (可能已启用): ${e.message.split('\n')[0]}`);
  }

  console.log('\n=== Step 6: 查询 Pages 最终状态 ===');
  const info = await api('GET', '/pages');
  console.log(`  html_url: ${info.data.html_url}`);
  console.log(`  status: ${info.data.status}`);
  console.log(`  source: ${info.data.source.branch}/${info.data.source.path}`);
  console.log(`  build_type: ${info.data.build_type}`);
}

main().catch((e) => {
  console.error('FATAL:', e.message);
  process.exit(1);
});
