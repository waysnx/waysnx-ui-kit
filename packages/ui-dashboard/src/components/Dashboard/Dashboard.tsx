/**
 * @file Dashboard.tsx
 * Main dashboard container component
 */

import React, { ReactNode, CSSProperties, useEffect } from "react";
import { useTranslation } from "@waysnx/ui-i18n";
import { DashboardProvider } from "../../context";
import { useDashboard } from "../../hooks";
import { DashboardConfig, DashboardTheme } from "../../types";
import "../../styles/index.css";

/**
 * Dashboard props
 */
export interface DashboardProps {
  /**
   * Dashboard title
   */
  title?: string;

  /**
   * Dashboard description
   */
  description?: string;

  /**
   * Content to render inside dashboard
   */
  children?: ReactNode;

  /**
   * Toolbar content
   */
  toolbar?: ReactNode;

  /**
   * Sidebar content
   */
  sidebar?: ReactNode;

  /**
   * Footer content
   */
  footer?: ReactNode;

  /**
   * Is dashboard in loading state
   */
  loading?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional CSS styles
   */
  style?: CSSProperties;

  /**
   * Dashboard configuration
   */
  config?: Partial<DashboardConfig>;

  /**
   * Callback when theme changes
   */
  onThemeChange?: (theme: DashboardTheme) => void;

  /**
   * Callback when filters change
   */
  onFiltersChange?: (filters: Record<string, any>) => void;
}

/**
 * Internal Dashboard component (must be used inside provider)
 */
const DashboardInner: React.FC<DashboardProps> = ({
  title,
  description,
  children,
  toolbar,
  sidebar,
  footer,
  loading = false,
  className = "",
  style,
  onThemeChange,
  onFiltersChange,
}) => {
  const { theme, filters } = useDashboard();
  const { t } = useTranslation();

  useEffect(() => {
    if (onThemeChange) {
      onThemeChange(theme);
    }
  }, [theme, onThemeChange]);

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  return (
    <div
      className={`dashboard ${loading ? "dashboard-loading" : ""} ${className}`}
      style={style}
      data-dashboard-theme={theme}
    >
      {/* Skip link for accessibility */}
      <a href="#dashboard-content" className="dashboard-skip-link">
        {t('dashboard.skipToContent')}
      </a>

      {/* Toolbar */}
      {toolbar && (
        <div className="dashboard-toolbar" role="toolbar">
          {toolbar}
        </div>
      )}

      {/* Main container */}
      <div className="dashboard-container">
        {/* Sidebar */}
        {sidebar && (
          <aside className="dashboard-sidebar" role="complementary">
            {sidebar}
          </aside>
        )}

        {/* Main content */}
        <main className="dashboard-main" role="main" aria-label={title || "Dashboard"}>
          {/* Header */}
          {(title || description) && (
            <header className="dashboard-header" role="banner">
              {title && <h1 className="dashboard-title">{title}</h1>}
              {description && <p className="dashboard-description">{description}</p>}
            </header>
          )}

          {/* Content */}
          <div id="dashboard-content" className="dashboard-content">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <footer className="dashboard-footer" role="contentinfo">
          {footer}
        </footer>
      )}
    </div>
  );
};

/**
 * Dashboard Component
 *
 * Main dashboard container that provides layout and context for all dashboard features.
 *
 * @example
 * ```tsx
 * <Dashboard
 *   title="Analytics Dashboard"
 *   config={{ theme: 'dark', enablePersistence: true }}
 * >
 *   <Widget>...</Widget>
 * </Dashboard>
 * ```
 */
export const Dashboard: React.FC<DashboardProps & { config?: Partial<DashboardConfig> }> = ({
  config,
  ...props
}) => {
  return (
    <DashboardProvider config={config}>
      <DashboardInner {...props} />
    </DashboardProvider>
  );
};

Dashboard.displayName = "Dashboard";
