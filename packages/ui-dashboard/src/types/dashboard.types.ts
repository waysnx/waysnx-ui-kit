/**
 * @file dashboard.types.ts
 * Core types and interfaces for dashboard components
 */

import { ReactNode, CSSProperties } from "react";

/**
 * Supported dashboard themes
 */
export type DashboardTheme = "light" | "dark" | "highContrast" | "enterprise";

/**
 * Dashboard variant types
 */
export type DashboardVariant = "default" | "compact" | "expanded";

/**
 * Widget elevation levels
 */
export type WidgetElevation = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Widget variant types
 */
export type WidgetVariant = "default" | "outlined" | "flat" | "elevated";

/**
 * Trend direction for KPI components
 */
export type TrendDirection = "up" | "down" | "neutral";

/**
 * Status types
 */
export type StatusType = "success" | "error" | "warning" | "info" | "pending";

/**
 * Layout configuration for responsive grids
 */
export interface LayoutBreakpoint {
  xs?: number; // Mobile
  sm?: number; // Tablet
  md?: number; // Desktop
  lg?: number; // Large desktop
  xl?: number; // Extra large
}

/**
 * Dashboard configuration
 */
export interface DashboardConfig {
  theme?: DashboardTheme;
  variant?: DashboardVariant;
  enableAutoRefresh?: boolean;
  autoRefreshInterval?: number;
  enablePersistence?: boolean;
  persistenceKey?: string;
  enableFullscreen?: boolean;
  enableExport?: boolean;
}

/**
 * Widget configuration
 */
export interface WidgetConfig {
  id: string;
  title?: string;
  height?: number | string;
  width?: number | string;
  minHeight?: number;
  minWidth?: number;
  variant?: WidgetVariant;
  elevation?: WidgetElevation;
  bordered?: boolean;
  collapsible?: boolean;
  removable?: boolean;
  duplicable?: boolean;
}

/**
 * KPI data
 */
export interface KPIData {
  value: string | number;
  label: string;
  change?: number;
  trend?: TrendDirection;
  target?: string | number;
  status?: StatusType;
  icon?: ReactNode;
  color?: string;
  variant?: "default" | "minimal" | "detailed";
}

/**
 * Metric data
 */
export interface MetricData {
  label: string;
  actual: number;
  target?: number;
  unit?: string;
  status?: StatusType;
  icon?: ReactNode;
  progress?: number; // 0-100
}

/**
 * Chart widget props interface
 */
export interface ChartWidgetProps {
  id: string;
  title?: string;
  subtitle?: string;
  loading?: boolean;
  error?: Error | null;
  onRefresh?: () => void;
  onExport?: () => void;
  onFullscreen?: () => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Widget state
 */
export type WidgetState = "idle" | "loading" | "error" | "empty" | "success";

/**
 * Layout persistence
 */
export interface LayoutPersistence {
  dashboardId: string;
  layout: Record<string, any>;
  timestamp: number;
  version: string;
}

/**
 * Filter configuration
 */
export interface FilterConfig {
  id: string;
  label: string;
  type: "select" | "multiselect" | "daterange" | "search" | "custom";
  options?: Array<{ label: string; value: any }>;
  defaultValue?: any;
  clearable?: boolean;
}

/**
 * Refresh configuration
 */
export interface RefreshConfig {
  enabled: boolean;
  interval?: "30s" | "1m" | "5m" | "15m" | "custom";
  customInterval?: number;
  callback?: () => void | Promise<void>;
}

/**
 * Export configuration
 */
export interface ExportConfig {
  formats?: Array<"png" | "pdf" | "csv" | "excel" | "print">;
  fileName?: string;
  includeTimestamp?: boolean;
}

/**
 * Widget registry entry
 */
export interface WidgetRegistryEntry {
  type: string;
  component: React.ComponentType<any>;
  displayName?: string;
  description?: string;
  category?: string;
  icon?: ReactNode;
}

/**
 * Dashboard context type
 */
export interface DashboardContextType {
  theme: DashboardTheme;
  setTheme: (theme: DashboardTheme) => void;
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  layout: Record<string, any>;
  setLayout: (layout: Record<string, any>) => void;
  isRefreshing: boolean;
  setIsRefreshing: (refreshing: boolean) => void;
  widgets: Record<string, WidgetConfig>;
  setWidgets: (widgets: Record<string, WidgetConfig>) => void;
  isFullscreen: boolean;
  setIsFullscreen: (fullscreen: boolean) => void;
  selectedWidget?: string;
  setSelectedWidget: (widgetId?: string) => void;
  config: DashboardConfig;
}

/**
 * Saved dashboard state
 */
export interface SavedDashboardState {
  id: string;
  name: string;
  filters: Record<string, any>;
  layout: Record<string, any>;
  theme: DashboardTheme;
  widgets: Record<string, WidgetConfig>;
  createdAt: number;
  updatedAt: number;
}
