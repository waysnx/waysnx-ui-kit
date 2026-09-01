import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import './Tabs.css';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
  tabIds: string[];
  registerTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

export interface TabsProps {
  children: React.ReactNode;
  defaultTab?: string;
  className?: string;
  label?: string;
  testId?: string;
}

export function Tabs({ 
  children, 
  defaultTab,
  className = '',
  label = 'Tabs',
  testId,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || '');
  const [tabIds, setTabIds] = useState<string[]>([]);

  const registerTab = (id: string) => {
    setTabIds(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, tabIds, registerTab }}>
      <div className={`wx-tabs ${className}`} data-tabs-label={label} data-testid={testId}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabListProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export function TabList({ children, className = '', label }: TabListProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabList must be used within Tabs');

  return (
    <div 
      className={`wx-tab-list ${className}`} 
      role="tablist"
      aria-label={label}
    >
      {children}
    </div>
  );
}

export interface TabProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function Tab({ id, children, className = '' }: TabProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const { activeTab, setActiveTab, tabIds, registerTab } = context;
  const isActive = activeTab === id;
  const tabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    registerTab(id);
  }, [id, registerTab]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = tabIds.indexOf(id);
    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (currentIndex + 1) % tabIds.length;
        setActiveTab(tabIds[nextIndex]);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
        setActiveTab(tabIds[nextIndex]);
        break;
      case 'Home':
        e.preventDefault();
        setActiveTab(tabIds[0]);
        break;
      case 'End':
        e.preventDefault();
        setActiveTab(tabIds[tabIds.length - 1]);
        break;
    }
  };

  useEffect(() => {
    if (isActive && tabRef.current) {
      tabRef.current.focus();
    }
  }, [isActive]);

  return (
    <button
      ref={tabRef}
      className={`wx-tab ${isActive ? 'wx-tab-active' : ''} ${className}`}
      onClick={() => setActiveTab(id)}
      onKeyDown={handleKeyDown}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      tabIndex={isActive ? 0 : -1}
    >
      {children}
    </button>
  );
}

export interface TabPanelsProps {
  children: React.ReactNode;
  className?: string;
}

export function TabPanels({ children, className = '' }: TabPanelsProps) {
  return (
    <div className={`wx-tab-panels ${className}`}>
      {children}
    </div>
  );
}

export interface TabPanelProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export function TabPanel({ id, children, className = '', label }: TabPanelProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  const { activeTab } = context;
  if (activeTab !== id) return null;

  return (
    <div 
      id={`panel-${id}`}
      className={`wx-tab-panel ${className}`} 
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
