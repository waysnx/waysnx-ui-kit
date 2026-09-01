/**
 * @file DashboardFilterBar.tsx
 * Dashboard filter bar component
 */

import React, { ReactNode, CSSProperties } from "react";
import { FilterConfig } from "../../types";
import { useDashboardFilters } from "../../hooks";

/**
 * Dashboard filter bar props
 */
interface DashboardFilterBarProps {
  /**
   * Filter configurations
   */
  filters?: FilterConfig[];

  /**
   * Additional toolbar content
   */
  children?: ReactNode;

  /**
   * Is filter bar sticky
   */
  sticky?: boolean;

  /**
   * Show clear all button
   */
  showClearAll?: boolean;

  /**
   * On filter change handler
   */
  onFilterChange?: (filterId: string, value: any) => void;

  /**
   * On clear all handler
   */
  onClearAll?: () => void;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional CSS styles
   */
  style?: CSSProperties;
}

/**
 * Dashboard Filter Bar Component
 *
 * Provides search, filters, date range selection, and other dashboard-level controls.
 *
 * @example
 * ```tsx
 * <DashboardFilterBar
 *   filters={[
 *     { id: 'status', label: 'Status', type: 'select', options: [...] },
 *     { id: 'date', label: 'Date', type: 'daterange' }
 *   ]}
 *   sticky
 *   showClearAll
 * />
 * ```
 */
export const DashboardFilterBar: React.FC<DashboardFilterBarProps> = ({
  filters = [],
  children,
  sticky = false,
  showClearAll = true,
  onFilterChange,
  onClearAll,
  className = "",
  style,
}) => {
  const { setFilter, clearFilters } = useDashboardFilters();

  const handleFilterChange = (filterId: string, value: any) => {
    setFilter(filterId, value);
    onFilterChange?.(filterId, value);
  };

  const handleClearAll = () => {
    clearFilters();
    onClearAll?.();
  };

  return (
    <div
      className={`dashboard-filter-bar ${sticky ? "dashboard-filter-bar-sticky" : ""} ${className}`}
      style={style}
      role="toolbar"
      aria-label="Filters"
    >
      <div className="dashboard-filter-bar-content">
        {filters.map((filter) => (
          <div key={filter.id} className="dashboard-filter-item">
            <label htmlFor={filter.id} className="dashboard-filter-label">
              {filter.label}
            </label>

            {filter.type === "select" && (
              <select
                id={filter.id}
                className="dashboard-filter-input"
                defaultValue={filter.defaultValue}
                onChange={(e) => handleFilterChange(filter.id, e.target.value)}
              >
                {filter.clearable && <option value="">All</option>}
                {filter.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {filter.type === "search" && (
              <input
                id={filter.id}
                type="text"
                className="dashboard-filter-input"
                placeholder={filter.label}
                defaultValue={filter.defaultValue}
                onChange={(e) => handleFilterChange(filter.id, e.target.value)}
              />
            )}

            {filter.type === "daterange" && (
              <div className="dashboard-filter-daterange">
                <input
                  type="date"
                  className="dashboard-filter-input"
                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                />
                <span>to</span>
                <input
                  type="date"
                  className="dashboard-filter-input"
                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}

        {children}

        {showClearAll && filters.length > 0 && (
          <button
            className="dashboard-filter-clear-all"
            onClick={handleClearAll}
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Filter Chip props
 */
interface FilterChipProps {
  /**
   * Chip label
   */
  label: string;

  /**
   * Is chip removable
   */
  removable?: boolean;

  /**
   * On remove handler
   */
  onRemove?: () => void;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional CSS styles
   */
  style?: CSSProperties;
}

/**
 * Filter Chip Component
 *
 * Visual representation of an active filter that can be removed.
 *
 * @example
 * ```tsx
 * <FilterChip
 *   label="Active"
 *   removable
 *   onRemove={() => removeFilter()}
 * />
 * ```
 */
export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  removable = true,
  onRemove,
  className = "",
  style,
}) => {
  return (
    <div className={`filter-chip ${className}`} style={style} role="status">
      <span className="filter-chip-label">{label}</span>
      {removable && (
        <button
          className="filter-chip-remove"
          onClick={onRemove}
          aria-label={`Remove filter: ${label}`}
        >
          ✕
        </button>
      )}
    </div>
  );
};

DashboardFilterBar.displayName = "DashboardFilterBar";
FilterChip.displayName = "FilterChip";
