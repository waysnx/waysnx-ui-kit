/**
 * @file DashboardFooter.tsx
 * Dashboard footer component
 */

import React, { ReactNode, CSSProperties } from "react";

/**
 * Dashboard footer props
 */
interface DashboardFooterProps {
  /**
   * Last updated timestamp
   */
  lastUpdated?: Date | string;

  /**
   * Dashboard version
   */
  version?: string;

  /**
   * Current user
   */
  user?: string;

  /**
   * Custom content
   */
  children?: ReactNode;

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
 * Dashboard Footer Component
 *
 * Displays dashboard metadata like last updated time, version, and current user.
 *
 * @example
 * ```tsx
 * <DashboardFooter
 *   lastUpdated={new Date()}
 *   version="1.0.0"
 *   user="John Doe"
 * />
 * ```
 */
export const DashboardFooter: React.FC<DashboardFooterProps> = ({
  lastUpdated,
  version,
  user,
  children,
  className = "",
  style,
}) => {
  const formatTime = (time: Date | string): string => {
    if (typeof time === "string") return time;
    return time.toLocaleString();
  };

  return (
    <footer
      className={`dashboard-footer ${className}`}
      style={style}
      role="contentinfo"
    >
      <div className="dashboard-footer-content">
        {children}

        <div className="dashboard-footer-metadata">
          {lastUpdated && (
            <span className="dashboard-footer-item">
              Last updated: {formatTime(lastUpdated)}
            </span>
          )}
          {version && (
            <span className="dashboard-footer-item">
              Version: {version}
            </span>
          )}
          {user && (
            <span className="dashboard-footer-item">
              User: {user}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
};

DashboardFooter.displayName = "DashboardFooter";
