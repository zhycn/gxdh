# 国信导航 UI 设计文档

> **日期:** 2026-05-11
> **状态:** 已批准

## 目标

构建一个类似 DeepSeek 官网布局的导航站：左侧固定分类导航，右侧搜索 + 无限滚动列表。纯前端实现，支持 fuse.js 模糊搜索和暗色模式。

## 架构

### 布局结构

```
┌─────────────────────────────────────────────┐
│  ┌──────────┬──────────────────────────────┐ │
│  │          │  ┌────────────────────────┐  │ │
│  │          │  │     搜索栏 (Input)     │  │ │
│  │  左侧    │  ├────────────────────────┤  │ │
│  │  导航栏  │  │                        │  │ │
│  │  (固定)  │  │   内容列表 (滚动)      │  │ │
│  │  ~240px  │  │                        │  │ │
│  │          │  │   - 链接项 1           │  │ │
│  │  - 首页  │  │   - 链接项 2           │  │ │
│  │  - 分类1 │  │   - 链接项 3           │  │ │
│  │  - 分类2 │  │   ...                  │  │ │
│  │  - ...   │  │                        │  │ │
│  │  (滚动)  │  │                        │  │ │
│  │          │  │                        │  │ │
│  └──────────┴──────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### 组件设计

| 组件 | 位置 | 职责 |
|------|------|------|
| `Sidebar` | `components/sidebar.tsx` | 左侧导航栏，渲染首页和分类列表 |
| `SearchBar` | `components/search-bar.tsx` | 顶部搜索框，集成 fuse.js |
| `LinkList` | `components/link-list.tsx` | 右侧内容列表，支持过滤和滚动 |
| `LinkItem` | `components/link-item.tsx` | 单个链接项渲染 |
| `ThemeToggle` | `components/theme-toggle.tsx` | 暗色模式切换按钮 |

### 数据流

```
categories.json (静态导入)
    ↓
Sidebar 组件渲染分类列表
    ↓
用户点击分类 → 设置 activeCategory 状态
    ↓
links.json (静态导入) → fuse.js 索引
    ↓
搜索输入 → fuse.search() → 过滤结果
    ↓
LinkList 接收过滤后的数据 → 渲染 LinkItem 列表
```

### 数据结构

**categories.json**
```json
[
  { "id": "ai", "name": "AI 工具", "icon": "brain" },
  { "id": "dev", "name": "开发资源", "icon": "code" },
  ...
]
```

**links.json**
```json
[
  { "id": "1", "name": "ChatGPT", "url": "https://chatgpt.com", "category": "ai", "description": "OpenAI 聊天机器人" },
  ...
]
```

## 技术栈

- **框架:** Next.js 16 (App Router, RSC)
- **UI:** shadcn/ui (base-nova preset)
- **样式:** Tailwind CSS v4
- **搜索:** fuse.js
- **图标:** lucide-react
- **语言:** TypeScript

## 需要安装的 shadcn 组件

- `scroll-area` - 左侧导航滚动
- `input` - 搜索框
- `separator` - 分隔线
- `badge` - 分类标签/计数

## 新增 npm 依赖

- `fuse.js` - 模糊搜索库

## 暗色模式

使用 shadcn 内置的 CSS 变量系统，通过 `next-themes` 或手动切换 `.dark` class 实现。

## 文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `data/categories.json` | 创建 | 示例分类数据 |
| `data/links.json` | 创建 | 示例链接数据 |
| `app/layout.tsx` | 修改 | 更新 metadata，添加暗色模式 provider |
| `app/page.tsx` | 修改 | 主页面布局 |
| `app/globals.css` | 修改 | 可能需要自定义样式 |
| `components/sidebar.tsx` | 创建 | 左侧导航组件 |
| `components/search-bar.tsx` | 创建 | 搜索框组件 |
| `components/link-list.tsx` | 创建 | 链接列表组件 |
| `components/link-item.tsx` | 创建 | 链接项组件 |
| `components/theme-toggle.tsx` | 创建 | 主题切换组件 |
| `lib/search.ts` | 创建 | fuse.js 搜索逻辑 |
