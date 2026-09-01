import React from 'react';
import './Spacer.css';

export interface SpacerProps {
  size?: number | string;
  className?: string;
}

export function Spacer({ 
  size = '1rem',
  className = '' 
}: SpacerProps) {
  const style = {
    height: typeof size === 'number' ? `${size}px` : size,
  };

  return (
    <div className={`wx-spacer ${className}`} style={style} aria-hidden="true" />
  );
}
