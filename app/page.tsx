"use client";

import { Menu } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LinkList } from "@/components/link-list";
import { SearchBar } from "@/components/search-bar";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { searchLinksByCategory } from "@/lib/search";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [searchQuery]);

  const filteredLinks = useMemo(
    () => searchLinksByCategory(debouncedQuery, activeCategory),
    [debouncedQuery, activeCategory],
  );

  return (
    <div className="flex h-screen w-full flex-col">
      {/* Top Header */}
      <header className="flex h-14 items-center gap-2 border-b border-border px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          aria-label="打开导航"
        >
          <Menu className="size-5" data-icon="inline-start" />
        </Button>
        <h1 className="text-lg font-semibold">国信导航</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        <div className="border-b border-border p-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <LinkList links={filteredLinks} />
      </main>

      {/* Sidebar Drawer */}
      <Sidebar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
}
