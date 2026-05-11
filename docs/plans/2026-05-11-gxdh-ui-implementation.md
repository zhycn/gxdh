# 国信导航 UI 实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 构建左侧固定导航 + 右侧搜索/列表布局的导航站，支持 fuse.js 搜索和暗色模式。

**Architecture:** Next.js App Router 单页面应用，左侧 Sidebar 组件固定，右侧 SearchBar + LinkList 组件独立滚动。数据通过静态 JSON 导入，搜索通过 fuse.js 客户端模糊匹配。

**Tech Stack:** Next.js 16, shadcn/ui (base-nova), Tailwind CSS v4, fuse.js, lucide-react, TypeScript

---

### Task 1: 安装依赖和 shadcn 组件

**Steps:**

**Step 1: 安装 fuse.js**

```bash
pnpm add fuse.js
```

**Step 2: 安装 shadcn 组件**

```bash
npx shadcn@latest add scroll-area input separator badge
```

确认组件添加到 `components/ui/` 目录。

**Step 3: 验证安装**

```bash
pnpm dev
```

访问 http://localhost:3000 确认应用正常启动。

---

### Task 2: 创建示例数据文件

**Files:**
- Create: `data/categories.json`
- Create: `data/links.json`

**Step 1: 创建 categories.json**

```json
[
  { "id": "ai", "name": "AI 工具", "icon": "Brain" },
  { "id": "dev", "name": "开发资源", "icon": "Code" },
  { "id": "design", "name": "设计工具", "icon": "Palette" },
  { "id": "media", "name": "影音娱乐", "icon": "Film" },
  { "id": "news", "name": "新闻资讯", "icon": "Newspaper" },
  { "id": "shopping", "name": "购物", "icon": "ShoppingBag" },
  { "id": "finance", "name": "金融理财", "icon": "Landmark" },
  { "id": "education", "name": "教育学习", "icon": "GraduationCap" },
  { "id": "social", "name": "社交媒体", "icon": "MessageCircle" },
  { "id": "tools", "name": "实用工具", "icon": "Wrench" },
  { "id": "game", "name": "游戏", "icon": "Gamepad2" },
  { "id": "travel", "name": "旅行出行", "icon": "Plane" }
]
```

**Step 2: 创建 links.json**

```json
[
  { "id": "1", "name": "ChatGPT", "url": "https://chatgpt.com", "category": "ai", "description": "OpenAI 开发的 AI 聊天助手" },
  { "id": "2", "name": "Claude", "url": "https://claude.ai", "category": "ai", "description": "Anthropic 开发的 AI 助手" },
  { "id": "3", "name": "DeepSeek", "url": "https://deepseek.com", "category": "ai", "description": "深度求索开发的 AI 模型" },
  { "id": "4", "name": "Gemini", "url": "https://gemini.google.com", "category": "ai", "description": "Google 开发的 AI 助手" },
  { "id": "5", "name": "通义千问", "url": "https://tongyi.aliyun.com", "category": "ai", "description": "阿里巴巴开发的 AI 大模型" },
  { "id": "6", "name": "文心一言", "url": "https://yiyan.baidu.com", "category": "ai", "description": "百度开发的 AI 大语言模型" },
  { "id": "7", "name": "GitHub", "url": "https://github.com", "category": "dev", "description": "全球最大的代码托管平台" },
  { "id": "8", "name": "Stack Overflow", "url": "https://stackoverflow.com", "category": "dev", "description": "开发者问答社区" },
  { "id": "9", "name": "Vercel", "url": "https://vercel.com", "category": "dev", "description": "前端部署云平台" },
  { "id": "10", "name": "npm", "url": "https://www.npmjs.com", "category": "dev", "description": "Node.js 包管理器" },
  { "id": "11", "name": "MDN Web Docs", "url": "https://developer.mozilla.org", "category": "dev", "description": "Web 技术文档" },
  { "id": "12", "name": "Figma", "url": "https://www.figma.com", "category": "design", "description": "在线协作设计工具" },
  { "id": "13", "name": "Dribbble", "url": "https://dribbble.com", "category": "design", "description": "设计师作品分享平台" },
  { "id": "14", "name": "Canva", "url": "https://www.canva.com", "category": "design", "description": "在线设计平台" },
  { "id": "15", "name": "YouTube", "url": "https://www.youtube.com", "category": "media", "description": "全球最大视频分享平台" },
  { "id": "16", "name": "Bilibili", "url": "https://www.bilibili.com", "category": "media", "description": "国内知名视频弹幕网站" },
  { "id": "17", "name": "Netflix", "url": "https://www.netflix.com", "category": "media", "description": "流媒体视频服务" },
  { "id": "18", "name": "36Kr", "url": "https://36kr.com", "category": "news", "description": "科技新媒体" },
  { "id": "19", "name": "Hacker News", "url": "https://news.ycombinator.com", "category": "news", "description": "科技创业资讯" },
  { "id": "20", "name": "淘宝", "url": "https://www.taobao.com", "category": "shopping", "description": "国内知名电商平台" },
  { "id": "21", "name": "京东", "url": "https://www.jd.com", "category": "shopping", "description": "自营式电商平台" },
  { "id": "22", "name": "支付宝", "url": "https://www.alipay.com", "category": "finance", "description": "数字支付平台" },
  { "id": "23", "name": "东方财富", "url": "https://www.eastmoney.com", "category": "finance", "description": "财经信息平台" },
  { "id": "24", "name": "Coursera", "url": "https://www.coursera.org", "category": "education", "description": "在线课程平台" },
  { "id": "25", "name": "知乎", "url": "https://www.zhihu.com", "category": "social", "description": "中文问答社区" },
  { "id": "26", "name": "微博", "url": "https://weibo.com", "category": "social", "description": "社交媒体平台" },
  { "id": "27", "name": "微信网页版", "url": "https://wx.qq.com", "category": "social", "description": "微信网页客户端" },
  { "id": "28", "name": "Google 翻译", "url": "https://translate.google.com", "category": "tools", "description": "在线翻译服务" },
  { "id": "29", "name": "Steam", "url": "https://store.steampowered.com", "category": "game", "description": "数字游戏发行平台" },
  { "id": "30", "name": "携程", "url": "https://www.ctrip.com", "category": "travel", "description": "在线旅行服务平台" }
]
```

