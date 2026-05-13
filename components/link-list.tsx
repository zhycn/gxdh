"use client";

import { FileSearch, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LinkItem as LinkItemComponent } from "@/components/link-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LinkItem } from "@/lib/search";
import { cn } from "@/lib/utils";

interface LinkListProps {
  links: LinkItem[];
  searchQuery?: string;
  onClearSearch?: () => void;
}

export function LinkList({ links, searchQuery, onClearSearch }: LinkListProps) {
  const [visible, setVisible] = useState(false);
  const prevKeyRef = useRef<string>("");

  useEffect(() => {
    const key = searchQuery ?? "";
    if (prevKeyRef.current !== key) {
      setVisible(false);
      const timer = requestAnimationFrame(() => setVisible(true));
      prevKeyRef.current = key;
      return () => cancelAnimationFrame(timer);
    }
    setVisible(true);
  }, [searchQuery]);
  if (links.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
        <FileSearch className="size-12 opacity-20" />
        <div className="text-center">
          {searchQuery ? (
            <>
              <p className="text-sm">
                未找到与「
                <span className="font-medium text-foreground">
                  {searchQuery}
                </span>
                」相关的站点
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                试试其他关键词
              </p>
            </>
          ) : (
            <p className="text-sm">暂无链接</p>
          )}
        </div>
        {searchQuery && onClearSearch && (
          <button
            type="button"
            onClick={onClearSearch}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 transition-colors hover:text-muted-foreground"
          >
            <RotateCcw className="size-3" />
            清空搜索
          </button>
        )}
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div
        className={cn(
          "grid grid-cols-1 gap-3 p-4 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-200",
          visible ? "opacity-100" : "opacity-0",
        )}
      >
        {links.map((link) => (
          <LinkItemComponent
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
