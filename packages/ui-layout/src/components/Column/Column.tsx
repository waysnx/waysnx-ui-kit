import React from 'react';
import './Column.css';

export interface ColumnProps {
  children: React.ReactNode;
  gap?: number | string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  className?: string;
}

export function Column({ 
  children, 
  gap = '1rem',
  align = 'stretch',
  justify = 'start',
  className = '' 
}: ColumnProps) {
  const style = {
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    alignItems: align,
    justifyContent: justify === 'between' ? 'space-between' : justify === 'around' ? 'space-around' : justify,
  };

  return (
    <div className={`wx-column ${className}`} style={style} role="gridcell">
      {children}
    </div>
  );
}
