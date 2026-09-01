import { AccessibilitySettings } from '../types';
import { CSS_VARIABLE_MAP, TEXT_SIZE_MULTIPLIERS } from './constants';

/**
 * Update CSS variables based on accessibility settings
 * This function updates :root CSS variables so all components respond
 */
export function updateCSSVariables(settings: AccessibilitySettings): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // Update each setting as a CSS variable
  Object.entries(settings).forEach(([key, value]) => {
    const varName = CSS_VARIABLE_MAP[key as keyof AccessibilitySettings];
    if (varName) {
      root.style.setProperty(varName, String(value));
    }
  });

  // Add computed CSS variables for font sizes
  const multiplier = TEXT_SIZE_MULTIPLIERS[settings.textSize] || 1;
  root.style.setProperty('--wx-accessibility-font-scale', String(multiplier));

  // Apply color filter to the entire page via CSS filter on body
  // Uses data URI SVG filters — avoids url(#id) reference which fails when
  // the SVG is a descendant of the filtered element (as it always would be on :root or body)
  const colorFilterMap: Record<string, string> = {
    deuteranopia: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='d'%3E%3CfeColorMatrix type='matrix' values='0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0'/%3E%3C/filter%3E%3C/svg%3E#d")`,
    protanopia:   `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeColorMatrix type='matrix' values='0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0'/%3E%3C/filter%3E%3C/svg%3E#p")`,
    tritanopia:   `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='t'%3E%3CfeColorMatrix type='matrix' values='0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0'/%3E%3C/filter%3E%3C/svg%3E#t")`,
    grayscale:    'grayscale(100%)',
    none:         '',
  };
  document.body.style.filter = colorFilterMap[settings.colorFilters] || '';

  // Apply data attribute for styling
  root.setAttribute('data-accessibility-profile', 'custom');
  root.setAttribute('data-accessibility-contrast', settings.contrast);
  root.setAttribute('data-accessibility-focus-mode', settings.focusMode);
  root.setAttribute('data-accessibility-text-size', settings.textSize);
  root.setAttribute('data-accessibility-text-spacing', settings.textSpacing);

  // Highlight links — use data attribute to match CSS selector
  if (settings.highlightLinks) {
    root.setAttribute('data-accessibility-highlight-links', 'true');
  } else {
    root.removeAttribute('data-accessibility-highlight-links');
  }

  // Add reduced motion class if enabled
  if (settings.reducedMotion) {
    root.classList.add('wx-reduced-motion');
  } else {
    root.classList.remove('wx-reduced-motion');
  }

  // Add dyslexia font if enabled
  if (settings.font === 'dyslexia-friendly') {
    root.classList.add('wx-dyslexia-friendly-font');
  } else {
    root.classList.remove('wx-dyslexia-friendly-font');
  }

  // Add high contrast class if enabled
  if (settings.contrast === 'high') {
    root.classList.add('wx-high-contrast');
  } else {
    root.classList.remove('wx-high-contrast');
  }

  // Add reading guide class if enabled
  if (settings.readingGuide) {
    root.classList.add('wx-reading-guide-enabled');
  } else {
    root.classList.remove('wx-reading-guide-enabled');
  }
}

/**
 * Clear CSS variables (reset to defaults)
 */
export function clearCSSVariables(): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  Object.values(CSS_VARIABLE_MAP).forEach((varName) => {
    root.style.removeProperty(varName);
  });

  root.removeAttribute('data-accessibility-profile');
  root.removeAttribute('data-accessibility-contrast');
  root.removeAttribute('data-accessibility-focus-mode');
  root.removeAttribute('data-accessibility-text-size');
  root.removeAttribute('data-accessibility-text-spacing');
  root.removeAttribute('data-accessibility-highlight-links');

  // Clear color filter
  document.body.style.filter = '';

  root.classList.remove(
    'wx-reduced-motion',
    'wx-dyslexia-friendly-font',
    'wx-high-contrast',
    'wx-reading-guide-enabled'
  );
}

/**
 * Get computed CSS variable value
 */
export function getCSSVariableValue(varName: string): string {
  if (typeof window === 'undefined') return '';

  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

/**
 * Check if accessibility is enabled
 */
export function isAccessibilityEnabled(): boolean {
  if (typeof document === 'undefined') return false;

  const root = document.documentElement;
  return (
    root.hasAttribute('data-accessibility-profile') ||
    root.classList.contains('wx-reduced-motion') ||
    root.classList.contains('wx-dyslexia-friendly-font') ||
    root.classList.contains('wx-high-contrast')
  );
}
