/**
 * @file hooks/useTabs.ts
 * Hook for managing tab navigation state
 */

import { useState, useCallback } from 'react';
import type { TabItem } from '../types';

interface UseTabsReturn {
  tabs: TabItem[];
  activeTabId?: string;
  setTabs: (tabs: TabItem[]) => void;
  setActiveTab: (id: string) => void;
  addTab: (tab: TabItem) => void;
  removeTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<TabItem>) => void;
}

/**
 * Hook to manage tab state
 *
 * @param initialTabs - Initial tabs
 * @param initialActiveId - Initially active tab ID
 * @returns Tabs state and operations
 *
 * @example
 * ```tsx
 * const { tabs, activeTabId, addTab } = useTabs(initialTabs);
 * ```
 */
export function useTabs(
  initialTabs: TabItem[] = [],
  initialActiveId?: string
): UseTabsReturn {
  const [tabs, setTabs] = useState<TabItem[]>(initialTabs);
  const [activeTabId, setActiveTabId] = useState<string | undefined>(initialActiveId);

  const addTab = useCallback(
    (tab: TabItem) => {
      setTabs((prev) => [...prev, tab]);
      if (!activeTabId) {
        setActiveTabId(tab.id);
      }
    },
    [activeTabId]
  );

  const removeTab = useCallback(
    (id: string) => {
      setTabs((prev) => prev.filter((tab) => tab.id !== id));
      if (activeTabId === id) {
        setActiveTabId(undefined);
      }
    },
    [activeTabId]
  );

  const updateTab = useCallback((id: string, updates: Partial<TabItem>) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === id ? { ...tab, ...updates } : tab))
    );
  }, []);

  return {
    tabs,
    activeTabId,
    setTabs,
    setActiveTab: setActiveTabId,
    addTab,
    removeTab,
    updateTab,
  };
}
