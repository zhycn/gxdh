"use client";

import {
  Brain,
  Code,
  Film,
  Gamepad2,
  Globe,
  GraduationCap,
  Landmark,
  type LucideIcon,
  MessageCircle,
  Newspaper,
  Palette,
  PanelLeftClose,
  Plane,
  ShoppingBag,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import categories from "@/data/categories.json";
import { cn } from "@/lib/utils";

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

function CategoryList({
  activeCategory,
  onSelectCategory,
}: {
  activeCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}) {
  return (
    <ScrollArea className="flex-1 px-2 py-2">
      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          className={cn(
            "justify-start gap-2",
            activeCategory === null &&
              "bg-sidebar-accent text-sidebar-accent-foreground",
          )}
          onClick={() => onSelectCategory(null)}
        >
          <Globe className="size-4" />
          <span className="font-medium">首页</span>
        </Button>
        <div className="px-3 py-2 text-xs font-medium text-sidebar-foreground/50">
          分类
        </div>
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? Globe;
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
              <Icon className="size-4" />
              {cat.name}
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}

interface SidebarProps {
  activeCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  isOpen: boolean;
  isMobile: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function Sidebar({
  activeCategory,
  onSelectCategory,
  isOpen,
  isMobile,
  onToggle,
  onClose,
}: SidebarProps) {
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent
          side="left"
          className="w-64 bg-sidebar p-0"
          showCloseButton={false}
        >
          <SheetHeader className="flex h-14 flex-row items-center justify-between px-4">
            <SheetTitle className="flex items-center gap-2 text-base">
              <Globe className="size-5" />
              国信导航
            </SheetTitle>
          </SheetHeader>
          <CategoryList
            activeCategory={activeCategory}
            onSelectCategory={(id) => {
              onSelectCategory(id);
              onClose();
            }}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "h-full transition-[width] duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0 overflow-hidden",
      )}
    >
      <div className="flex h-full flex-col border-r border-border bg-sidebar">
        <div className="flex h-14 shrink-0 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Globe className="size-5 shrink-0" />
            <span className="text-lg font-semibold whitespace-nowrap">
              国信导航
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            aria-label="折叠导航"
            className="shrink-0"
          >
            <PanelLeftClose className="size-4" />
          </Button>
        </div>
        <CategoryList
          activeCategory={activeCategory}
          onSelectCategory={onSelectCategory}
        />
      </div>
    </aside>
  );
}
