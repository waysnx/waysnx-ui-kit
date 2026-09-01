import React, { useRef, useEffect, useState } from 'react';
import './PageTabs.css';

export interface PageTab {
  id: string;
  label: string;
  href?: string;
  disabled?: boolean;
}

export interface PageTabsProps {
  tabs: PageTab[];
  activeTab: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  label?: string;
}

export const PageTabs: React.FC<PageTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
  label = 'Page tabs',
}) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const tabRefs = useRef<(HTMLElement | null)[]>([]);

  const handleTabClick = (tab: PageTab) => {
    if (!tab.disabled && onTabChange) {
      onTabChange(tab.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        setFocusedIndex(nextIndex);
        tabRefs.current[nextIndex]?.focus();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        setFocusedIndex(nextIndex);
        tabRefs.current[nextIndex]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        tabRefs.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        const lastIndex = tabs.length - 1;
        setFocusedIndex(lastIndex);
        tabRefs.current[lastIndex]?.focus();
        break;
    }
  };

  return (
    <div className={`page-tabs ${className}`}>
      <div className="page-tabs-list" role="tablist" aria-label={label}>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          
          return tab.href ? (
            <a
              key={tab.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              href={tab.href}
              className={`page-tab ${isActive ? 'page-tab-active' : ''} ${
                tab.disabled ? 'page-tab-disabled' : ''
              }`}
              role="tab"
              aria-selected={isActive}
              aria-disabled={tab.disabled}
              aria-controls={`panel-${tab.id}`}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={isActive ? 0 : -1}
            >
              {tab.label}
            </a>
          ) : (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              type="button"
              onClick={() => handleTabClick(tab)}
              className={`page-tab ${isActive ? 'page-tab-active' : ''} ${
                tab.disabled ? 'page-tab-disabled' : ''
              }`}
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              aria-controls={`panel-${tab.id}`}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={isActive ? 0 : -1}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
