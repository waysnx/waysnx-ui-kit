import React from 'react';
import './Grid.css';

export interface GridProps {
  children: React.ReactNode;
  columns?: number | string;
  gap?: number | string;
  className?: string;
  label?: string;
}

export function Grid({ 
  children, 
  columns = 12,
  gap = '1rem',
  className = '',
  label
}: GridProps) {
  const style = {
    gridTemplateColumns: typeof columns === 'number' 
      ? `repeat(${columns}, 1fr)` 
      : columns,
    gap: typeof gap === 'number' ? `${gap}px` : gap,
  };

  return (
    <div 
      className={`wx-grid ${className}`} 
      style={style}
      role="grid"
      aria-label={label}
    >
      {children}
    </div>
  );
}
