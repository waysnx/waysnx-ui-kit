import { useCallback } from 'react';
import { useAccessibility } from './useAccessibility';
import type { AccessibilitySettings } from '../types';

export type FocusMode = AccessibilitySettings['focusMode'];

export interface UseFocusReturn {
  focusMode: FocusMode;
  isHighVisibility: boolean;
  setFocusMode: (mode: FocusMode) => void;
  toggleHighVisibility: () => void;
}

/**
 * useFocus — read and control focus mode.
 *
 * @example
 * const { focusMode, toggleHighVisibility } = useFocus();
 */
export function useFocus(): UseFocusReturn {
  const { settings, updateSetting } = useAccessibility();

  const setFocusMode = useCallback(
    (mode: FocusMode) => updateSetting('focusMode', mode),
    [updateSetting]
  );

  const toggleHighVisibility = useCallback(() => {
    updateSetting(
      'focusMode',
      settings.focusMode === 'high-visibility' ? 'standard' : 'high-visibility'
    );
  }, [settings.focusMode, updateSetting]);

  return {
    focusMode: settings.focusMode,
    isHighVisibility: settings.focusMode === 'high-visibility',
    setFocusMode,
    toggleHighVisibility,
  };
}
