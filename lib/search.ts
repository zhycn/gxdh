import Fuse from "fuse.js";
import linksData from "@/data/links.json";

export interface LinkItem {
  id: string;
  name: string;
  url: string;
  category: string;
  description?: string;
}

const SEARCH_THRESHOLD = 0.3;

const FUSE_KEYS_WEIGHTED = [
  { name: "name", weight: 2 },
  { name: "description", weight: 1 },
  { name: "category", weight: 1 },
];

const FUSE_KEYS_CATEGORY_WEIGHTED = [
  { name: "name", weight: 2 },
  { name: "description", weight: 1 },
];

const links: LinkItem[] = linksData as LinkItem[];

const fuse = new Fuse(links, {
  keys: FUSE_KEYS_WEIGHTED,
  threshold: SEARCH_THRESHOLD,
});

const categoryFuseCache = new Map<string, Fuse<LinkItem>>();

function getOrCreateCategoryFuse(
  categoryId: string,
  items: LinkItem[],
): Fuse<LinkItem> {
  const cached = categoryFuseCache.get(categoryId);
  if (cached) {
    return cached;
  }
  const newFuse = new Fuse(items, {
    keys: FUSE_KEYS_CATEGORY_WEIGHTED,
    threshold: SEARCH_THRESHOLD,
  });
  categoryFuseCache.set(categoryId, newFuse);
  return newFuse;
}

export function searchLinks(query: string): LinkItem[] {
  if (!query.trim()) return links;
  return fuse.search(query).map((result) => result.item);
}

export function getAllLinks(): LinkItem[] {
  return links;
}

export function getLinksByCategory(categoryId: string): LinkItem[] {
  return links.filter((link) => link.category === categoryId);
}

export function searchLinksByCategory(
  query: string,
  categoryId: string | null,
): LinkItem[] {
  const filtered = categoryId ? getLinksByCategory(categoryId) : links;

  if (!query.trim()) return filtered;

  const cacheKey = categoryId ?? "__all__";
  const categoryFuse = getOrCreateCategoryFuse(cacheKey, filtered);

  return categoryFuse.search(query).map((result) => result.item);
}
