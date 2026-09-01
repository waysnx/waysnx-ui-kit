/**
 * @file DashboardSidebar.tsx
 * Dashboard sidebar component
 */

import React, { ReactNode, CSSProperties, useState } from "react";

/**
 * Dashboard sidebar props
 */
interface DashboardSidebarProps {
  /**
   * Sidebar content
   */
  children?: ReactNode;

  /**
   * Is sidebar collapsible
   */
  collapsible?: boolean;

  /**
   * Is sidebar initially collapsed
   */
  defaultCollapsed?: boolean;

  /**
   * Is sidebar resizable
   */
  resizable?: boolean;

  /**
   * Sidebar width
   */
  width?: number | string;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional CSS styles
   */
  style?: CSSProperties;

  /**
   * Callback when sidebar is toggled
   */
  onToggle?: (collapsed: boolean) => void;
}

/**
 * Dashboard Sidebar Component
 *
 * Sidebar for navigation, saved dashboards, and templates.
 *
 * @example
 * ```tsx
 * <DashboardSidebar collapsible width={250}>
 *   <nav>Navigation items</nav>
 * </DashboardSidebar>
 * ```
 */
export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  children,
  collapsible = false,
  defaultCollapsed = false,
  resizable: _resizable = false,
  width = 250,
  className = "",
  style,
  onToggle,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onToggle?.(newState);
  };

  return (
    <aside
      className={`dashboard-sidebar ${isCollapsed ? "dashboard-sidebar-collapsed" : ""} ${
        collapsible ? "dashboard-sidebar-collapsible" : ""
      } ${className}`}
      style={{
        width: isCollapsed ? 0 : width,
        ...style,
      }}
      role="complementary"
      aria-label="Dashboard navigation"
    >
      {collapsible && (
        <button
          className="dashboard-sidebar-toggle"
          onClick={handleToggle}
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "→" : "←"}
        </button>
      )}

      <div className="dashboard-sidebar-content">{children}</div>
    </aside>
  );
};

DashboardSidebar.displayName = "DashboardSidebar";
