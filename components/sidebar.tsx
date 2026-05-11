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
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import categories from "@/data/categories.json";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
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

export function Sidebar({
  activeCategory,
  onSelectCategory,
  isOpen,
  isMobile,
  onClose,
}: SidebarProps) {
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            aria-label="关闭导航"
          />
        )}
        <aside
          className={cn(
            "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border bg-background shadow-lg transition-transform duration-300",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-14 items-center justify-between px-4">
            <span className="text-lg font-semibold">国信导航</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="关闭导航"
            >
              <X className="size-4" data-icon="inline-start" />
            </Button>
          </div>
          <ScrollArea className="flex-1 px-2 py-2">
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                className={cn(
                  "justify-start gap-2",
                  activeCategory === null && "bg-accent text-accent-foreground",
                )}
                onClick={() => {
                  onSelectCategory(null);
                  onClose();
                }}
              >
                <Home className="size-4" data-icon="inline-start" />
                <span className="font-medium">首页</span>
              </Button>
              {categories.map((cat) => {
                const Icon = iconMap[cat.icon] ?? Home;
                return (
                  <Button
                    key={cat.id}
                    variant="ghost"
                    className={cn(
                      "justify-start gap-2",
                      activeCategory === cat.id &&
                        "bg-accent text-accent-foreground",
                    )}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                  >
                    <Icon className="size-4" data-icon="inline-start" />
                    {cat.name}
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </aside>
      </>
    );
  }

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-background transition-all duration-300",
        isOpen ? "w-64" : "w-0 overflow-hidden",
      )}
    >
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            className={cn(
              "justify-start gap-2",
              activeCategory === null && "bg-accent text-accent-foreground",
            )}
            onClick={() => onSelectCategory(null)}
          >
            <Home className="size-4" data-icon="inline-start" />
            <span className="font-medium">首页</span>
          </Button>
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Home;
            return (
              <Button
                key={cat.id}
                variant="ghost"
                className={cn(
                  "justify-start gap-2",
                  activeCategory === cat.id &&
                    "bg-accent text-accent-foreground",
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
