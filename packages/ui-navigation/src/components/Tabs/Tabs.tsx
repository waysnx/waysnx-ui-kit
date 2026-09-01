/**
 * @file components/Tabs/Tabs.tsx
 * Tabs component for tabbed navigation
 */

import React, { useState, useCallback, useRef, useEffect, forwardRef, ReactNode } from 'react';
import { useTranslation } from '@waysnx/ui-i18n';
import './tabs.css';

/**
 * Tab configuration
 */
export interface TabConfig {
  /**
   * Unique tab identifier
   */
  id: string;

  /**
   * Tab label/title
   */
  label: string;

  /**
   * Tab content (can be lazy-loaded)
   */
  content?: ReactNode;

  /**
   * Icon for tab
   */
  icon?: string;

  /**
   * Badge on tab
   */
  badge?: string;

  /**
   * Whether tab is disabled
   */
  disabled?: boolean;

  /**
   * Lazy load content function
   */
  lazyContent?: () => Promise<ReactNode>;

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Tabs component props
 */
export interface TabsProps {
  /**
   * Tab items
   */
  tabs: TabConfig[];

  /**
   * Currently active tab ID
   */
  activeTabId?: string;

  /**
   * Callback when tab is changed
   */
  onTabChange?: (tabId: string) => void;

  /**
   * Component density
   */
  density?: 'compact' | 'normal' | 'spacious';

  /**
   * Tab position
   */
  variant?: 'default' | 'minimal' | 'elevated';

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: React.CSSProperties;

  /**
   * Show tab icons
   */
  showIcons?: boolean;

  /**
   * Show tab badges
   */
  showBadges?: boolean;

  /**
   * Keyboard navigation enabled
   */
  keyboardNav?: boolean;

  /**
   * Accessible label for tabs
   */
  ariaLabel?: string;

  /**
   * Tab orientation
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Scroll tabs when overflow
   */
  scrollable?: boolean;

  /**
   * Show tab close buttons
   */
  closable?: boolean;

  /**
   * Callback when tab is closed
   */
  onTabClose?: (tabId: string) => void;

