/**
 * @file useRefresh.ts
 * Hook for managing refresh state and auto-refresh
 */

import { useCallback, useEffect, useRef } from "react";
import { RefreshConfig } from "../types";
import { useDashboard } from "./useDashboard";

/**
 * Hook for managing refresh operations
 *
 * @param config - Refresh configuration
 * @returns Object with refresh state and methods
 *
 * @example
 * ```tsx
 * const { isRefreshing, refresh, startAutoRefresh } = useRefresh({
 *   interval: '1m',
 *   callback: () => fetchData()
 * });
 * ```
 */
export const useRefresh = (config: RefreshConfig) => {
  const { isRefreshing, setIsRefreshing, config: dashboardConfig } = useDashboard();
  const autoRefreshTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const refresh = useCallback(async () => {
    if (!config.enabled || !config.callback) return;

    setIsRefreshing(true);
    try {
      await config.callback();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [config, setIsRefreshing]);

  const startAutoRefresh = useCallback(() => {
    if (!config.enabled || !config.interval) return;

    const intervalMs = getIntervalMs(config.interval, config.customInterval);

    autoRefreshTimer.current = setInterval(() => {
      refresh().catch((error) => console.error("Auto-refresh failed:", error));
    }, intervalMs);
  }, [config, refresh]);

  const stopAutoRefresh = useCallback(() => {
    if (autoRefreshTimer.current) {
      clearInterval(autoRefreshTimer.current);
      autoRefreshTimer.current = undefined;
    }
  }, []);

  useEffect(() => {
    if (config.enabled && dashboardConfig.enableAutoRefresh) {
      startAutoRefresh();
    }

    return () => {
      stopAutoRefresh();
    };
  }, [config.enabled, dashboardConfig.enableAutoRefresh, startAutoRefresh, stopAutoRefresh]);

  return {
    isRefreshing,
    refresh,
    startAutoRefresh,
    stopAutoRefresh,
  };
};

/**
 * Get interval in milliseconds
 */
function getIntervalMs(
  interval: "30s" | "1m" | "5m" | "15m" | "custom",
  customInterval?: number
): number {
  const intervals: Record<string, number> = {
    "30s": 30000,
    "1m": 60000,
    "5m": 300000,
    "15m": 900000,
  };

  if (interval === "custom" && customInterval) {
    return customInterval;
  }

  return intervals[interval] || 60000;
}
