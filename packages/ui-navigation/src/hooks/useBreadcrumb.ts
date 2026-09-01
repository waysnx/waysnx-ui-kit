/**
 * @file hooks/useBreadcrumb.ts
 * Hook for managing breadcrumb navigation
 */

import { useState, useCallback } from 'react';
import type { BreadcrumbItem } from '../types';

interface UseBreadcrumbReturn {
  items: BreadcrumbItem[];
  setItems: (items: BreadcrumbItem[]) => void;
  addItem: (item: BreadcrumbItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

/**
 * Hook to manage breadcrumb state
 *
 * @param initialItems - Initial breadcrumb items
 * @returns Breadcrumb state and operations
 *
 * @example
 * ```tsx
 * const { items, addItem } = useBreadcrumb(initialBreadcrumbs);
 * ```
 */
export function useBreadcrumb(initialItems: BreadcrumbItem[] = []): UseBreadcrumbReturn {
  const [items, setItems] = useState<BreadcrumbItem[]>(initialItems);

  const addItem = useCallback((item: BreadcrumbItem) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  return {
    items,
    setItems,
    addItem,
    removeItem,
    clear,
  };
}
