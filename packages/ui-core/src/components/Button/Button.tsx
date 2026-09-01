import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
  ariaLabel?: string;
  ariaPressed?: boolean;
  testId?: string;
}

export function Button({ children, variant = 'primary', className, ariaLabel, ariaPressed, testId, ...p }: ButtonProps) {
  const variantClass = `wx-button--${variant}`;
  const combinedClassName = `wx-button ${variantClass} ${className || ''}`.trim();
  
  return (
    <button
      className={combinedClassName}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      data-testid={testId}
      {...p}
    >
      {children}
    </button>
  );
}
