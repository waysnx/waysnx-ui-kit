/**
 * @file hooks/useTheme.ts
 * Theme integration for visualization components.
 */

import { useState, useEffect, useCallback } from 'react';
import type { VisTheme } from '../types';

export interface UseThemeReturn {
  theme: 'light' | 'dark';
  setTheme: (theme: VisTheme) => void;
  isDark: boolean;
}

export function useTheme(initial: VisTheme = 'auto'): UseThemeReturn {
  const getSystemTheme = (): 'light' | 'dark' =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const resolveTheme = (t: VisTheme): 'light' | 'dark' =>
    t === 'auto' ? getSystemTheme() : t;

  const [theme, setThemeState] = useState<'light' | 'dark'>(() =>
    resolveTheme(initial)
  );

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (initial !== 'auto') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setThemeState(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [initial]);

  const setTheme = useCallback((t: VisTheme) => {
    setThemeState(resolveTheme(t));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    theme,
    setTheme,
    isDark: theme === 'dark',
  };
}
