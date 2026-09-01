/**
 * @file hooks/useDrawer.ts
 * Hook for managing drawer state
 */

import { useState, useCallback } from 'react';
import type { DrawerState } from '../types';

interface UseDrawerReturn extends DrawerState {
  setPosition: (position: 'left' | 'right' | 'top' | 'bottom') => void;
  setWidth: (width: string | number) => void;
  setHeight: (height: string | number) => void;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

/**
 * Hook to manage drawer state
 *
 * @param initialState - Initial drawer state
 * @returns Drawer state and operations
 *
 * @example
 * ```tsx
 * const { isOpen, toggle, close } = useDrawer();
 * ```
 */
export function useDrawer(initialState: Partial<DrawerState> = {}): UseDrawerReturn {
  const [state, setState] = useState<DrawerState>({
    isOpen: initialState.isOpen ?? false,
    position: initialState.position ?? 'left',
    width: initialState.width ?? 320,
    height: initialState.height ?? 'auto',
    overlay: initialState.overlay ?? true,
    onClose: initialState.onClose,
  });

  const toggle = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  }, []);

  const open = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
    }));
  }, []);

  const close = useCallback(() => {
    setState((prev) => {
      prev.onClose?.();
      return {
        ...prev,
        isOpen: false,
      };
    });
  }, []);

  const setPosition = useCallback((position: 'left' | 'right' | 'top' | 'bottom') => {
    setState((prev) => ({
      ...prev,
      position,
    }));
  }, []);

  const setWidth = useCallback((width: string | number) => {
    setState((prev) => ({
      ...prev,
      width,
    }));
  }, []);

  const setHeight = useCallback((height: string | number) => {
    setState((prev) => ({
      ...prev,
      height,
    }));
  }, []);

  return {
    ...state,
    setPosition,
    setWidth,
    setHeight,
    toggle,
    open,
    close,
  };
}
