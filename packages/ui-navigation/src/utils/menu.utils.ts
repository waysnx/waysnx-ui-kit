/**
 * @file utils/menu.utils.ts
 * Menu-specific utility functions
 */

import type { NavigationItem } from '../types';

/**
 * Get menu item level/depth in hierarchy
 */
export function getMenuItemLevel(
  items: NavigationItem[],
  targetId: string,
  level = 0
): number {
  for (const item of items) {
    if (item.id === targetId) {
      return level;
    }
    if (item.children?.length) {
      const foundLevel = getMenuItemLevel(item.children, targetId, level + 1);
      if (foundLevel >= 0) {
        return foundLevel;
      }
    }
  }
  return -1;
}

/**
 * Get all parent ids of a menu item
 */
export function getMenuItemParents(
  items: NavigationItem[],
  targetId: string
): string[] {
  const parents: string[] = [];

  function traverse(menuItems: NavigationItem[], currentParents: string[]) {
    for (const item of menuItems) {
      if (item.id === targetId) {
        parents.push(...currentParents);
        return true;
      }
      if (item.children?.length) {
        if (traverse(item.children, [...currentParents, item.id])) {
          return true;
        }
      }
    }
    return false;
  }

  traverse(items, []);
  return parents;
}

/**
 * Expand all menu items
 */
export function expandAllMenuItems(items: NavigationItem[]): NavigationItem[] {
  return items.map((item) => ({
    ...item,
    metadata: {
      ...item.metadata,
      expanded: true,
    },
    children: item.children ? expandAllMenuItems(item.children) : undefined,
  }));
}

/**
 * Collapse all menu items
 */
export function collapseAllMenuItems(items: NavigationItem[]): NavigationItem[] {
  return items.map((item) => ({
    ...item,
    metadata: {
      ...item.metadata,
      expanded: false,
    },
    children: item.children ? collapseAllMenuItems(item.children) : undefined,
  }));
}

/**
 * Toggle menu item expansion
 */
export function toggleMenuItemExpansion(
  items: NavigationItem[],
  targetId: string
): NavigationItem[] {
  return items.map((item) => {
    if (item.id === targetId) {
      return {
        ...item,
        metadata: {
          ...item.metadata,
          expanded: !item.metadata?.expanded,
        },
        children: item.children ? toggleMenuItemExpansion(item.children, '') : undefined,
      };
    }
    return {
      ...item,
      children: item.children ? toggleMenuItemExpansion(item.children, targetId) : undefined,
    };
  });
}

/**
 * Get visible menu items
 */
export function getVisibleMenuItems(items: NavigationItem[]): NavigationItem[] {
  return items.filter(
    (item) => !item.hidden && !item.disabled
  );
}

/**
 * Count visible menu items
 */
export function countVisibleMenuItems(items: NavigationItem[]): number {
  let count = 0;

  function traverse(menuItems: NavigationItem[]) {
    for (const item of menuItems) {
      if (!item.hidden && !item.disabled) {
        count++;
        if (item.children?.length) {
          traverse(item.children);
        }
      }
    }
  }

  traverse(items);
  return count;
}

/**
 * Update menu item properties
 */
export function updateMenuItem(
  items: NavigationItem[],
  targetId: string,
  updates: Partial<NavigationItem>
): NavigationItem[] {
  return items.map((item) => {
    if (item.id === targetId) {
      return { ...item, ...updates };
    }
    return {
      ...item,
      children: item.children ? updateMenuItem(item.children, targetId, updates) : undefined,
    };
  });
}

/**
 * Remove menu item
 */
export function removeMenuItem(
  items: NavigationItem[],
  targetId: string
): NavigationItem[] {
  return items
    .filter((item) => item.id !== targetId)
    .map((item) => ({
      ...item,
      children: item.children ? removeMenuItem(item.children, targetId) : undefined,
    }));
}

/**
 * Add menu item at specific location
 */
export function addMenuItem(
  items: NavigationItem[],
  newItem: NavigationItem,
  parentId?: string
): NavigationItem[] {
  if (!parentId) {
    return [...items, newItem];
  }

  return items.map((item) => {
    if (item.id === parentId) {
      return {
        ...item,
        children: [...(item.children || []), newItem],
      };
    }
    return {
      ...item,
      children: item.children ? addMenuItem(item.children, newItem, parentId) : undefined,
    };
  });
}

/**
 * Get menu items by type/category
 */
export function getMenuItemsByCategory(
  items: NavigationItem[],
  category: string
): NavigationItem[] {
  const result: NavigationItem[] = [];

  function traverse(menuItems: NavigationItem[]) {
    for (const item of menuItems) {
      if (item.metadata?.category === category) {
        result.push(item);
      }
      if (item.children?.length) {
        traverse(item.children);
      }
    }
  }

  traverse(items);
  return result;
}

/**
 * Create a menu search index
 */
export function createMenuSearchIndex(
  items: NavigationItem[]
): Map<string, NavigationItem> {
  const index = new Map<string, NavigationItem>();

  function traverse(menuItems: NavigationItem[]) {
    for (const item of menuItems) {
      index.set(item.id, item);
      index.set(item.label.toLowerCase(), item);
      if (item.children?.length) {
        traverse(item.children);
      }
    }
  }

  traverse(items);
  return index;
}
