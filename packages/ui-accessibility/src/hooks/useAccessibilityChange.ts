import { useEffect } from 'react';
import { useAccessibility } from './useAccessibility';
import { AccessibilitySettings } from '../types';

/**
 * useAccessibilityChange Hook
 * Listen to changes in accessibility settings
 *
 * @param callback Function called when settings change
 * @param dependencies Optional dependencies array
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useAccessibilityChange((settings) => {
 *     console.log('Settings changed:', settings);
 *     // Send to analytics
 *   });
 *
 *   return <div>Listening...</div>;
 * }
 * ```
 */
export function useAccessibilityChange(
  callback: (settings: AccessibilitySettings) => void,
  dependencies?: unknown[]
): void {
  const { settings } = useAccessibility();

  useEffect(() => {
    callback(settings);
  }, [settings, callback, ...(dependencies || [])]);
}
