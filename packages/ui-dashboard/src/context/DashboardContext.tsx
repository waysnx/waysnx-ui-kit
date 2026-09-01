/**
 * @file DashboardContext.tsx
 * Dashboard context for managing dashboard state across components
 */

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  DashboardContextType,
  DashboardConfig,
  DashboardTheme,
  WidgetConfig,
} from "../types";

/**
 * Dashboard context
 */
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

/**
 * Default dashboard configuration
 */
const DEFAULT_CONFIG: DashboardConfig = {
  theme: "light",
  variant: "default",
  enableAutoRefresh: false,
  autoRefreshInterval: 30000,
  enablePersistence: false,
  enableFullscreen: true,
  enableExport: true,
};

/**
 * Dashboard provider props
 */
interface DashboardProviderProps {
  children: ReactNode;
  config?: Partial<DashboardConfig>;
}

/**
 * Dashboard Provider Component
 *
 * Provides dashboard context to all child components including theme,
 * filters, layout, widgets, and refresh state.
 *
 * @example
 * ```tsx
 * <DashboardProvider config={{ theme: 'dark', enablePersistence: true }}>
 *   <Dashboard>
 *     <Widget>...</Widget>
 *   </Dashboard>
 * </DashboardProvider>
 * ```
 */
export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
  config = {},
}) => {
  const mergedConfig: DashboardConfig = { ...DEFAULT_CONFIG, ...config };

  const [theme, setTheme] = useState<DashboardTheme>(mergedConfig.theme || "light");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [layout, setLayout] = useState<Record<string, any>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [widgets, setWidgets] = useState<Record<string, WidgetConfig>>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string>();

  const value: DashboardContextType = {
    theme,
    setTheme,
    filters,
    setFilters,
    layout,
    setLayout,
    isRefreshing,
    setIsRefreshing,
    widgets,
    setWidgets,
    isFullscreen,
    setIsFullscreen,
    selectedWidget,
    setSelectedWidget,
    config: mergedConfig,
  };

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  );
};

/**
 * Hook to access dashboard context
 *
 * @returns Dashboard context
 * @throws Error if used outside of DashboardProvider
 *
 * @example
 * ```tsx
 * const { theme, setTheme, filters } = useDashboard();
 * ```
 */
export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  return context;
};

export { DashboardContext };
export type { DashboardContextType };
