import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // 相对路径，同时兼容 CloudBase 根路径部署与 GitHub Pages 子路径部署
  base: './',
  plugins: [
    react(),
    {
      name: 'metago-spa-fallback',
      // build 结束后，为每个路由路径生成子目录 index.html，
      // 让 CloudBase 静态托管按目录索引返回正确的 Content-Type: text/html。
      // 注意：不能用无扩展名文件，会被识别为 application/octet-stream 触发下载。
      closeBundle() {
        const distIndex = resolve(__dirname, 'dist/index.html')
        if (!existsSync(distIndex)) return
        const routes = ['product', 'platforms', 'docs', 'enterprise', 'about']
        for (const r of routes) {
          const dir = resolve(__dirname, 'dist', r)
          if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
          copyFileSync(distIndex, resolve(dir, 'index.html'))
        }
        // eslint-disable-next-line no-console
        console.log(`[metago-spa-fallback] Generated ${routes.length} route directories with index.html.`)
      },
    },
  ],
})
