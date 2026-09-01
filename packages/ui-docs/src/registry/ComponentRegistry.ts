/**
 * Component Registry
 * 
 * Manages dynamic component registration and resolution.
 * Allows documentation to render live components without direct imports.
 * 
 * Usage:
 * ```ts
 * registry.register("@waysnx/ui-core", "Input", Input);
 * const Component = registry.resolve("@waysnx/ui-core", "Input");
 * ```
 */

import React from 'react';
import { ComponentRegistration, ComponentRegistryOptions } from '../types';

// Default fallback component when a component is not found
const DefaultFallback: React.ComponentType<any> = ({ componentName, packageName, exportName }) => {
  return React.createElement(
    'div',
    {
      style: {
        padding: '12px',
        backgroundColor: '#fee2e2',
        border: '1px solid #fca5a5',
        borderRadius: '4px',
        color: '#991b1b',
        fontSize: '14px',
        fontFamily: 'monospace',
      },
    },
    `Component not found: ${packageName}/${exportName}`
  );
};

export class ComponentRegistry {
  private components: Map<string, ComponentRegistration> = new Map();
  private options: Required<ComponentRegistryOptions>;

  constructor(options: ComponentRegistryOptions = {}) {
    this.options = {
      fallbackComponent: options.fallbackComponent || DefaultFallback,
      onMissing: options.onMissing || (() => {}),
    };
  }

  /**
   * Generate a registry key from package and export name
   */
  private getKey(packageName: string, exportName: string): string {
    return `${packageName}::${exportName}`;
  }

  /**
   * Register a component
   */
  register(
    packageName: string,
    exportName: string,
    component: React.ComponentType<any>,
    metadata?: Record<string, unknown>
  ): void {
    const key = this.getKey(packageName, exportName);
    this.components.set(key, {
      packageName,
      exportName,
      component,
      metadata,
    });
  }

  /**
   * Resolve a component by package and export name
   * Returns the fallback component if not found
   */
  resolve(
    packageName: string,
    exportName: string
  ): React.ComponentType<any> {
    const key = this.getKey(packageName, exportName);
    const registration = this.components.get(key);

    if (!registration) {
      this.options.onMissing(packageName, exportName);
      return this.options.fallbackComponent;
    }

    return registration.component;
  }

  /**
   * Check if a component is registered
   */
  has(packageName: string, exportName: string): boolean {
    const key = this.getKey(packageName, exportName);
    return this.components.has(key);
  }

  /**
   * Get all registered components
   */
  getAll(): ComponentRegistration[] {
    return Array.from(this.components.values());
  }

  /**
   * Clear all registrations
   */
  clear(): void {
    this.components.clear();
  }

  /**
   * Get registration metadata
   */
  getMetadata(
    packageName: string,
    exportName: string
  ): Record<string, unknown> | undefined {
    const key = this.getKey(packageName, exportName);
    return this.components.get(key)?.metadata;
  }
}
