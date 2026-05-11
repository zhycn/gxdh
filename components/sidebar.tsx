"use client";

import {
  Brain,
  Code,
  Film,
  Gamepad2,
  GraduationCap,
  Home,
  Landmark,
  type LucideIcon,
  MessageCircle,
  Newspaper,
  Palette,
  Plane,
  ShoppingBag,
  Wrench,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import categories from "@/data/categories.json";
import { cn } from "@/lib/utils";

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
            activeCategory === null &&
              "bg-sidebar-accent text-sidebar-accent-foreground",
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
                  activeCategory === cat.id &&
                    "bg-sidebar-accent text-sidebar-accent-foreground",
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
