/**
 * @file DashboardToolbar.tsx
 * Dashboard toolbar component
 */

import React, { ReactNode, CSSProperties } from "react";

/**
 * Dashboard toolbar props
 */
interface DashboardToolbarProps {
  /**
   * Left-aligned content
   */
  left?: ReactNode;

  /**
   * Right-aligned content
   */
  right?: ReactNode;

  /**
   * Make toolbar sticky
   */
  sticky?: boolean;

  /**
   * Dense/compact mode
   */
  dense?: boolean;

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
 * Dashboard Toolbar Component
 *
 * Toolbar for dashboard-level actions like search, filters, refresh, and export.
 *
 * @example
 * ```tsx
 * <DashboardToolbar
 *   left={<Search />}
 *   right={<button>Export</button>}
 *   sticky
 * />
 * ```
 */
export const DashboardToolbar: React.FC<DashboardToolbarProps> = ({
  left,
  right,
  sticky = false,
  dense = false,
  className = "",
  style,
}) => {
  return (
    <div
      className={`dashboard-toolbar ${sticky ? "dashboard-toolbar-sticky" : ""} ${
        dense ? "dashboard-toolbar-dense" : ""
      } ${className}`}
      style={style}
      role="toolbar"
    >
      {left && <div className="dashboard-toolbar-left">{left}</div>}
      {right && <div className="dashboard-toolbar-right">{right}</div>}
    </div>
  );
};

DashboardToolbar.displayName = "DashboardToolbar";
