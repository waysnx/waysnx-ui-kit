import React from "react";
import "./Progress.css";

export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
  testId?: string;
}

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  size = "md",
  color,
  className = "",
  testId,
}: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const progressId = `progress-${Math.random().toString(36).slice(2)}`;

  return (
    <div className={`wx-progress ${className}`} data-testid={testId}>
      {(label || showValue) && (
        <div className="wx-progress-header">
          {label && <label htmlFor={progressId} className="wx-progress-label">{label}</label>}
          {showValue && <span className="wx-progress-value" aria-hidden="true">{Math.round(percent)}%</span>}
        </div>
      )}
      <div
        id={progressId}
        className={`wx-progress-track wx-progress-${size}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || "Progress"}
      >
        <div
          className="wx-progress-fill"
          style={{ width: `${percent}%`, background: color }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
