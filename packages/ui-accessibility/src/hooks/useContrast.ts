import { useCallback } from 'react';
import { useAccessibility } from './useAccessibility';
import type { AccessibilitySettings } from '../types';

export type ContrastMode = AccessibilitySettings['contrast'];

export interface UseContrastReturn {
  contrast: ContrastMode;
  isHighContrast: boolean;
  isYellowBlack: boolean;
  setContrast: (mode: ContrastMode) => void;
  toggleHighContrast: () => void;
}

/**
 * useContrast — read and control contrast mode.
 *
 * @example
 * const { contrast, toggleHighContrast } = useContrast();
 */
export function useContrast(): UseContrastReturn {
  const { settings, updateSetting } = useAccessibility();

  const setContrast = useCallback(
    (mode: ContrastMode) => updateSetting('contrast', mode),
    [updateSetting]
  );

  const toggleHighContrast = useCallback(() => {
    updateSetting('contrast', settings.contrast === 'high' ? 'normal' : 'high');
  }, [settings.contrast, updateSetting]);

  return {
    contrast: settings.contrast,
    isHighContrast: settings.contrast === 'high',
    isYellowBlack: settings.contrast === 'yellow-black',
    setContrast,
    toggleHighContrast,
  };
}
