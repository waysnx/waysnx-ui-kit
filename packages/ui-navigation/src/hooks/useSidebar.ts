/**
 * @file hooks/useSidebar.ts
 * Hook for managing sidebar state
 */

import { useState, useCallback } from 'react';
import { getSidebarState, saveSidebarState } from '../utils/storage.utils';

interface UseSidebarReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  setOpen: (isOpen: boolean) => void;
}

/**
 * Hook to manage sidebar state
 *
 * @param defaultOpen - Default state if not persisted
 * @returns Sidebar state and controls
 *
 * @example
 * ```tsx
 * const { isOpen, toggle } = useSidebar();
 * ```
 */
export function useSidebar(defaultOpen = true): UseSidebarReturn {
  const [isOpen, setIsOpenState] = useState(() => getSidebarState() ?? defaultOpen);

  const setOpen = useCallback((open: boolean) => {
    setIsOpenState(open);
    saveSidebarState(open);
  }, []);

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return {
    isOpen,
    toggle,
    open,
    close,
    setOpen,
  };
}
