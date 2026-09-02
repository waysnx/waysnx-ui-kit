import React, { useState, useId } from 'react';
import './Collapsible.css';

export interface CollapsibleProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  testId?: string;
}

export function Collapsible({ 
  title, 
  children, 
  defaultOpen = false,
  className = '',
  testId,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  // Stable, SSR-safe ids derived from a single useId() so the trigger/content
  // aria-controls / aria-labelledby relationship stays paired across renders.
  const baseId = useId();
  const contentId = `collapsible-content-${baseId}`;
  const triggerId = `collapsible-trigger-${baseId}`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`wx-collapsible ${className}`} data-testid={testId}>
      <button
        id={triggerId}
        className="wx-collapsible-trigger"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="wx-collapsible-title">{title}</span>
        <span className={`wx-collapsible-icon ${isOpen ? 'wx-collapsible-icon-open' : ''}`} aria-hidden="true">
          ▼
        </span>
      </button>
      {isOpen && (
        <div 
          id={contentId}
          className="wx-collapsible-content"
          role="region"
          aria-labelledby={triggerId}
        >
          {children}
        </div>
      )}
    </div>
  );
}