  /**
   * Enable lazy loading
   */
  lazyLoad?: boolean;
}

/**
 * Tabs Component
 *
 * Tabbed interface with support for keyboard navigation, lazy loading,
 * icons, badges, and customizable styling.
 *
 * @example
 * ```tsx
 * <Tabs
 *   tabs={tabItems}
 *   activeTabId="tab1"
 *   onTabChange={setActiveTab}
 *   keyboardNav={true}
 * />
 * ```
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      activeTabId,
      onTabChange,
      density = 'normal',
      variant = 'default',
      className = '',
      style,
      showIcons = true,
      showBadges = true,
      keyboardNav = true,
      ariaLabel,
      orientation = 'horizontal',
      scrollable = true,
      closable = false,
      onTabClose,
      lazyLoad = false,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [activeId, setActiveId] = useState<string>(activeTabId || tabs[0]?.id || '');
    const [focusedTabId, setFocusedTabId] = useState<string>();
    const [loadedContent, setLoadedContent] = useState<Map<string, ReactNode>>(new Map());
    const [loading, setLoading] = useState<Set<string>>(new Set());
    const tabsRef = useRef<HTMLDivElement>(null);
    const tabListRef = useRef<HTMLDivElement>(null);

    // Update active tab when prop changes
    useEffect(() => {
      if (activeTabId && activeTabId !== activeId) {
        setActiveId(activeTabId);
      }
    }, [activeTabId]);

    // Load tab content on demand
    const loadTabContent = useCallback(
      async (tabId: string) => {
        const tab = tabs.find((t) => t.id === tabId);
        if (!tab || !tab.lazyContent) return;

        if (loadedContent.has(tabId)) return;

        setLoading((prev) => new Set([...prev, tabId]));
        try {
          const content = await tab.lazyContent();
          setLoadedContent((prev) => new Map([...prev, [tabId, content]]));
        } finally {
          setLoading((prev) => {
            const next = new Set(prev);
            next.delete(tabId);
            return next;
          });
        }
      },
      [tabs, loadedContent]
    );

    // Handle tab change
    const handleTabChange = useCallback(
      (tabId: string) => {
        const tab = tabs.find((t) => t.id === tabId);
        if (tab?.disabled) return;

        setActiveId(tabId);
        onTabChange?.(tabId);

        // Load content if lazy loading is enabled
        if (lazyLoad && tab?.lazyContent) {
          loadTabContent(tabId);
        }
      },
      [tabs, lazyLoad, loadTabContent, onTabChange]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => {
        if (!keyboardNav) return;

        const enabledTabs = tabs.filter((t) => !t.disabled);
        const currentIdx = enabledTabs.findIndex((t) => t.id === focusedTabId);

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            if (currentIdx < enabledTabs.length - 1) {
              const nextTab = enabledTabs[currentIdx + 1];
              setFocusedTabId(nextTab.id);
              handleTabChange(nextTab.id);
            }
            break;

          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            if (currentIdx > 0) {
              const prevTab = enabledTabs[currentIdx - 1];
              setFocusedTabId(prevTab.id);
              handleTabChange(prevTab.id);
            }
            break;

          case 'Home':
            e.preventDefault();
            if (enabledTabs.length > 0) {
              const firstTab = enabledTabs[0];
              setFocusedTabId(firstTab.id);
              handleTabChange(firstTab.id);
            }
            break;

          case 'End':
            e.preventDefault();
            if (enabledTabs.length > 0) {
              const lastTab = enabledTabs[enabledTabs.length - 1];
              setFocusedTabId(lastTab.id);
              handleTabChange(lastTab.id);
            }
            break;
        }
      },
      [focusedTabId, tabs, keyboardNav, handleTabChange]
    );

    const activeTab = tabs.find((t) => t.id === activeId);

    return (
      <div
        ref={ref || tabsRef}
        className={`nav-tabs nav-tabs--${orientation} nav-tabs--${density} nav-tabs--${variant} ${scrollable ? 'nav-tabs--scrollable' : ''} nav-component ${className}`}
        style={style}
      >
        {/* Tab list */}
        <div
          ref={tabListRef}
          className="nav-tabs__list"
          role="tablist"
          aria-label={ariaLabel || 'Tabs'}
          onKeyDown={handleKeyDown}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tabs__tab ${tab.id === activeId ? 'nav-tabs__tab--active' : ''} ${focusedTabId === tab.id ? 'nav-tabs__tab--focused' : ''} ${tab.disabled ? 'nav-tabs__tab--disabled' : ''} ${tab.className || ''}`}
              role="tab"
              aria-selected={tab.id === activeId}
              aria-disabled={tab.disabled}
              aria-controls={`${tab.id}-panel`}
              disabled={tab.disabled}
              onClick={() => {
                setFocusedTabId(tab.id);
                handleTabChange(tab.id);
              }}
              onFocus={() => setFocusedTabId(tab.id)}
              onKeyDown={handleKeyDown}
            >
              {showIcons && tab.icon && <span className="nav-tabs__tab-icon">{tab.icon}</span>}
              <span className="nav-tabs__tab-label">{tab.label}</span>
              {showBadges && tab.badge && (
                <span className="nav-tabs__tab-badge">{tab.badge}</span>
              )}
              {closable && (
                <button
                  className="nav-tabs__tab-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose?.(tab.id);
                  }}
                  aria-label={`Close ${tab.label}`}
                  tabIndex={-1}
                >
                  ✕
                </button>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab && (
          <div
            className="nav-tabs__content"
            role="tabpanel"
            id={`${activeTab.id}-panel`}
            aria-labelledby={activeTab.id}
          >
            {lazyLoad && activeTab.lazyContent ? (
              loading.has(activeTab.id) ? (
                <div className="nav-tabs__loading">{t('general.loading')}</div>
              ) : (
                loadedContent.get(activeTab.id) || activeTab.content || null
              )
            ) : (
              activeTab.content
            )}
          </div>
        )}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export default Tabs;
