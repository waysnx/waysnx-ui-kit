/**
 * @file components/RecentItems/RecentItems.tsx
 * RecentItems component for accessing recently viewed/accessed items
 */

import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from '@waysnx/ui-i18n';
import type { RecentItem } from '../../types';
import './recent-items.css';

/**
 * RecentItems component props
 */
export interface RecentItemsProps {
  /**
   * Array of recent items
   */
  items: RecentItem[];

  /**
   * Callback when recent item is selected
   */
  onItemSelect?: (item: RecentItem) => void;

  /**
   * Callback to clear history
   */
  onClear?: () => void;

  /**
   * Maximum number of items to display
   */
  maxItems?: number;

  /**
   * Show clear button
   */
  showClearButton?: boolean;

  /**
   * Show timestamps
   */
  showTimestamps?: boolean;

  /**
   * Show item types/categories
   */
  showTypes?: boolean;

  /**
   * Group items by type
   */
  groupByType?: boolean;

  /**
   * Display variant
   */
  variant?: 'dropdown' | 'list' | 'compact';

  /**
   * Size of component
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Custom styles
   */
  style?: React.CSSProperties;

  /**
   * aria-label for accessibility
   */
  ariaLabel?: string;

  /**
   * Test ID
   */
  testId?: string;
}

/**
 * Helper to format time
 */
const formatTime = (date?: Date): string => {
  if (!date) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
};

/**
 * RecentItems Component
 *
 * Displays recently accessed items with history management and
 * flexible display options.
 *
 * @example
 * ```tsx
 * const recents = [
 *   { id: '1', label: 'Report Q3', href: '/reports/q3', icon: '📋' },
 *   { id: '2', label: 'Dashboard', href: '/dashboard', icon: '📊' },
 * ];
 *
 * <RecentItems items={recents} onItemSelect={handleSelect} />
 * ```
 */
export const RecentItems = forwardRef<HTMLDivElement, RecentItemsProps>(
  (
    {
      items,
      onItemSelect,
      onClear,
      maxItems = 10,
      showClearButton = true,
      showTimestamps = true,
      showTypes = true,
      groupByType = false,
      variant = 'dropdown',
      size = 'md',
      className = '',
      style,
      ariaLabel = 'Recent items',
      testId,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const handleItemSelect = useCallback(
      (item: RecentItem) => {
        onItemSelect?.(item);
        if (variant === 'dropdown') {
          setIsOpen(false);
        }
      },
      [onItemSelect, variant]
    );

    const handleClear = useCallback(() => {
      onClear?.();
      setIsOpen(false);
    }, [onClear]);

    const displayItems = items.slice(0, maxItems);

    const groupedByType = groupByType
      ? displayItems.reduce(
          (acc, item) => {
            const type = item.type || 'Other';
            if (!acc[type]) acc[type] = [];
            acc[type].push(item);
            return acc;
          },
          {} as Record<string, RecentItem[]>
        )
      : { 'All': displayItems };

    const variantClass = `wx-recent-items--${variant}`;
    const sizeClass = `wx-recent-items--${size}`;
    const combinedClassName = `wx-recent-items ${variantClass} ${sizeClass} ${className}`.trim();

    const renderItem = (item: RecentItem) => (
      <button
        key={item.id}
        className="wx-recent-items__item"
        onClick={() => handleItemSelect(item)}
        data-testid={`recent-item-${item.id}`}
        title={item.label}
      >
        <div className="wx-recent-items__item-main">
          {item.icon && (
            <span className="wx-recent-items__item-icon">{item.icon}</span>
          )}
          <div className="wx-recent-items__item-text">
            <div className="wx-recent-items__item-label">{item.label}</div>
            {showTypes && item.type && (
              <div className="wx-recent-items__item-type">{item.type}</div>
            )}
          </div>
        </div>
        {showTimestamps && item.timestamp && (
          <div className="wx-recent-items__item-time">
            {formatTime(item.timestamp)}
          </div>
        )}
      </button>
    );

    // Dropdown variant
    if (variant === 'dropdown') {
      return (
        <div
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className={combinedClassName}
          style={style}
          data-testid={testId}
        >
          <button
            ref={triggerRef}
            className="wx-recent-items__trigger"
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-label={ariaLabel}
          >
            <span className="wx-recent-items__trigger-icon">🕐</span>
          </button>

          {isOpen && (
            <div className="wx-recent-items__menu" role="menu">
              {displayItems.length === 0 ? (
                <div className="wx-recent-items__empty">
                  No recently accessed items
                </div>
              ) : groupByType ? (
                <div className="wx-recent-items__grouped">
                  {Object.entries(groupedByType).map(([type, typeItems]) => (
                    <div key={type} className="wx-recent-items__type-group">
                      <div className="wx-recent-items__type-label">{type}</div>
                      <div className="wx-recent-items__type-items">
                        {typeItems.map((item) => renderItem(item))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="wx-recent-items__list">
                  {displayItems.map((item) => renderItem(item))}
                </div>
              )}

              {showClearButton && displayItems.length > 0 && (
                <button
                  className="wx-recent-items__clear"
                  onClick={handleClear}
                  data-testid="recent-items-clear"
                >
                  Clear History
                </button>
              )}
            </div>
          )}
        </div>
      );
    }

    // List variant
    if (variant === 'list') {
      return (
        <div
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className={combinedClassName}
          style={style}
          data-testid={testId}
          role="region"
          aria-label={ariaLabel}
        >
          <div className="wx-recent-items__header">
            <h3 className="wx-recent-items__title">{t('navigation.recentItems')}</h3>
            {showClearButton && displayItems.length > 0 && (
              <button
                className="wx-recent-items__clear-text"
                onClick={handleClear}
                data-testid="recent-items-clear-text"
              >
                Clear
              </button>
            )}
          </div>

          {displayItems.length === 0 ? (
            <div className="wx-recent-items__empty">
              No recently accessed items
            </div>
          ) : groupByType ? (
            <div className="wx-recent-items__grouped">
              {Object.entries(groupedByType).map(([type, typeItems]) => (
                <div key={type} className="wx-recent-items__type-group">
                  <div className="wx-recent-items__type-label">{type}</div>
                  <div className="wx-recent-items__type-items">
                    {typeItems.map((item) => renderItem(item))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="wx-recent-items__list">
              {displayItems.map((item) => renderItem(item))}
            </div>
          )}
        </div>
      );
    }

    // Compact variant
    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={combinedClassName}
        style={style}
        data-testid={testId}
        role="region"
        aria-label={ariaLabel}
      >
        {displayItems.length === 0 ? (
          <div className="wx-recent-items__empty-compact">
            No recents
          </div>
        ) : (
          <div className="wx-recent-items__compact-list">
            {displayItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                className="wx-recent-items__compact-item"
                onClick={() => handleItemSelect(item)}
                title={item.label}
                data-testid={`recent-compact-${item.id}`}
              >
                {item.icon ? (
                  <span>{item.icon}</span>
                ) : (
                  <span className="wx-recent-items__compact-initial">
                    {item.label.charAt(0).toUpperCase()}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

RecentItems.displayName = 'RecentItems';