---

### Task 3: 更新 layout.tsx 和 metadata

**Files:**
- Modify: `app/layout.tsx`

**Step 1: 更新 layout.tsx**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "国信导航",
  description: "你的专属导航站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

**Step 2: 验证**

```bash
pnpm dev
```

页面标题应显示为"国信导航"。

---

### Task 4: 创建 ThemeToggle 组件

**Files:**
- Create: `components/theme-toggle.tsx`

**Step 1: 创建 theme-toggle.tsx**

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDark(isDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {isDark ? (
        <Sun className="size-4" data-icon="inline-start" />
      ) : (
        <Moon className="size-4" data-icon="inline-start" />
      )}
    </Button>
  );
}
```

**Step 2: 验证**

在页面中临时引入，点击按钮确认暗色模式切换正常。

---

### Task 5: 创建 Sidebar 组件

**Files:**
- Create: `components/sidebar.tsx`

**Step 1: 创建 sidebar.tsx**

```tsx
"use client";

import { cn } from "@/lib/utils";
import { Home, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import categories from "@/data/categories.json";

interface SidebarProps {
  activeCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Brain: (await import("lucide-react")).Brain,
  Code: (await import("lucide-react")).Code,
  Palette: (await import("lucide-react")).Palette,
  Film: (await import("lucide-react")).Film,
  Newspaper: (await import("lucide-react")).Newspaper,
  ShoppingBag: (await import("lucide-react")).ShoppingBag,
  Landmark: (await import("lucide-react")).Landmark,
  GraduationCap: (await import("lucide-react")).GraduationCap,
  MessageCircle: (await import("lucide-react")).MessageCircle,
  Wrench: (await import("lucide-react")).Wrench,
  Gamepad2: (await import("lucide-react")).Gamepad2,
  Plane: (await import("lucide-react")).Plane,
};

export function Sidebar({ activeCategory, onSelectCategory }: SidebarProps) {
  return (
    <aside className="flex h-full w-60 flex-col border-r border-border bg-sidebar">
      <div className="flex h-14 items-center gap-2 px-4">
        <Button
          variant="ghost"
          className={cn(
            "flex flex-1 justify-start gap-2",
            activeCategory === null && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
          onClick={() => onSelectCategory(null)}
        >
          <Home className="size-4" data-icon="inline-start" />
          <span className="font-medium">首页</span>
        </Button>
        <ThemeToggle />
      </div>
      <Separator />
      <ScrollArea className="flex-1 px-2 py-2">
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Home;
            return (
              <Button
                key={cat.id}
                variant="ghost"
                className={cn(
                  "justify-start gap-2",
                  activeCategory === cat.id && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                onClick={() => onSelectCategory(cat.id)}
              >
                <Icon className="size-4" data-icon="inline-start" />
                {cat.name}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
```

**注意:** 上面的 top-level await 可能有问题，改为静态导入：

```tsx
"use client";

import { cn } from "@/lib/utils";
import {
  Brain,
  Code,
  Film,
  Gamepad2,
  GraduationCap,
  Home,
  Landmark,
  LucideIcon,
  MessageCircle,
  Newspaper,
  Palette,
  Plane,
  ShoppingBag,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import categories from "@/data/categories.json";

interface SidebarProps {
  activeCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Code,
  Palette,
  Film,
  Newspaper,
  ShoppingBag,
  Landmark,
  GraduationCap,
  MessageCircle,
  Wrench,
  Gamepad2,
  Plane,
};

export function Sidebar({ activeCategory, onSelectCategory }: SidebarProps) {
  return (
    <aside className="flex h-full w-60 flex-col border-r border-border bg-sidebar">
      <div className="flex h-14 items-center gap-2 px-4">
        <Button
          variant="ghost"
          className={cn(
            "flex flex-1 justify-start gap-2",
            activeCategory === null && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
          onClick={() => onSelectCategory(null)}
        >
          <Home className="size-4" data-icon="inline-start" />
          <span className="font-medium">首页</span>
        </Button>
        <ThemeToggle />
      </div>
      <Separator />
      <ScrollArea className="flex-1 px-2 py-2">
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Home;
            return (
              <Button
                key={cat.id}
                variant="ghost"
                className={cn(
                  "justify-start gap-2",
                  activeCategory === cat.id && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                onClick={() => onSelectCategory(cat.id)}
              >
                <Icon className="size-4" data-icon="inline-start" />
                {cat.name}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
```

---

### Task 6: 创建 SearchBar 组件

**Files:**
- Create: `components/search-bar.tsx`

**Step 1: 创建 search-bar.tsx**

```tsx
"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "搜索..." }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" data-icon="inline-start" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
```

---

### Task 7: 创建 LinkItem 和 LinkList 组件

**Files:**
- Create: `components/link-item.tsx`
- Create: `components/link-list.tsx`

**Step 1: 创建 link-item.tsx**

```tsx
"use client";

import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import categories from "@/data/categories.json";

interface LinkItemProps {
  name: string;
  url: string;
  category: string;
  description?: string;
}

export function LinkItem({ name, url, category, description }: LinkItemProps) {
  const categoryInfo = categories.find((c) => c.id === category);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">{name}</span>
        <ExternalLink className="size-3 text-muted-foreground" data-icon="inline-start" />
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {categoryInfo && (
        <Badge variant="secondary" className="w-fit mt-1">
          {categoryInfo.name}
        </Badge>
      )}
    </a>
  );
}
```

**Step 2: 创建 link-list.tsx**

```tsx
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { LinkItem } from "@/components/link-item";

interface LinkItemData {
  id: string;
  name: string;
  url: string;
  category: string;
  description?: string;
}

interface LinkListProps {
  links: LinkItemData[];
}

export function LinkList({ links }: LinkListProps) {
  if (links.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        没有找到匹配的结果
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <LinkItem
            key={link.id}
            name={link.name}
            url={link.url}
            category={link.category}
            description={link.description}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
```

---

### Task 8: 创建搜索工具 lib/search.ts

**Files:**
- Create: `lib/search.ts`

**Step 1: 创建 search.ts**

```ts
import Fuse from "fuse.js";
import linksData from "@/data/links.json";

export interface LinkItem {
  id: string;
  name: string;
  url: string;
  category: string;
  description?: string;
}

const links: LinkItem[] = linksData as LinkItem[];

const fuse = new Fuse(links, {
  keys: ["name", "description", "category"],
  threshold: 0.3,
});

export function searchLinks(query: string): LinkItem[] {
  if (!query.trim()) return links;
  return fuse.search(query).map((result) => result.item);
}

export function getAllLinks(): LinkItem[] {
  return links;
}

export function getLinksByCategory(categoryId: string): LinkItem[] {
  return links.filter((link) => link.category === categoryId);
}

export function searchLinksByCategory(query: string, categoryId: string | null): LinkItem[] {
  const filtered = categoryId ? getLinksByCategory(categoryId) : links;

  if (!query.trim()) return filtered;

  const categoryFuse = new Fuse(filtered, {
    keys: ["name", "description"],
    threshold: 0.3,
  });

  return categoryFuse.search(query).map((result) => result.item);
}
```

---

### Task 9: 组装主页

**Files:**
- Modify: `app/page.tsx`

**Step 1: 重写 page.tsx**

```tsx
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { SearchBar } from "@/components/search-bar";
import { LinkList } from "@/components/link-list";
import { searchLinksByCategory } from "@/lib/search";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLinks = searchLinksByCategory(searchQuery, activeCategory);

  return (
    <div className="flex h-screen w-full">
      <Sidebar activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
      <main className="flex flex-1 flex-col">
        <div className="border-b border-border p-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <LinkList links={filteredLinks} />
      </main>
    </div>
  );
}
```

**Step 2: 验证**

```bash
pnpm dev
```

访问 http://localhost:3000 确认：
- 左侧导航显示分类列表
- 点击分类过滤右侧内容
- 搜索框实时过滤
- 暗色模式切换正常

---

### Task 10: 运行 lint 和格式化

**Steps:**

**Step 1: 运行 lint**

```bash
pnpm lint
```

**Step 2: 格式化代码**

```bash
pnpm format
```

**Step 3: 修复所有 lint 错误**

根据 biome 输出修复问题。

---

### Task 11: 构建验证

**Steps:**

**Step 1: 运行构建**

```bash
pnpm build
```

**Step 2: 确认构建成功**

输出应显示 "✓ Compiled successfully"。

---

### Task 12: 提交

**Steps:**

**Step 1: 检查状态**

```bash
git status
```

**Step 2: 添加所有文件**

```bash
git add .
```

**Step 3: 提交**

```bash
git commit -m "feat: 实现国信导航 UI - 左侧导航 + 右侧搜索列表布局"
```
