/**
 * @file hooks/useMenu.ts
 * Hook for managing menu state and operations
 */

import { useState, useCallback } from 'react';
import type { NavigationItem } from '../types';
import { updateMenuItem, removeMenuItem, addMenuItem } from '../utils';

interface UseMenuReturn {
  items: NavigationItem[];
  activeItem?: NavigationItem;
  setItems: (items: NavigationItem[]) => void;
  setActiveItem: (item?: NavigationItem) => void;
  updateItem: (id: string, updates: Partial<NavigationItem>) => void;
  removeItem: (id: string) => void;
  addItem: (item: NavigationItem, parentId?: string) => void;
}

/**
 * Hook to manage menu state and operations
 *
 * @param initialItems - Initial menu items
 * @returns Menu state and operations
 *
 * @example
 * ```tsx
 * const { items, activeItem, updateItem } = useMenu(menuItems);
 * ```
 */
export function useMenu(initialItems: NavigationItem[] = []): UseMenuReturn {
  const [items, setItems] = useState<NavigationItem[]>(initialItems);
  const [activeItem, setActiveItem] = useState<NavigationItem>();

  const updateItem = useCallback(
    (id: string, updates: Partial<NavigationItem>) => {
      const updated = updateMenuItem(items, id, updates);
      setItems(updated);

      // Update active item if it was modified
      if (activeItem?.id === id) {
        setActiveItem({ ...activeItem, ...updates });
      }
    },
    [items, activeItem]
  );

  const removeItem = useCallback(
    (id: string) => {
      const updated = removeMenuItem(items, id);
      setItems(updated);

      // Clear active item if it was removed
      if (activeItem?.id === id) {
        setActiveItem(undefined);
      }
    },
    [items, activeItem]
  );

  const addItem = useCallback(
    (item: NavigationItem, parentId?: string) => {
      const updated = addMenuItem(items, item, parentId);
      setItems(updated);
    },
    [items]
  );

  return {
    items,
    activeItem,
    setItems,
    setActiveItem,
    updateItem,
    removeItem,
    addItem,
  };
}
