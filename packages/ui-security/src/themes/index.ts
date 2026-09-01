/**
 * @file themes/index.ts
 * Theme definitions for security components
 */

/**
 * Light theme CSS variables
 */
export const LIGHT_THEME = {
  // Primary colors
  '--wx-color-primary': '#0066cc',
  '--wx-color-primary-hover': '#0052a3',
  '--wx-color-primary-light': '#e8f0ff',

  // Security colors
  '--wx-color-success': '#22c55e',
  '--wx-color-warning': '#fbbf24',
  '--wx-color-error': '#ef4444',
  '--wx-color-info': '#3b82f6',

  // Text colors
  '--wx-color-text': '#1f2937',
  '--wx-color-text-muted': '#6b7280',
  '--wx-color-text-light': '#9ca3af',
  '--wx-color-primary-contrast': '#ffffff',

  // Background colors
  '--wx-color-surface': '#ffffff',
  '--wx-color-surface-alt': '#f9fafb',
  '--wx-color-surface-hover': '#f3f4f6',
  '--wx-overlay-bg': 'rgba(0, 0, 0, 0.5)',

  // Border colors
  '--wx-color-border': '#e5e7eb',

  // Shadow
  '--wx-sec-shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '--wx-sec-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  '--wx-sec-shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
} as const;

/**
 * Dark theme CSS variables
 */
export const DARK_THEME = {
  // Primary colors
  '--wx-color-primary': '#3b82f6',
  '--wx-color-primary-hover': '#1e40af',
  '--wx-color-primary-light': '#1e3a8a',

  // Security colors
  '--wx-color-success': '#10b981',
  '--wx-color-warning': '#f59e0b',
  '--wx-color-error': '#f87171',
  '--wx-color-info': '#60a5fa',

  // Text colors
  '--wx-color-text': '#f9fafb',
  '--wx-color-text-muted': '#d1d5db',
  '--wx-color-text-light': '#9ca3af',
  '--wx-color-primary-contrast': '#1f2937',

  // Background colors
  '--wx-color-surface': '#111827',
  '--wx-color-surface-alt': '#1f2937',
  '--wx-color-surface-hover': '#374151',
  '--wx-overlay-bg': 'rgba(0, 0, 0, 0.7)',

  // Border colors

  // Shadow
  '--wx-sec-shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  '--wx-sec-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  '--wx-sec-shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
} as const;

/**
 * Apply theme to element
 */
export const applyTheme = (element: HTMLElement, theme: 'light' | 'dark' = 'light') => {
  const themeVariables = theme === 'light' ? LIGHT_THEME : DARK_THEME;
  Object.entries(themeVariables).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
};

/**
 * Get theme variables as CSS string
 */
export const getThemeCSS = (theme: 'light' | 'dark' = 'light'): string => {
  const themeVariables = theme === 'light' ? LIGHT_THEME : DARK_THEME;
  return Object.entries(themeVariables)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n');
};
