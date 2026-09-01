/**
 * @file DashboardHeader.tsx
 * Dashboard header component
 */

import React, { ReactNode, CSSProperties } from "react";

/**
 * Dashboard header props
 */
interface DashboardHeaderProps {
  /**
   * Header title
   */
  title?: string;

  /**
   * Header subtitle
   */
  subtitle?: string;

  /**
   * Action buttons/elements
   */
  actions?: ReactNode;

  /**
   * Breadcrumb navigation
   */
  breadcrumb?: ReactNode;

  /**
   * Header icon
   */
  icon?: ReactNode;

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
 * Dashboard Header Component
 *
 * Displays dashboard title, subtitle, breadcrumb navigation, and action buttons.
 *
 * @example
 * ```tsx
 * <DashboardHeader
 *   title="Analytics"
 *   subtitle="Real-time metrics"
 *   breadcrumb={<Breadcrumb />}
 *   actions={<button>Export</button>}
 * />
 * ```
 */
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  actions,
  breadcrumb,
  icon,
  className = "",
  style,
}) => {
  return (
    <header
      className={`dashboard-header ${className}`}
      style={style}
      role="banner"
    >
      {breadcrumb && <nav className="dashboard-breadcrumb">{breadcrumb}</nav>}

      <div className="dashboard-header-content">
        <div className="dashboard-header-title-section">
          {icon && <span className="dashboard-header-icon">{icon}</span>}
          <div className="dashboard-header-text">
            {title && <h1 className="dashboard-title">{title}</h1>}
            {subtitle && <p className="dashboard-subtitle">{subtitle}</p>}
          </div>
        </div>

        {actions && <div className="dashboard-header-actions">{actions}</div>}
      </div>
    </header>
  );
};

DashboardHeader.displayName = "DashboardHeader";
