import React from "react";
import "./Skeleton.css";

export interface SkeletonProps {
  variant?: "text" | "circle" | "rect";
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
  testId?: string;
}

export function Skeleton({
  variant = "text",
  width,
  height,
  count = 1,
  className = "",
  testId,
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  const items = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`wx-skeleton wx-skeleton-${variant} ${className}`}
      style={style}
      role="status"
      aria-busy="true"
      aria-label="Loading content"
      {...(count === 1 ? { "data-testid": testId } : {})}
    />
  ));

  return count === 1 ? items[0] : <div className="wx-skeleton-group" data-testid={testId}>{items}</div>;
}
