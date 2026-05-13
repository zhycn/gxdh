"use client";

import { Globe, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LinkList } from "@/components/link-list";
import { SearchBar } from "@/components/search-bar";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { searchLinksByCategory } from "@/lib/search";

export function HomeClient() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    <div className="flex h-screen w-full">
      <Sidebar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        isOpen={sidebarOpen}
        isMobile={isMobile}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-3">
          <div className="flex items-center gap-1 shrink-0">
            {isMobile ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                aria-label="打开导航"
              >
                <Menu className="size-5" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? "折叠导航" : "展开导航"}
              >
                {sidebarOpen ? (
                  <PanelLeftClose className="size-4" />
                ) : (
                  <PanelLeftOpen className="size-4" />
                )}
              </Button>
            )}
            <Globe className="size-5 text-primary" />
          </div>

          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <ThemeToggle />
        </header>

        <div className="flex-1 overflow-hidden">
          <LinkList
            links={filteredLinks}
            searchQuery={debouncedQuery}
            onClearSearch={() => setSearchQuery("")}
          />
        </div>
      </main>
    </div>
  );
}
