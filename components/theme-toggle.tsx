"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const THEME_STORAGE_KEY = "theme-preference";

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored !== null) return stored === "dark";
  } catch {
    // Silently degrade when localStorage is unavailable (e.g., private browsing)
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initial = getInitialTheme();
    setIsDark(initial);
    document.documentElement.classList.toggle("dark", initial);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const prefersDark = e.matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, prefersDark ? "dark" : "light");
      } catch {
        // Silently degrade when localStorage is unavailable
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newIsDark ? "dark" : "light");
    } catch {
      // Silently degrade when localStorage is unavailable
    }
  }, [isDark]);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="切换主题">
        <Moon className="size-4" data-icon="inline-start" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
    >
      {isDark ? (
        <Sun className="size-4" data-icon="inline-start" />
      ) : (
        <Moon className="size-4" data-icon="inline-start" />
      )}
    </Button>
  );
}
