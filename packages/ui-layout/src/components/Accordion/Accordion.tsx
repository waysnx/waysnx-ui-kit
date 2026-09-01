import React, { useState, createContext, useContext } from 'react';
import './Accordion.css';

interface AccordionContextType {
  openItems: string[];
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

export interface AccordionProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
  testId?: string;
}

export function Accordion({ 
  children, 
  allowMultiple = false,
  defaultOpen = [],
  className = '',
  testId,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      <div className={`wx-accordion ${className}`} role="region" aria-label="Accordion" data-testid={testId}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  testId?: string;
}

export function AccordionItem({ 
  id, 
  title, 
  children,
  className = '',
  testId,
}: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const { openItems, toggleItem } = context;
  const isOpen = openItems.includes(id);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(id);
    }
  };

  return (
    <div className={`wx-accordion-item ${className}`} data-testid={testId}>
      <button
        id={`accordion-trigger-${id}`}
        className="wx-accordion-trigger"
        onClick={() => toggleItem(id)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
      >
        <span className="wx-accordion-title">{title}</span>
        <span className={`wx-accordion-icon ${isOpen ? 'wx-accordion-icon-open' : ''}`} aria-hidden="true">
          ▼
        </span>
      </button>
      {isOpen && (
        <div 
          id={`accordion-content-${id}`}
          className="wx-accordion-content"
          role="region"
          aria-labelledby={`accordion-trigger-${id}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
