// 测试各种可能的 URL，找出哪个返回 "There isn't a GitHub Pages site here."
import https from 'node:https';

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({
        status: res.statusCode,
        headers: res.headers,
        body: Buffer.concat(chunks).toString('utf8'),
      }));
    });
    req.on('error', reject);
  });
}

(async () => {
  const urls = [
    'https://metago-ai.github.io/',                              // 组织根
    'https://metago-ai.github.io/metago-website',                 // 无尾部斜杠
    'https://metago-ai.github.io/metago-website/',                // 正确 URL
    'https://metago-ai.github.io/metago-website/#/demo',           // hash 路由
    'https://metago-ai.github.io/metago-website/demo',             // 无 .html 无 /
    'https://metago-ai.github.io/metago-website/demo/',            // 路由目录
    'https://metago-ai.github.io/metago-website/demo-animation',  // 无 .html
    'https://metago-ai.github.io/metago-website/demo-animation.html', // 正确
    'https://metago-ai.github.io/metagolifeform/',                // 错误仓库名
    'https://metago-ai.github.io/metago-lifeform/',               // 另一个可能仓库名
  ];

  for (const url of urls) {
    try {
      const r = await httpsGet(url);
      const isPages404 = r.body.includes("There isn't a GitHub Pages site here");
      const hasDemoContent = r.body.includes('MetaGO') || r.body.includes('Lifeform') || r.body.includes('SCENARIOS');
      console.log(`[${r.status}] ${url}`);
      console.log(`    bodyLen=${r.body.length}  Pages404=${isPages404}  hasDemoContent=${hasDemoContent}`);
      if (isPages404) {
        console.log(`    >>> 这就是用户看到的 404！`);
        console.log(`    body 前 500 字: ${r.body.slice(0, 500)}`);
      }
    } catch (e) {
      console.log(`[ERR] ${url}: ${e.message}`);
    }
    console.log('');
  }
})();
