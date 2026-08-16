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

项目是纯静态单页，无需 Functions、环境变量或额外重写规则。

## GitHub Pages

仓库已包含 `.github/workflows/deploy-pages.yml`。在仓库 Settings → Pages 中将 Source 设为 GitHub Actions；推送到 `main` 后会自动测试、构建并部署。

Vite 使用相对资源基址，因此支持 `https://username.github.io/repository-name/` 形式的仓库子路径。

## 说明

本项目为非官方粉丝活动页面。HIMEHINA 名称、角色及宣传视觉素材的权利归其各自权利人所有。
