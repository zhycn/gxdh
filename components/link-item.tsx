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
      className="block transition-colors hover:bg-accent rounded-xl"
    >
      <Card
        size="sm"
        className="ring-foreground/5 hover:ring-foreground/10 transition-[ring-color]"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {name}
            <ExternalLink className="size-3 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        {(description || categoryInfo) && (
          <CardContent>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {categoryInfo && (
              <Badge variant="secondary" className="mt-1">
                {categoryInfo.name}
              </Badge>
            )}
          </CardContent>
        )}
      </Card>
    </a>
  );
}
