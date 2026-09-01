import React from 'react';
import './Stack.css';

export interface StackProps {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  gap?: number | string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
  label?: string;
}

export function Stack({ 
  children, 
  direction = 'vertical',
  gap = '1rem',
  align = 'stretch',
  className = '',
  label
}: StackProps) {
  const style = {
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    alignItems: align,
  };

  return (
    <div 
      className={`wx-stack wx-stack-${direction} ${className}`} 
      style={style}
      role="group"
      aria-label={label}
    >
      {children}
    </div>
  );
}
