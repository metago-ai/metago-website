# MetaGO Lifeform Kit — 官方网站

> 元构超级智能生命体标准安装包的官方网站与文档门户。
>
> **让智能，学会进化。从 Agent 到生命体的范式跃迁。**

<p align="center">
  <a href="https://metago.life"><img alt="Website" src="https://img.shields.io/badge/Website-MetaGO-00d4ff"></a>
  <a href="https://metago.life/studio/"><img alt="Studio" src="https://img.shields.io/badge/Studio-可视化编排-10d985?logo=react"></a>
  <a href="https://github.com/metago-ai/metagolifeform/releases"><img alt="Release" src="https://img.shields.io/badge/Release-v36.7.10-blue"></a>
  <a href="https://www.npmjs.com/package/metago-lifeform"><img alt="npm" src="https://img.shields.io/npm/v/metago-lifeform.svg?logo=npm&color=CB3837"></a>
  <a href="https://www.npmjs.com/package/metago-lifeform"><img alt="npm downloads" src="https://img.shields.io/npm/dm/metago-lifeform.svg?logo=npm&color=10d985&label=downloads"></a>
  <a href="./LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-success"></a>
</p>

## 简介

本仓库托管 MetaGO Lifeform Kit 的官方网站源码，提供产品介绍、平台支持、文档入口与企业服务对接。网站采用中英双语，已部署至腾讯云 CloudBase。

- **官方线上地址**：<https://metago.life/>
- **Studio 可视化编排**：<https://metago.life/studio/>
- **产品仓库（Gitee）**：<https://gitee.com/metago/metagolifeform>
- **产品仓库（GitHub）**：<https://github.com/metago-ai/metagolifeform>

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
| `/product` | 产品 | 37 技能族分组、五大能力支柱 |
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

```bash
# 手动部署
tcb hosting deploy ./dist --env-id metago-d6gfw1e4rf2a5bcad
```

> ⚠️ 严重警告：禁止使用 `tcb hosting deploy ./dist` 不带 `cloudPath` 的形式，会覆盖根目录全部文件。如需部署 Studio，必须使用 `tcb hosting deploy ./dist studio`。

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

## 🌐 MetaGO 产品矩阵

MetaGO 已从单一 Kit 进化为完整的产品矩阵：

| 产品线 | 产品 | 描述 |
|--------|------|------|
| **核心** | [Lifeform Kit](https://gitee.com/metago/metagolifeform) | 37 技能 + 7 平台适配器（MIT 开源） |
| **核心** | [MCP Server](https://www.npmjs.com/package/@metago-ai/mcp-server) | 35 tools + 8 prompts 的 MCP 服务 |
| **平台工具** | [Studio](https://metago.life/studio/) | 可视化技能编排平台（SaaS） |
| **平台工具** | [CLI](https://www.npmjs.com/package/metago-cli) | 跨平台命令行工具 |
| **垂直包** | [Dev Kit](https://www.npmjs.com/package/@metago-ai/dev-kit) | 开发者增强包（4 专用技能） |
| **生态** | [Engine](https://www.npmjs.com/package/@metago-ai/engine) | 元构全息智能引擎核心本体 |
| **生态** | [Skills SDK](https://gitee.com/metago/skills-sdk) | TypeScript 技能开发 SDK |
| **生态** | [Certify](https://www.npmjs.com/package/@metago-ai/certify) | 技能认证体系（Gold/Silver） |

> 完整战略规划：[商业战略 V1.0](https://gitee.com/metago/metagolifeform/blob/main/docs/BUSINESS-STRATEGY-V1.0.md)

## 相关仓库

- **MetaGO Lifeform Kit（产品）**：<https://gitee.com/metago/metagolifeform>
- **MetaGO Studio（可视化编排）**：<https://gitee.com/metago/metago-studio>
- **GitHub 主组织**：<https://github.com/metago-ai>
- **GitHub 镜像**：<https://github.com/metago-ai/metago-website>

## 联系方式

- 官方邮箱：<metago@metago.life>
- Gitee：<https://gitee.com/metago>
- GitHub：<https://github.com/metago-ai>
- 商务合作：metago@metago.life（标题 `[商务合作]`）
- Pro Beta 申请：metago@metago.life（标题 `[Pro Beta] 申请`）

## 许可证

MIT License — 详见 [LICENSE](./LICENSE)

---

© 2026 MetaGO Lightyear. 元构超级智能生命体标准安装包.
