"use client";

import { AlertTriangle } from "lucide-react";

export default function GlobalPageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh-CN">
      <body className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background px-4">
        <AlertTriangle className="size-12 text-destructive/80" />
        <h2 className="text-xl font-semibold text-foreground">应用崩溃了</h2>
        <p className="max-w-md text-center text-sm text-muted-foreground">
          发生了严重的意外错误，请刷新页面重试。
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium text-foreground hover:bg-muted"
        >
          刷新页面
        </button>
      </body>
    </html>
  );
}
