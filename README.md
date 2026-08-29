# HIMEHINA Grand Finale 上海民间观影

HIMEHINA WORLD Tour 2026 Grand Finale 中国上海非官方民间观影活动页面。项目使用 React、TypeScript 与 Vite 构建。

## 本地开发

需要 Node.js 22 或更高版本。

```bash
npm install
npm run dev
```

测试及生产构建：

```bash
npm test
npm run build
npm run preview
```

## Cloudflare Pages

在 Cloudflare Pages 中连接本仓库并配置：

- Framework preset：`Vite`
- Build command：`npm run build`
- Build output directory：`dist`
- Node.js version：`22`

项目是纯静态单页，无需 Functions 或环境变量。`wrangler.jsonc` 将静态资源目录设为 `dist`，并通过 `assets.not_found_handling` 的 `single-page-application` 模式将前端路由回退到根 `index.html`，支持直接访问或刷新 `/greet/utamita-sai`。

## 说明

本项目为非官方粉丝活动页面。HIMEHINA 名称、角色及宣传视觉素材的权利归其各自权利人所有。
