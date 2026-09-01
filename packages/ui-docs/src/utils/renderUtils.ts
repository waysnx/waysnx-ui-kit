/**
 * Utilities for rendering documentation content
 */

import type { ComponentProp } from '../types/documentation';

/**
 * Render a prop's default value safely
 */
export function renderDefaultValue(value: unknown): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return `"${value}"`;
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) return JSON.stringify(value);
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/**
 * Render prop enum values
 */
export function renderEnumValues(enumValues?: Array<string | number | boolean>): string {
  if (!enumValues || enumValues.length === 0) return '';
  return enumValues.map((v) => renderDefaultValue(v)).join(' | ');
}

/**
 * Get CSS classes for prop type
 */
export function getPropTypeClasses(type: string): string {
  const classes: string[] = ['inline-block', 'px-2', 'py-1', 'rounded', 'text-sm'];

  if (type.includes('string')) {
    classes.push('bg-blue-100', 'text-blue-900');
  } else if (type.includes('number')) {
    classes.push('bg-green-100', 'text-green-900');
  } else if (type.includes('boolean')) {
    classes.push('bg-purple-100', 'text-purple-900');
  } else if (type.includes('function')) {
    classes.push('bg-orange-100', 'text-orange-900');
  } else {
    classes.push('bg-gray-100', 'text-gray-900');
  }

  return classes.join(' ');
}

/**
 * Get CSS classes for required badge
 */
export function getRequiredClasses(): string {
  return 'inline-block px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-900';
}

/**
 * Get CSS classes for optional badge
 */
export function getOptionalClasses(): string {
  return 'inline-block px-2 py-1 rounded text-xs bg-gray-100 text-gray-700';
}

/**
 * Get CSS classes for accessibility level
 */
export function getAccessibilityClasses(level?: string): string {
  const classes: string[] = ['inline-block', 'px-3', 'py-1', 'rounded-full', 'text-sm', 'font-semibold'];

  switch (level) {
    case 'AAA':
      classes.push('bg-green-100', 'text-green-900');
      break;
    case 'AA':
      classes.push('bg-emerald-100', 'text-emerald-900');
      break;
    case 'A':
      classes.push('bg-yellow-100', 'text-yellow-900');
      break;
    default:
      classes.push('bg-gray-100', 'text-gray-700');
  }

  return classes.join(' ');
}

/**
 * Get CSS classes for deprecation badge
 */
export function getDeprecationClasses(): string {
  return 'inline-block px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-900';
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Highlight search query in text
 */
export function highlightSearchQuery(text: string, query: string): React.ReactNode {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? `<mark>${part}</mark>` : part
  );
}

/**
 * Get icon for component category
 */
export function getCategoryIcon(category: string): string {
  const categoryMap: Record<string, string> = {
    input: '📝',
    button: '🔘',
    layout: '📐',
    navigation: '🗺️',
    feedback: '💬',
    data: '📊',
    form: '📋',
    utility: '🔧',
    display: '👁️',
    interaction: '🎯',
  };

  const categoryLower = category.toLowerCase();
  for (const [key, icon] of Object.entries(categoryMap)) {
    if (categoryLower.includes(key)) {
      return icon;
    }
  }

  return '📦';
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
