import React from 'react';
import './Row.css';

export interface RowProps {
  children: React.ReactNode;
  gap?: number | string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  className?: string;
}

export function Row({ 
  children, 
  gap = '1rem',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '' 
}: RowProps) {
  const style = {
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    alignItems: align,
    justifyContent: justify === 'between' ? 'space-between' : justify === 'around' ? 'space-around' : justify,
    flexWrap: wrap ? 'wrap' as const : 'nowrap' as const,
  };

  return (
    <div className={`wx-row ${className}`} style={style} role="row">
      {children}
    </div>
  );
}
