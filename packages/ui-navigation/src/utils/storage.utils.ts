/**
 * @file utils/storage.utils.ts
 * Local storage utilities for navigation state persistence
 */

import { STORAGE_KEYS } from '../constants';
import type { FavoriteItem, RecentItem, Workspace } from '../types';

/**
 * Get item from storage
 */
export function getFromStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn(`Failed to get item from storage: ${key}`, error);
    return null;
  }
}

/**
 * Save item to storage
 */
export function saveToStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Failed to save item to storage: ${key}`, error);
    return false;
  }
}

/**
 * Remove item from storage
 */
export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove item from storage: ${key}`, error);
    return false;
  }
}

/**
 * Clear all navigation storage
 */
export function clearNavigationStorage(): boolean {
  try {
    for (const key of Object.values(STORAGE_KEYS)) {
      localStorage.removeItem(key);
    }
    return true;
  } catch (error) {
    console.warn('Failed to clear navigation storage', error);
    return false;
  }
}

/**
 * Get favorites from storage
 */
export function getFavorites(): FavoriteItem[] {
  const favorites = getFromStorage<FavoriteItem[]>(STORAGE_KEYS.FAVORITES);
  return favorites || [];
}

/**
 * Save favorites to storage
 */
export function saveFavorites(favorites: FavoriteItem[]): boolean {
  return saveToStorage(STORAGE_KEYS.FAVORITES, favorites);
}

/**
 * Add favorite to storage
 */
export function addFavorite(item: FavoriteItem): boolean {
  const favorites = getFavorites();
  if (!favorites.find((fav) => fav.id === item.id)) {
    favorites.push(item);
    return saveFavorites(favorites);
  }
  return true;
}

/**
 * Remove favorite from storage
 */
export function removeFavorite(id: string): boolean {
  const favorites = getFavorites();
  const filtered = favorites.filter((fav) => fav.id !== id);
  return saveFavorites(filtered);
}

/**
 * Get recent items from storage
 */
export function getRecentItems(): RecentItem[] {
  const recent = getFromStorage<RecentItem[]>(STORAGE_KEYS.RECENT_ITEMS);
  return recent || [];
}

/**
 * Save recent items to storage
 */
export function saveRecentItems(items: RecentItem[]): boolean {
  return saveToStorage(STORAGE_KEYS.RECENT_ITEMS, items);
}

/**
 * Add recent item to storage
 */
export function addRecentItem(item: RecentItem, maxItems = 10): boolean {
  const recent = getRecentItems();
  const filtered = recent.filter((r) => r.id !== item.id);
  const updated = [item, ...filtered].slice(0, maxItems);
  return saveRecentItems(updated);
}

/**
 * Remove recent item from storage
 */
export function removeRecentItem(id: string): boolean {
  const recent = getRecentItems();
  const filtered = recent.filter((r) => r.id !== id);
  return saveRecentItems(filtered);
}

/**
 * Clear recent items from storage
 */
export function clearRecentItems(): boolean {
  return saveRecentItems([]);
}

/**
 * Get active workspace from storage
 */
export function getActiveWorkspace(): Workspace | null {
  return getFromStorage<Workspace>(STORAGE_KEYS.ACTIVE_WORKSPACE);
}

/**
 * Save active workspace to storage
 */
export function saveActiveWorkspace(workspace: Workspace): boolean {
  return saveToStorage(STORAGE_KEYS.ACTIVE_WORKSPACE, workspace);
}

/**
 * Get sidebar state from storage
 */
export function getSidebarState(): boolean {
  const state = getFromStorage<boolean>(STORAGE_KEYS.SIDEBAR_STATE);
  return state !== null ? state : true; // Default to open
}

/**
 * Save sidebar state to storage
 */
export function saveSidebarState(isOpen: boolean): boolean {
  return saveToStorage(STORAGE_KEYS.SIDEBAR_STATE, isOpen);
}

/**
 * Get theme from storage
 */
export function getTheme(): 'light' | 'dark' | null {
  return getFromStorage<'light' | 'dark'>(STORAGE_KEYS.THEME);
}

/**
 * Save theme to storage
 */
export function saveTheme(theme: 'light' | 'dark'): boolean {
  return saveToStorage(STORAGE_KEYS.THEME, theme);
}

/**
 * Export all navigation data
 */
export function exportNavigationData(): Record<string, any> {
  return {
    favorites: getFavorites(),
    recentItems: getRecentItems(),
    activeWorkspace: getActiveWorkspace(),
    sidebarOpen: getSidebarState(),
    theme: getTheme(),
  };
}

/**
 * Import navigation data
 */
export function importNavigationData(
  data: Record<string, any>
): boolean {
  try {
    if (data.favorites) saveFavorites(data.favorites);
    if (data.recentItems) saveRecentItems(data.recentItems);
    if (data.activeWorkspace) saveActiveWorkspace(data.activeWorkspace);
    if (data.sidebarOpen !== undefined) saveSidebarState(data.sidebarOpen);
    if (data.theme) saveTheme(data.theme);
    return true;
  } catch (error) {
    console.warn('Failed to import navigation data', error);
    return false;
  }
}
