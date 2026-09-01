import React from 'react';
import './Card.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  testId?: string;
}

export function Card({ children, className = '', title, testId }: CardProps) {
  return (
    <article className={`wx-card ${className}`} aria-label={title} data-testid={testId}>
      {title && <h3 className="wx-card-title">{title}</h3>}
      {children}
    </article>
  );
}
