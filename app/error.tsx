"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 px-4">
      <AlertTriangle className="size-12 text-destructive/80" />
      <h2 className="text-xl font-semibold">出错了</h2>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        页面加载时遇到了问题，请稍后重试。
      </p>
      <Button variant="outline" onClick={reset}>
        <RotateCcw className="size-4" />
        重试
      </Button>
    </div>
  );
}
