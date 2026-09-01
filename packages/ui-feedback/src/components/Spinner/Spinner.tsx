import React from 'react';
import './Spinner.css';

export interface SpinnerProps {
  size?: number;
  className?: string;
  testId?: string;
}

export function Spinner({ size = 24, className = '', testId }: SpinnerProps) {
  return (
    <div
      className={`wx-spinner ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
      data-testid={testId}
    />
  );
}
