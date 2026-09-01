import { useCallback } from 'react';
import { useAccessibility } from './useAccessibility';
import { TEXT_SIZE_MULTIPLIERS } from '../utils/constants';
import type { AccessibilitySettings } from '../types';

export type TextSize = AccessibilitySettings['textSize'];

export interface UseFontScaleReturn {
  textSize: TextSize;
  scale: number;
  isScaled: boolean;
  setTextSize: (size: TextSize) => void;
  increaseSize: () => void;
  decreaseSize: () => void;
  reset: () => void;
}

const SIZE_ORDER: TextSize[] = ['normal', 'large', 'x-large', 'xx-large'];

/**
 * useFontScale — read and control text size scaling.
 *
 * @example
 * const { textSize, increaseSize, scale } = useFontScale();
 */
export function useFontScale(): UseFontScaleReturn {
  const { settings, updateSetting } = useAccessibility();

  const setTextSize = useCallback(
    (size: TextSize) => updateSetting('textSize', size),
    [updateSetting]
  );

  const increaseSize = useCallback(() => {
    const idx = SIZE_ORDER.indexOf(settings.textSize);
    if (idx < SIZE_ORDER.length - 1) {
      updateSetting('textSize', SIZE_ORDER[idx + 1]);
    }
  }, [settings.textSize, updateSetting]);

  const decreaseSize = useCallback(() => {
    const idx = SIZE_ORDER.indexOf(settings.textSize);
    if (idx > 0) {
      updateSetting('textSize', SIZE_ORDER[idx - 1]);
    }
  }, [settings.textSize, updateSetting]);

  const reset = useCallback(() => updateSetting('textSize', 'normal'), [updateSetting]);

  return {
    textSize: settings.textSize,
    scale: TEXT_SIZE_MULTIPLIERS[settings.textSize] ?? 1,
    isScaled: settings.textSize !== 'normal',
    setTextSize,
    increaseSize,
    decreaseSize,
    reset,
  };
}
