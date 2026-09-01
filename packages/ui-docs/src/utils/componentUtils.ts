/**
 * Utilities for working with component documentation
 */

import type { Component, ComponentProp } from '../types/documentation';

/**
 * Generate a slug from a component name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Format a component prop type for display
 */
export function formatPropType(type: string): string {
  // Remove module prefixes
  let formatted = type.replace(/^.*\./g, '');

  // Format union types
  formatted = formatted.replace(/\|/g, ' | ');

  // Clean up spaces
  formatted = formatted.replace(/\s+/g, ' ').trim();

  return formatted;
}

/**
 * Sort component props: required first, then alphabetical
 */
export function sortComponentProps(props: ComponentProp[]): ComponentProp[] {
  return [...props].sort((a, b) => {
    if (a.required !== b.required) {
      return a.required ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
}

/**
 * Filter deprecated props
 */
export function filterDeprecatedProps(props: ComponentProp[], includeDeprecated = false): ComponentProp[] {
  if (includeDeprecated) {
    return props;
  }
  return props.filter((prop) => !prop.deprecated);
}

/**
 * Get component category breadcrumb
 */
export function getCategoryBreadcrumb(category: string): string[] {
  return category.split('/').filter((part) => part.length > 0);
}

/**
 * Check if component is accessible
 */
export function isAccessible(component: Component): boolean {
  return Boolean(
    component.accessibility &&
    (component.accessibility.wcagLevel === 'AA' || component.accessibility.wcagLevel === 'AAA')
  );
}

/**
 * Get accessibility badge text
 */
export function getAccessibilityBadge(wcagLevel?: string): string {
  switch (wcagLevel) {
    case 'AAA':
      return 'WCAG AAA';
    case 'AA':
      return 'WCAG AA';
    case 'A':
      return 'WCAG A';
    default:
      return 'No WCAG';
  }
}

/**
 * Get component icon fallback
 */
export function getComponentIconFallback(name: string): string {
  return name.charAt(0).toUpperCase();
}

/**
 * Check if component has examples
 */
export function hasExamples(component: Component): boolean {
  return Boolean(component.examples && component.examples.length > 0);
}

/**
 * Check if component has markdown documentation
 */
export function hasMarkdownDocumentation(component: Component): boolean {
  return Boolean(component.markdown && component.markdown.length > 0);
}

/**
 * Build component URL
 */
export function getComponentUrl(libraryId: string, slug: string): string {
  return `/libraries/${libraryId}/components/${slug}`;
}

/**
 * Format installation command
 */
export function formatInstallationCommand(packageName: string): string {
  return `npm install ${packageName}`;
}
