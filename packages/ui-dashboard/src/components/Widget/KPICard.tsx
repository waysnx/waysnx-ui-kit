/**
 * @file KPICard.tsx
 * KPI and metric card components
 */

import React, { CSSProperties } from "react";
import "./KPICard.css";
import { KPIData, MetricData, StatusType, TrendDirection } from "../../types";

/**
 * StatCard props
 */
interface StatCardProps {
  /**
   * Card data
   */
  data: KPIData;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional CSS styles
   */
  style?: CSSProperties;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Custom trend icons. Override the default emoji icons.
   * @example
   * ```tsx
   * <StatCard data={data} trendIcons={{ up: "↗", down: "↘", neutral: "→" }} />
   * ```
   */
  trendIcons?: {
    up?: React.ReactNode;
    down?: React.ReactNode;
    neutral?: React.ReactNode;
  };
}

/**
 * Stat Card Component
 *
 * Displays a single KPI value with optional trend and status.
 *
 * @example
 * ```tsx
 * <StatCard
 *   data={{
 *     label: "Total Revenue",
 *     value: "$1.2M",
 *     trend: "up",
 *     change: 15,
 *     color: "primary"
 *   }}
 * />
 * ```
 */
export const StatCard: React.FC<StatCardProps> = ({
  data,
  className = "",
  style,
  onClick,
  trendIcons,
}) => {
  const getTrendIcon = (trend?: TrendDirection) => {
    switch (trend) {
      case "up":
        return trendIcons?.up ?? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
            <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
          </svg>
        );
      case "down":
        return trendIcons?.down ?? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
            <line x1="7" y1="7" x2="17" y2="17" /><polyline points="17 7 17 17 7 17" />
          </svg>
        );
      default:
        return trendIcons?.neutral ?? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        );
    }
  };

  const getStatusColor = (status?: StatusType): string => {
    const statusColors: Record<StatusType, string> = {
      success: "var(--wx-color-success)",
      error: "var(--wx-color-error)",
      warning: "var(--wx-color-warning)",
      info: "var(--wx-color-info)",
      pending: "var(--wx-dash-status-pending)",
    };
    return status ? statusColors[status] : "inherit";
  };

  return (
    <div
      className={`stat-card ${data.variant || "default"} ${className}`}
      style={{
        ...style,
        borderLeftColor: getStatusColor(data.status),
      }}
      onClick={onClick}
      role="article"
      aria-label={`${data.label}: ${data.value}`}
    >
      <div className="stat-card-header">
        {data.icon && <div className="stat-card-icon">{data.icon}</div>}
        <div className="stat-card-label">{data.label}</div>
      </div>

      <div className="stat-card-body">
        <div className="stat-card-value" style={{ color: data.color }}>
          {data.value}
        </div>

        {data.change !== undefined && (
          <div className="stat-card-trend">
            <span className="stat-card-trend-icon">
              {getTrendIcon(data.trend)}
            </span>
            <span className="stat-card-change">{Math.abs(data.change)}%</span>
          </div>
        )}

        {data.target && (
          <div className="stat-card-target">
            Target: {data.target}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Metric Card props
 */
interface MetricCardProps {
  /**
   * Metric data
   */
  data: MetricData;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional CSS styles
   */
  style?: CSSProperties;

  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * Metric Card Component
 *
 * Displays metric with actual vs target and progress bar.
 *
 * @example
 * ```tsx
 * <MetricCard
 *   data={{
 *     label: "Sales Target",
 *     actual: 850,
 *     target: 1000,
 *     progress: 85,
 *     status: "success"
 *   }}
 * />
 * ```
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  data,
  className = "",
  style,
  onClick,
}) => {
  const getStatusColor = (status?: StatusType): string => {
    const statusColors: Record<StatusType, string> = {
      success: "var(--wx-color-success)",
      error: "var(--wx-color-error)",
      warning: "var(--wx-color-warning)",
      info: "var(--wx-color-info)",
      pending: "var(--wx-dash-status-pending)",
    };
    return status ? statusColors[status] : "var(--wx-color-info)";
  };

  return (
    <div
      className={`metric-card ${className}`}
      style={style}
      onClick={onClick}
      role="article"
      aria-label={data.label}
    >
      <div className="metric-card-header">
        {data.icon && <div className="metric-card-icon">{data.icon}</div>}
        <h4 className="metric-card-label">{data.label}</h4>
      </div>

      <div className="metric-card-values">
        <div className="metric-card-actual">
          <span className="metric-value">{data.actual}</span>
          {data.unit && <span className="metric-unit">{data.unit}</span>}
        </div>
        {data.target && (
          <div className="metric-card-target">
            / {data.target}
            {data.unit && <span className="metric-unit">{data.unit}</span>}
          </div>
        )}
      </div>

      {data.progress !== undefined && (
        <div className="metric-card-progress">
          <div
            className="metric-card-progress-bar"
            style={{
              width: `${Math.min(data.progress, 100)}%`,
              backgroundColor: getStatusColor(data.status),
            }}
            role="progressbar"
            aria-valuenow={data.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          <span className="metric-card-progress-text">{data.progress}%</span>
        </div>
      )}
    </div>
  );
};

/**
 * Progress Card props
 */
interface ProgressCardProps {
  /**
   * Card label
   */
  label: string;

  /**
   * Progress percentage (0-100)
   */
  progress: number;

  /**
   * Progress type
   */
  type?: "circular" | "linear";

  /**
   * Status
   */
  status?: StatusType;

  /**
   * Show percentage text
   */
  showPercentage?: boolean;

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
 * Progress Card Component
 *
 * Displays progress with circular or linear indicator.
 *
 * @example
 * ```tsx
 * <ProgressCard
 *   label="Task Completion"
 *   progress={75}
 *   type="circular"
 *   status="success"
 *   showPercentage
 * />
 * ```
 */
export const ProgressCard: React.FC<ProgressCardProps> = ({
  label,
  progress,
  type = "linear",
  status = "info",
  showPercentage = true,
  className = "",
  style,
}) => {
  const getStatusColor = (): string => {
    const statusColors: Record<StatusType, string> = {
      success: "var(--wx-color-success)",
      error: "var(--wx-color-error)",
      warning: "var(--wx-color-warning)",
      info: "var(--wx-color-info)",
      pending: "var(--wx-dash-status-pending)",
    };
    return statusColors[status];
  };

  const boundedProgress = Math.min(Math.max(progress, 0), 100);

  if (type === "circular") {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (boundedProgress / 100) * circumference;

    return (
      <div
        className={`progress-card progress-card-circular ${className}`}
        style={style}
        role="article"
      >
        <svg width="120" height="120" className="progress-card-svg">
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="var(--wx-color-surface-hover)"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={getStatusColor()}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.3s ease" }}
          />
          {showPercentage && (
            <text
              x="60"
              y="60"
              textAnchor="middle"
              dy="0.3em"
              className="progress-card-text"
            >
              {boundedProgress}%
            </text>
          )}
        </svg>
        <div className="progress-card-label">{label}</div>
      </div>
    );
  }

  return (
    <div
      className={`progress-card progress-card-linear ${className}`}
      style={style}
      role="article"
    >
      <div className="progress-card-header">
        <div className="progress-card-label">{label}</div>
        {showPercentage && <div className="progress-card-percentage">{boundedProgress}%</div>}
      </div>
      <div className="progress-card-bar">
        <div
          className="progress-card-fill"
          style={{
            width: `${boundedProgress}%`,
            backgroundColor: getStatusColor(),
          }}
          role="progressbar"
          aria-valuenow={boundedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

StatCard.displayName = "StatCard";
MetricCard.displayName = "MetricCard";
ProgressCard.displayName = "ProgressCard";
