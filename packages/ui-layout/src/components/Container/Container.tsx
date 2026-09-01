import React from 'react';
import './Container.css';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  label?: string;
}

export function Container({ 
  children, 
  maxWidth = 'lg',
  className = '',
  label
}: ContainerProps) {
  return (
    <div 
      className={`wx-container wx-container-${maxWidth} ${className}`}
      aria-label={label}
    >
      {children}
    </div>
  );
}
