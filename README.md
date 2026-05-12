# 国信导航 (gxdh)

精选网址导航站，提供 AI 工具、开发资源、设计工具、影音娱乐等多分类快捷入口。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript (strict mode)
- **UI**: shadcn/ui + Tailwind CSS v4 + Base UI
- **字体**: Geist (Vercel Font)
- **图标**: lucide-react
- **搜索**: fuse.js (客户端模糊搜索)
- **主题**: next-themes (暗色模式)
- **Lint/Format**: Biome
- **部署**: Vercel

## 本地开发

```bash
pnpm install
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 数据维护

导航链接数据在 `data/links.json`，分类数据在 `data/categories.json`。添加/修改链接后需重新构建生效。

## 可用脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 生产构建 |
| `pnpm start` | 启动生产服务器 |
| `pnpm lint` | 代码检查 (Biome) |
| `pnpm format` | 代码格式化 (Biome) |

## 部署

项目部署在 Vercel，推送到 `main` 或 `feature/*` 分支自动触发 CI 构建与部署。