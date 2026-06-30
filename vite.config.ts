import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // 相对路径，同时兼容 CloudBase 根路径部署与 GitHub Pages 子路径部署
  base: './',
  build: {
    rollupOptions: {
      output: {
        // vendor 分割：核心库单独打包，利用浏览器长期缓存
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor'
            if (id.includes('i18next')) return 'i18n-vendor'
            if (id.includes('lucide-react')) return 'icons'
          }
        },
      },
    },
    // 提高警告阈值，避免 vendor 分割后仍报警告
    chunkSizeWarningLimit: 600,
  },
  plugins: [
    react(),
    {
      name: 'metago-spa-fallback',
      // build 结束后，为每个路由路径生成子目录 index.html，
      // 让 CloudBase 静态托管按目录索引返回正确的 Content-Type: text/html。
      // 关键：子目录 index.html 中的资源引用必须用 ../ 前缀，
      // 否则浏览器在 /enterprise/ 下会找 /enterprise/assets/...（不存在），导致白屏。
      // 注意：不能用无扩展名文件，会被识别为 application/octet-stream 触发下载。
      closeBundle() {
        const distIndex = resolve(__dirname, 'dist/index.html')
        if (!existsSync(distIndex)) return
        const html = readFileSync(distIndex, 'utf8')
        // 把所有 ./xxx 资源引用改为 ../xxx（仅作用于 src/href 属性值）
        const rewritten = html.replace(
          /((?:src|href)\s*=\s*")\.\/([^"]*")/g,
          '$1../$2',
        )
        const routes = [
          'whitepaper', 'engine', 'axioms', 'evolution',
          'product', 'platforms', 'docs', 'demo', 'enterprise', 'about', 'manifesto',
        ]
        for (const r of routes) {
          const dir = resolve(__dirname, 'dist', r)
          if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
          writeFileSync(resolve(dir, 'index.html'), rewritten, 'utf8')
        }
        // eslint-disable-next-line no-console
        console.log(`[metago-spa-fallback] Generated ${routes.length} route directories with ../ resource paths.`)
      },
    },
  ],
})
