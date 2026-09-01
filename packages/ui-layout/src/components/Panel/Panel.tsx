import React from 'react';
import './Panel.css';

export interface PanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  testId?: string;
}

export function Panel({ children, className = '', title, testId }: PanelProps) {
  return (
    <article className={`wx-panel ${className}`} aria-label={title} data-testid={testId}>
      {title && <h3 className="wx-panel-title">{title}</h3>}
      {children}
    </article>
  );
}
