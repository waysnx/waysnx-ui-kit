import React from 'react';
import './Alert.css';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
  testId?: string;
}

export function Alert({ type = 'info', children, className = '', testId }: AlertProps) {
  return (
    <div 
      className={`wx-alert wx-alert-${type} ${className}`} 
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      aria-label={`${type} alert`}
      data-testid={testId}
    >
      {children}
    </div>
  );
}
