import { useContext } from 'react';
import { AccessibilityContext } from '../context/AccessibilityContext';
import { AccessibilityContextValue } from '../types';

/**
 * useAccessibility Hook
 * Access accessibility settings and functions throughout the app
 *
 * @throws Error if used outside of AccessibilityProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { settings, updateSetting } = useAccessibility();
 *   return <div>Text size: {settings.textSize}</div>;
 * }
 * ```
 */
export function useAccessibility(): AccessibilityContextValue {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error(
      'useAccessibility must be used within an AccessibilityProvider. ' +
        'Make sure your component is wrapped with <AccessibilityProvider>'
    );
  }

  return context;
}
