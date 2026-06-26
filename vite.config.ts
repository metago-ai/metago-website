import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // 相对路径，同时兼容 CloudBase 根路径部署与 GitHub Pages 子路径部署
  base: './',
  plugins: [
    react(),
    {
      name: 'metago-spa-fallback',
      // build 结束后，为每个路由路径生成对应的入口 HTML 副本，
      // 兼容 CloudBase 静态托管不支持 SPA rewrite 的场景。
      closeBundle() {
        const distIndex = resolve(__dirname, 'dist/index.html')
        if (!existsSync(distIndex)) return
        const routes = ['product', 'platforms', 'docs', 'enterprise', 'about']
        for (const r of routes) {
          copyFileSync(distIndex, resolve(__dirname, `dist/${r}`))
          copyFileSync(distIndex, resolve(__dirname, `dist/${r}.html`))
        }
        // eslint-disable-next-line no-console
        console.log(`[metago-spa-fallback] Generated ${routes.length * 2} fallback files for SPA routes.`)
      },
    },
  ],
})
