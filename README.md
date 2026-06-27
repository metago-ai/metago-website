# MetaGO Lifeform Kit — 官方网站

> 元构超级智能生命体标准安装包的官方网站与文档门户。

[![Deploy](https://img.shields.io/badge/deploy-CloudBase-blue)](https://metago-d6gfw1e4rf2a5bcad-1257074864.tcloudbaseapp.com/)
[![Version](https://img.shields.io/badge/version-v36.4.13-blueviolet)](https://gitee.com/metago/metagolifeform/releases)
[![License](https://img.shields.io/badge/license-MIT-success)](./LICENSE)

## 简介

本仓库托管 MetaGO Lifeform Kit 的官方网站源码，提供产品介绍、平台支持、文档入口与企业服务对接。网站采用中英双语，已部署至腾讯云 CloudBase。

- 官方线上地址：<https://metago-d6gfw1e4rf2a5bcad-1257074864.tcloudbaseapp.com/>
- GitHub Pages 备用：<https://metago-ai.github.io/metago-website/>
- 产品仓库：<https://gitee.com/metago/metagolifeform>

## 技术栈

- **React 19** + **TypeScript**
- **Vite 8** 构建工具
- **Tailwind CSS 3** 样式框架
- **react-router-dom**（HashRouter 路由）
- **react-i18next** 中英双语国际化
- **lucide-react** 图标库

## 网站结构

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | Hero、核心特性、平台支持、快速安装、指标统计 |
| `/product` | 产品 | 22 技能族分组、五大能力支柱 |
| `/platforms` | 平台支持 | 7 大平台安装命令与配置路径 |
| `/docs` | 文档 | 快速开始、安装指南、FAQ 链接 |
| `/enterprise` | 企业版 | 商业版能力与联系方式 |
| `/about` | 关于 | 愿景使命、路线图、仓库链接 |

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 构建生产版本（输出到 dist/）
npm run build

# 预览构建结果
npm run preview
```

## 国际化

- 中文语言包：`src/locales/zh.json`
- 英文语言包：`src/locales/en.json`
- 切换语言：通过导航栏语言切换按钮

## SEO 优化

- `index.html` 已配置 Open Graph / Twitter Card / meta description
- `public/sitemap.xml` 站点地图
- `public/robots.txt` 爬虫规则
- `public/favicon.svg` 站点图标

## 部署

### 腾讯云 CloudBase（主部署）

推送到 `main` 分支自动触发 CloudBase 静态托管部署。

### GitHub Pages（备用）

```bash
npm run build
# 将 dist/ 推送至 gh-pages 分支
```

## 项目结构

```
metago-website/
├── index.html              # HTML 入口（含 SEO meta）
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── public/
│   ├── favicon.svg         # 站点图标
│   ├── metago-logo.png     # Logo 图片
│   ├── robots.txt          # 爬虫规则
│   └── sitemap.xml         # 站点地图
└── src/
    ├── App.tsx             # 路由配置
    ├── main.tsx            # 应用入口
    ├── components/         # 通用组件（Navbar/Footer/Terminal 等）
    ├── pages/              # 6 大页面
    └── locales/            # 中英语言包
```

## 相关仓库

- **MetaGO Lifeform Kit（产品）**：<https://gitee.com/metago/metagolifeform>
- **GitHub 镜像**：<https://github.com/metago-ai/metago-website>

## 联系方式

- 邮箱：<researcher.yi@youfer.cn>
- Gitee：<https://gitee.com/metago>
- GitHub：<https://github.com/metago-ai>

## 许可证

MIT License — 详见 [LICENSE](./LICENSE)

---

© 2026 MetaGO Lightyear. 元构超级智能生命体标准安装包.
