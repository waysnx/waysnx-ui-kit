import React from "react";
import "./Badge.css";

export interface BadgeProps {
  count?: number;
  maxCount?: number;
  dot?: boolean;
  color?: "default" | "success" | "error" | "warning" | "info";
  children?: React.ReactNode;
  className?: string;
  testId?: string;
}

export function Badge({
  count,
  maxCount = 99,
  dot = false,
  color = "error",
  children,
  className = "",
  testId,
}: BadgeProps) {
  const displayCount = count !== undefined && count > maxCount ? `${maxCount}+` : count;
  const showBadge = dot || (count !== undefined && count > 0);

  if (!children) {
    return (
      <span 
        className={`wx-badge-standalone wx-badge-${color} ${className}`}
        aria-label={dot ? "Badge" : `${displayCount} items`}
        data-testid={testId}
      >
        {dot ? "" : displayCount}
      </span>
    );
  }

  return (
    <span className={`wx-badge-wrapper ${className}`} data-testid={testId}>
      {children}
      {showBadge && (
        <span 
          className={`wx-badge wx-badge-${color} ${dot ? "wx-badge-dot" : ""}`}
          aria-label={dot ? "Badge" : `${displayCount} items`}
        >
          {!dot && displayCount}
        </span>
      )}
    </span>
  );
}
