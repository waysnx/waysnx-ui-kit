import React, { useState } from 'react';
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
  const contentId = `collapsible-content-${Math.random().toString(36).slice(2)}`;
  const triggerId = `collapsible-trigger-${Math.random().toString(36).slice(2)}`;

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
