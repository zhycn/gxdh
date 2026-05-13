"use client";

import { Search, XCircle } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "搜索站点...",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = useCallback(() => {
    onChange("");
    inputRef.current?.focus();
  }, [onChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        handleClear();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClear]);

  return (
    <div className="relative flex-1">
      <Search
        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        data-icon="inline-start"
      />
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-8"
        aria-label="搜索"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          aria-label="清空搜索"
        >
          <XCircle className="size-4" />
        </button>
      )}
    </div>
  );
}
