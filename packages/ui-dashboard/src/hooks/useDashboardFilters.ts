/**
 * @file useDashboardFilters.ts
 * Hook for managing dashboard filters
 */

import { useCallback } from "react";
import { useDashboard } from "./useDashboard";

/**
 * Hook for managing dashboard filters
 *
 * @returns Filters and filter management methods
 *
 * @example
 * ```tsx
 * const { filters, setFilter, clearFilters } = useDashboardFilters();
 * ```
 */
export const useDashboardFilters = () => {
  const { filters, setFilters } = useDashboard();

  const setFilter = useCallback(
    (key: string, value: any) => {
      setFilters({
        ...filters,
        [key]: value,
      });
    },
    [filters, setFilters]
  );

  const removeFilter = useCallback(
    (key: string) => {
      const { [key]: removed, ...remaining } = filters;
      setFilters(remaining);
    },
    [filters, setFilters]
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, [setFilters]);

  const updateFilters = useCallback(
    (updates: Record<string, any>) => {
      setFilters({
        ...filters,
        ...updates,
      });
    },
    [filters, setFilters]
  );

  return {
    filters,
    setFilter,
    removeFilter,
    clearFilters,
    updateFilters,
  };
};
