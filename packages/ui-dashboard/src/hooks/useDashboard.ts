/**
 * @file useDashboard.ts
 * Hook to access dashboard context
 */

import { useContext } from "react";
import { DashboardContext, DashboardContextType } from "../context/DashboardContext";

/**
 * Hook to access the dashboard context
 *
 * @returns Dashboard context
 * @throws Error if used outside of DashboardProvider
 *
 * @example
 * ```tsx
 * const { theme, filters, widgets } = useDashboard();
 * ```
 */
export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  return context;
};
