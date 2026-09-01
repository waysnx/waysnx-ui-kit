import React from 'react';
import './Section.css';

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export function Section({ children, className = '', label }: SectionProps) {
  return (
    <section className={`wx-section ${className}`} aria-label={label}>
      {children}
    </section>
  );
}
