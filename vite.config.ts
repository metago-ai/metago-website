import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 相对路径，同时兼容 CloudBase 根路径部署与 GitHub Pages 子路径部署
  base: './',
  plugins: [react()],
})
