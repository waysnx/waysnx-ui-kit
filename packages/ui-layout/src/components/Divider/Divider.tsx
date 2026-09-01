import React from 'react';
import './Divider.css';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({ 
  orientation = 'horizontal',
  className = '' 
}: DividerProps) {
  return (
    <hr 
      className={`wx-divider wx-divider-${orientation} ${className}`}
      role="separator"
      aria-orientation={orientation}
    />
  );
}
