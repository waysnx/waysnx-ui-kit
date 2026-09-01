/**
 * @file providers/NavigationContext.tsx
 * Navigation context for managing global navigation state
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type {
  NavigationItem,
  NavigationContextType,
  BreadcrumbItem,
  FavoriteItem,
  RecentItem,
  Workspace,
} from '../types';
import {
  getFavorites,
  saveFavorites,
  getRecentItems,
  saveRecentItems,
  getActiveWorkspace,
  saveActiveWorkspace,
  getTheme,
  saveTheme,
} from '../utils/storage.utils';

/**
 * Navigation context
 */
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

/**
 * Navigation provider props
 */
interface NavigationProviderProps {
  children: ReactNode;
  initialItems?: NavigationItem[];
  onItemChange?: (item?: NavigationItem) => void;
  persistState?: boolean;
}

/**
 * Navigation Provider Component
 *
 * Provides navigation state management across the application.
 *
 * @example
 * ```tsx
 * <NavigationProvider initialItems={menuItems} persistState={true}>
 *   <App />
 * </NavigationProvider>
 * ```
 */
export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
  initialItems = [],
  onItemChange,
  persistState = true,
}) => {
  const [items, setItems] = useState<NavigationItem[]>(initialItems);
  const [activeItem, setActiveItem] = useState<NavigationItem>();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [favorites, setFavoritesState] = useState<FavoriteItem[]>(
    persistState ? getFavorites() : []
  );
  const [recent, setRecentState] = useState<RecentItem[]>(
    persistState ? getRecentItems() : []
  );
  const [workspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspaceState] = useState<Workspace | undefined>(
    persistState ? (getActiveWorkspace() || undefined) : undefined
  );
  const [theme, setThemeState] = useState<'light' | 'dark'>(
    (persistState ? getTheme() : null) || 'light'
  );

  // Handle active item change
  const handleSetActiveItem = useCallback((item?: NavigationItem) => {
    setActiveItem(item);
    onItemChange?.(item);
  }, [onItemChange]);

  // Handle favorites
  const handleAddFavorite = useCallback((item: FavoriteItem) => {
    const updated = [...favorites, item];
    setFavoritesState(updated);
    if (persistState) {
      saveFavorites(updated);
    }
  }, [favorites, persistState]);

  const handleRemoveFavorite = useCallback((id: string) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavoritesState(updated);
    if (persistState) {
      saveFavorites(updated);
    }
  }, [favorites, persistState]);

  // Handle recent items
  const handleAddRecent = useCallback((item: RecentItem) => {
    const filtered = recent.filter((r) => r.id !== item.id);
    const updated = [item, ...filtered].slice(0, 10);
    setRecentState(updated);
    if (persistState) {
      saveRecentItems(updated);
    }
  }, [recent, persistState]);

  // Handle workspace
  const handleSetActiveWorkspace = useCallback((workspace?: Workspace) => {
    setActiveWorkspaceState(workspace);
    if (persistState && workspace) {
      saveActiveWorkspace(workspace);
    }
  }, [persistState]);

  // Handle theme
  const handleSetTheme = useCallback((newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    if (persistState) {
      saveTheme(newTheme);
    }
    document.documentElement.setAttribute('data-theme', newTheme);
  }, [persistState]);

  const value: NavigationContextType = {
    items,
    setItems,
    activeItem,
    setActiveItem: handleSetActiveItem,
    breadcrumbs,
    setBreadcrumbs,
    favorites,
    addFavorite: handleAddFavorite,
    removeFavorite: handleRemoveFavorite,
    recent,
    addRecent: handleAddRecent,
    workspaces,
    activeWorkspace,
    setActiveWorkspace: handleSetActiveWorkspace,
    theme,
    setTheme: handleSetTheme,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

/**
 * Hook to use navigation context
 *
 * @returns Navigation context
 * @throws Error if used outside of NavigationProvider
 *
 * @example
 * ```tsx
 * const { items, activeItem, setActiveItem } = useNavigation();
 * ```
 */
export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }

  return context;
};

// Export type
export { NavigationContext };
export type { NavigationContextType };
