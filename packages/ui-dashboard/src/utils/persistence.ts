/**
 * @file persistence.ts
 * Utilities for persisting dashboard state
 */

import { LayoutPersistence, SavedDashboardState, WidgetConfig } from "../types";

/**
 * Save dashboard layout to storage
 */
export const saveLayout = (
  dashboardId: string,
  layout: Record<string, any>,
  storage: Storage = localStorage
): void => {
  const persistence: LayoutPersistence = {
    dashboardId,
    layout,
    timestamp: Date.now(),
    version: "1.0.0",
  };

  storage.setItem(`dashboard-layout-${dashboardId}`, JSON.stringify(persistence));
};

/**
 * Load dashboard layout from storage
 */
export const loadLayout = (
  dashboardId: string,
  storage: Storage = localStorage
): Record<string, any> | null => {
  const stored = storage.getItem(`dashboard-layout-${dashboardId}`);

  if (!stored) {
    return null;
  }

  try {
    const persistence: LayoutPersistence = JSON.parse(stored);
    return persistence.layout;
  } catch (error) {
    console.error("Failed to load layout:", error);
    return null;
  }
};

/**
 * Save dashboard filters to storage
 */
export const saveFilters = (
  dashboardId: string,
  filters: Record<string, any>,
  storage: Storage = localStorage
): void => {
  storage.setItem(
    `dashboard-filters-${dashboardId}`,
    JSON.stringify({
      filters,
      timestamp: Date.now(),
    })
  );
};

/**
 * Load dashboard filters from storage
 */
export const loadFilters = (
  dashboardId: string,
  storage: Storage = localStorage
): Record<string, any> | null => {
  const stored = storage.getItem(`dashboard-filters-${dashboardId}`);

  if (!stored) {
    return null;
  }

  try {
    const data = JSON.parse(stored);
    return data.filters;
  } catch (error) {
    console.error("Failed to load filters:", error);
    return null;
  }
};

/**
 * Save widgets configuration to storage
 */
export const saveWidgets = (
  dashboardId: string,
  widgets: Record<string, WidgetConfig>,
  storage: Storage = localStorage
): void => {
  storage.setItem(
    `dashboard-widgets-${dashboardId}`,
    JSON.stringify({
      widgets,
      timestamp: Date.now(),
    })
  );
};

/**
 * Load widgets configuration from storage
 */
export const loadWidgets = (
  dashboardId: string,
  storage: Storage = localStorage
): Record<string, WidgetConfig> | null => {
  const stored = storage.getItem(`dashboard-widgets-${dashboardId}`);

  if (!stored) {
    return null;
  }

  try {
    const data = JSON.parse(stored);
    return data.widgets;
  } catch (error) {
    console.error("Failed to load widgets:", error);
    return null;
  }
};

/**
 * Save entire dashboard state
 */
export const saveDashboard = (
  state: SavedDashboardState,
  storage: Storage = localStorage
): void => {
  storage.setItem(`dashboard-state-${state.id}`, JSON.stringify(state));
};

/**
 * Load entire dashboard state
 */
export const loadDashboard = (
  dashboardId: string,
  storage: Storage = localStorage
): SavedDashboardState | null => {
  const stored = storage.getItem(`dashboard-state-${dashboardId}`);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load dashboard:", error);
    return null;
  }
};

/**
 * Clear all dashboard data for a specific dashboard
 */
export const clearDashboard = (
  dashboardId: string,
  storage: Storage = localStorage
): void => {
  storage.removeItem(`dashboard-layout-${dashboardId}`);
  storage.removeItem(`dashboard-filters-${dashboardId}`);
  storage.removeItem(`dashboard-widgets-${dashboardId}`);
  storage.removeItem(`dashboard-state-${dashboardId}`);
};

/**
 * Clear all dashboard data
 */
export const clearAllDashboards = (storage: Storage = localStorage): void => {
  const keys = Object.keys(storage);
  keys.forEach((key) => {
    if (key.startsWith("dashboard-")) {
      storage.removeItem(key);
    }
  });
};

/**
 * Serialize dashboard state to JSON
 */
export const serializeDashboard = (state: SavedDashboardState): string => {
  return JSON.stringify(state, null, 2);
};

/**
 * Import dashboard state from JSON
 */
export const importDashboard = (json: string): SavedDashboardState | null => {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error("Failed to import dashboard:", error);
    return null;
  }
};
