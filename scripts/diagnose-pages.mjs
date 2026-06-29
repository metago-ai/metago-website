// 诊断 GitHub Pages 404 问题
import https from 'node:https';

const TOKEN = process.env.METAGO_GH_TOKEN;
if (!TOKEN) {
  console.error('错误：未设置 METAGO_GH_TOKEN 环境变量');
  process.exit(1);
}
const OWNER = 'metago-ai';
const REPO = 'metago-website';

function api(path) {
  return new Promise((resolve, reject) => {
    const req = https.get({
      hostname: 'api.github.com',
      path: `/repos/${OWNER}/${REPO}${path}`,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'metago-diagnose',
      },
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
  });
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
  });
}

(async () => {
  console.log('=== 1. GitHub Pages 配置状态 ===');
  const pagesRes = await api('/pages');
  console.log(`GET /pages status=${pagesRes.status}`);
  console.log(`body: ${pagesRes.body}`);

  console.log('\n=== 2. gh-pages 分支是否存在 ===');
  const refRes = await api('/git/ref/heads/gh-pages');
  console.log(`GET /git/ref/heads/gh-pages status=${refRes.status}`);
  console.log(`body: ${refRes.body.slice(0, 500)}`);

  console.log('\n=== 3. 仓库分支列表 ===');
  const branchesRes = await api('/branches');
  console.log(`GET /branches status=${branchesRes.status}`);
  if (branchesRes.status === 200) {
    const branches = JSON.parse(branchesRes.body);
    console.log(`分支数: ${branches.length}`);
    branches.forEach((b) => console.log(`  - ${b.name}  protected=${b.protected}`));
  }

  console.log('\n=== 4. 实际访问 GitHub Pages URL ===');
  const urls = [
    'https://metago-ai.github.io/metago-website/',
    'https://metago-ai.github.io/metago-website/demo-animation.html',
    'https://metago-ai.github.io/metago-website/index.html',
  ];
  for (const url of urls) {
    const r = await httpsGet(url);
    console.log(`[${r.status}] ${url}  bodyLen=${r.body.length}`);
    if (r.status === 404) {
      console.log(`  body: ${r.body.slice(0, 500)}`);
    }
  }

  console.log('\n=== 5. Pages 构建历史 ===');
  const buildsRes = await api('/pages/builds');
  console.log(`GET /pages/builds status=${buildsRes.status}`);
  if (buildsRes.status === 200) {
    const builds = JSON.parse(buildsRes.body);
    const list = Array.isArray(builds) ? builds : (builds.builds || []);
    console.log(`构建数: ${list.length}`);
    list.slice(0, 5).forEach((b) => {
      console.log(`  - ${b.commit}  status=${b.status}  created_at=${b.created_at}`);
    });
  } else {
    console.log(`body: ${buildsRes.body.slice(0, 500)}`);
  }

  console.log('\n=== 6. 仓库设置（检查 has_pages）===');
  const repoRes = await api('');
  console.log(`GET /repos/... status=${repoRes.status}`);
  if (repoRes.status === 200) {
    const repo = JSON.parse(repoRes.body);
    console.log(`has_pages: ${repo.has_pages}`);
    console.log(`default_branch: ${repo.default_branch}`);
    console.log(`visibility: ${repo.visibility}`);
  }
})();
