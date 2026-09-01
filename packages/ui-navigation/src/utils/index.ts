/**
 * @file utils/index.ts
 * Reusable utility functions for navigation
 */

import type {
  NavigationItem,
  MenuItem,
  BreadcrumbItem,
  CommandItem,
} from '../types';

/**
 * Create a navigation menu from items
 */
export function createMenu(items: NavigationItem[]): MenuItem[] {
  return items.map((item) => ({
    ...item,
    variant: 'default' as const,
  }));
}

/**
 * Flatten a nested menu structure into a flat array
 */
export function flattenMenu(items: NavigationItem[]): NavigationItem[] {
  const flat: NavigationItem[] = [];

  function traverse(menuItems: NavigationItem[]) {
    for (const item of menuItems) {
      flat.push(item);
      if (item.children?.length) {
        traverse(item.children);
      }
    }
  }

  traverse(items);
  return flat;
}

/**
 * Find a menu item by id
 */
export function findMenuItem(
  items: NavigationItem[],
  id: string
): NavigationItem | undefined {
  const flat = flattenMenu(items);
  return flat.find((item) => item.id === id);
}

/**
 * Filter menu items based on a predicate
 */
export function filterMenu(
  items: NavigationItem[],
  predicate: (item: NavigationItem) => boolean
): NavigationItem[] {
  return items
    .filter(predicate)
    .map((item) => ({
      ...item,
      children: item.children ? filterMenu(item.children, predicate) : undefined,
    }));
}

/**
 * Build a breadcrumb trail from a menu path
 */
export function buildBreadcrumb(items: NavigationItem[], targetId: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];

  function traverse(menuItems: NavigationItem[], path: BreadcrumbItem[]) {
    for (const item of menuItems) {
      const currentPath = [
        ...path,
        {
          id: item.id,
          label: item.label,
          href: item.href,
        },
      ];

      if (item.id === targetId) {
        breadcrumbs.push(...currentPath);
        return;
      }

      if (item.children?.length) {
        traverse(item.children, currentPath);
      }
    }
  }

  traverse(items, []);
  return breadcrumbs;
}

/**
 * Register a command
 */
export function registerCommand(item: CommandItem): CommandItem {
  return item;
}

/**
 * Register a keyboard shortcut
 */
export function registerShortcut(
  shortcut: string,
  callback: () => void
): () => void {
  const handleKeydown = (e: KeyboardEvent) => {
    const keys = shortcut.toLowerCase().split('+');
    const isMatch =
      keys.includes('ctrl') === (e.ctrlKey || e.metaKey) &&
      keys.includes('shift') === e.shiftKey &&
      keys.includes('alt') === e.altKey &&
      keys.some((key) => e.key.toLowerCase() === key.toLowerCase());

    if (isMatch) {
      e.preventDefault();
      callback();
    }
  };

  document.addEventListener('keydown', handleKeydown);

  return () => {
    document.removeEventListener('keydown', handleKeydown);
  };
}

/**
 * Generate a menu tree from flat items
 */
export function generateMenuTree(
  items: NavigationItem[],
  parentId?: string
): NavigationItem[] {
  return items
    .filter((item) => {
      const parent = item.metadata?.parentId;
      return parentId ? parent === parentId : !parent;
    })
    .map((item) => ({
      ...item,
      children: generateMenuTree(items, item.id),
    }));
}

/**
 * Resolve the active route
 */
export function resolveActiveRoute(
  items: NavigationItem[],
  currentPath: string
): NavigationItem | undefined {
  const flat = flattenMenu(items);
  return flat.find((item) => item.href === currentPath);
}

/**
 * Format breadcrumb trail for display
 */
export function formatBreadcrumb(items: BreadcrumbItem[]): string {
  return items.map((item) => item.label).join(' / ');
}

/**
 * Check if menu item is disabled
 */
export function isMenuItemDisabled(item: NavigationItem | MenuItem): boolean {
  return item.disabled === true;
}

/**
 * Check if menu item is hidden
 */
export function isMenuItemHidden(item: NavigationItem | MenuItem): boolean {
  return item.hidden === true;
}

/**
 * Get breadcrumb depth
 */
export function getBreadcrumbDepth(items: BreadcrumbItem[]): number {
  return items.length;
}

/**
 * Create a menu item path
 */
export function createMenuPath(
  items: NavigationItem[],
  id: string
): NavigationItem[] {
  const path: NavigationItem[] = [];

  function traverse(menuItems: NavigationItem[]) {
    for (const item of menuItems) {
      if (item.id === id) {
        path.push(item);
        return true;
      }

      if (item.children?.length) {
        if (traverse(item.children)) {
          path.unshift(item);
          return true;
        }
      }
    }
    return false;
  }

  traverse(items);
  return path;
}

/**
 * Validate menu structure
 */
export function validateMenuStructure(items: NavigationItem[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  function traverse(menuItems: NavigationItem[]) {
    for (const item of menuItems) {
      if (!item.id) {
        errors.push('Menu item missing id');
      }
      if (!item.label) {
        errors.push(`Menu item ${item.id} missing label`);
      }
      if (ids.has(item.id)) {
        errors.push(`Duplicate menu item id: ${item.id}`);
      }
      ids.add(item.id);

      if (item.children?.length) {
        traverse(item.children);
      }
    }
  }

  traverse(items);
  return errors;
}

/**
 * Sort menu items
 */
export function sortMenuItems(
  items: NavigationItem[],
  sortBy: 'label' | 'id' = 'label'
): NavigationItem[] {
  return [...items]
    .sort((a, b) => {
      const aVal = a[sortBy] as string;
      const bVal = b[sortBy] as string;
      return aVal.localeCompare(bVal);
    })
    .map((item) => ({
      ...item,
      children: item.children ? sortMenuItems(item.children, sortBy) : undefined,
    }));
}

export * from './menu.utils';
export * from './security.utils';
export * from './storage.utils';
