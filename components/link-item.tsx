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
        <ExternalLink
          className="size-3 text-muted-foreground"
          data-icon="inline-start"
        />
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {categoryInfo && (
        <Badge variant="secondary" className="w-fit mt-1">
          {categoryInfo.name}
        </Badge>
      )}
    </a>
  );
}
