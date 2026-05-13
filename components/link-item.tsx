"use client";

import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      className="block rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <Card
        size="sm"
        className="h-full ring-foreground/5 transition-all hover:ring-foreground/20"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {name}
            <ExternalLink className="size-4 text-muted-foreground/60 transition-colors group-hover/card:text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        {(description || categoryInfo) && (
          <CardContent className="flex-1">
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {categoryInfo && (
              <Badge variant="secondary" className="mt-1.5">
                {categoryInfo.name}
              </Badge>
            )}
          </CardContent>
        )}
      </Card>
    </a>
  );
}
