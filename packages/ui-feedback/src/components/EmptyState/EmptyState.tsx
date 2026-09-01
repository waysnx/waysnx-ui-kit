import React from "react";
import "./EmptyState.css";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  testId?: string;
}

export function EmptyState({ icon, title, description, action, className = "", testId }: EmptyStateProps) {
  return (
    <div className={`wx-empty-state ${className}`} role="status" aria-label="Empty state" data-testid={testId}>
      {icon && <div className="wx-empty-icon" aria-hidden="true">{icon}</div>}
      <div className="wx-empty-title">{title}</div>
      {description && <div className="wx-empty-description">{description}</div>}
      {action && <div className="wx-empty-action">{action}</div>}
    </div>
  );
}
