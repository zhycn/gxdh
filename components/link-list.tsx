"use client";

import { FileSearch } from "lucide-react";
import { LinkItem as LinkItemComponent } from "@/components/link-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LinkItem } from "@/lib/search";

interface LinkListProps {
  links: LinkItem[];
}

export function LinkList({ links }: LinkListProps) {
  if (links.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
        <FileSearch className="size-12 opacity-20" />
        <p className="text-sm">没有找到匹配的结果</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 lg:grid-cols-3">
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
