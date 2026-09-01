import { useCallback, useEffect, useState } from 'react';
import { useAccessibility } from './useAccessibility';

export interface UseMotionReturn {
  reducedMotion: boolean;
  prefersReducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
  toggleReducedMotion: () => void;
}

/**
 * useMotion — read and control reduced motion preference.
 * Also respects the OS-level `prefers-reduced-motion` media query.
 *
 * @example
 * const { reducedMotion, toggleReducedMotion } = useMotion();
 */
export function useMotion(): UseMotionReturn {
  const { settings, updateSetting } = useAccessibility();

  // Track OS-level preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const setReducedMotion = useCallback(
    (enabled: boolean) => updateSetting('reducedMotion', enabled),
    [updateSetting]
  );

  const toggleReducedMotion = useCallback(() => {
    updateSetting('reducedMotion', !settings.reducedMotion);
  }, [settings.reducedMotion, updateSetting]);

  return {
    reducedMotion: settings.reducedMotion,
    prefersReducedMotion,
    setReducedMotion,
    toggleReducedMotion,
  };
}
