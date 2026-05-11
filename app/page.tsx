"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LinkList } from "@/components/link-list";
import { SearchBar } from "@/components/search-bar";
import { Sidebar } from "@/components/sidebar";
import { searchLinksByCategory } from "@/lib/search";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
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
    <div className="flex h-screen w-full">
      <Sidebar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <main className="flex flex-1 flex-col">
        <div className="border-b border-border p-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <LinkList links={filteredLinks} />
      </main>
    </div>
  );
}
