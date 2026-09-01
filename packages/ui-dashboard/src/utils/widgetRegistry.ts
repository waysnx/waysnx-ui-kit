/**
 * @file widgetRegistry.ts
 * Widget registry system for extensible widget components
 */

import { WidgetRegistryEntry } from "../types";

/**
 * Widget registry class
 */
class WidgetRegistry {
  private widgets: Map<string, WidgetRegistryEntry> = new Map();

  /**
   * Register a widget type
   */
  register(entry: WidgetRegistryEntry): void {
    this.widgets.set(entry.type, entry);
  }

  /**
   * Unregister a widget type
   */
  unregister(type: string): void {
    this.widgets.delete(type);
  }

  /**
   * Get a widget by type
   */
  get(type: string): WidgetRegistryEntry | undefined {
    return this.widgets.get(type);
  }

  /**
   * Get all registered widgets
   */
  getAll(): WidgetRegistryEntry[] {
    return Array.from(this.widgets.values());
  }

  /**
   * Check if widget type is registered
   */
  has(type: string): boolean {
    return this.widgets.has(type);
  }

  /**
   * Get widgets by category
   */
  getByCategory(category: string): WidgetRegistryEntry[] {
    return Array.from(this.widgets.values()).filter((w) => w.category === category);
  }

  /**
   * Clear all widgets
   */
  clear(): void {
    this.widgets.clear();
  }
}

// Global widget registry instance
const widgetRegistry = new WidgetRegistry();

export { widgetRegistry, WidgetRegistry };
