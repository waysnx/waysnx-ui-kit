/**
 * @file components/Breadcrumb/Breadcrumb.tsx
 * Breadcrumb navigation component
 */

import React, { forwardRef, useEffect, useRef } from 'react';
import type { BreadcrumbItem } from '../../types';
import './breadcrumb.css';

/**
 * Breadcrumb component props
 */
export interface BreadcrumbProps {
  /**
   * Breadcrumb items to display
   */
  items: BreadcrumbItem[];

  /**
   * Separator between items
   */
  separator?: React.ReactNode;

  /**
   * Callback when breadcrumb item is clicked
   */
  onItemClick?: (item: BreadcrumbItem) => void;

  /**
   * Whether to show the last item as active
   */
  showActive?: boolean;

  /**
   * Maximum items to show before truncation
   */
  maxItems?: number;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: React.CSSProperties;

  /**
   * Aria label for the breadcrumb nav
   */
  ariaLabel?: string;

  /**
   * Size of breadcrumb
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Breadcrumb Component
 *
 * Navigation component showing the current page's location in a hierarchy.
 * Supports clickable items, custom separators, and truncation.
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { id: 'home', label: 'Home', href: '/' },
 *     { id: 'products', label: 'Products', href: '/products' },
 *     { id: 'current', label: 'Current Page' }
 *   ]}
 *   separator=" / "
 *   onItemClick={handleClick}
 * />
 * ```
 */
export const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  (
    {
      items,
      separator = '/',
      onItemClick,
      showActive = true,
      maxItems,
      className = '',
      style,
      ariaLabel = 'Breadcrumb navigation',
      size = 'md',
    },
    ref
  ) => {
    const breadcrumbRef = useRef<HTMLDivElement>(null);

    // Combine refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(breadcrumbRef.current);
        } else {
          ref.current = breadcrumbRef.current;
        }
      }
    }, [ref]);

    // Handle item truncation
    let displayItems = items;
    let showEllipsis = false;

    if (maxItems && items.length > maxItems) {
      showEllipsis = true;
      // Always show first and last items, truncate middle
      const startItems = items.slice(0, 1);
      const endItems = items.slice(-(maxItems - 1));
      displayItems = [...startItems, ...endItems];
    }

    // Handle item click
    const handleClick = (item: BreadcrumbItem, e: React.MouseEvent) => {
      if (!item.onClick) {
        e.preventDefault();
      }
      onItemClick?.(item);
      item.onClick?.();
    };

    return (
      <nav
        ref={breadcrumbRef}
        className={`nav-breadcrumb nav-breadcrumb--${size} nav-component ${className}`}
        aria-label={ariaLabel}
        style={style}
      >
        <ol className="nav-breadcrumb__list" role="list">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const originalIndex = items.indexOf(item);
            const showEllipsisAfter =
              showEllipsis &&
              originalIndex === 0 &&
              index === 0 &&
              items.length > (maxItems || 0);

            return (
              <React.Fragment key={item.id || index}>
                {/* Ellipsis separator */}
                {showEllipsisAfter && (
                  <li
                    className="nav-breadcrumb__item nav-breadcrumb__item--ellipsis"
                    role="presentation"
                  >
                    <span className="nav-breadcrumb__ellipsis">...</span>
                  </li>
                )}

                {/* Item */}
                <li className="nav-breadcrumb__item" role="listitem">
                  {item.href && item.onClick ? (
                    <a
                      href={item.href}
                      className="nav-breadcrumb__link"
                      onClick={(e) => handleClick(item, e)}
                      aria-current={isLast && showActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  ) : item.href ? (
                    <a
                      href={item.href}
                      className="nav-breadcrumb__link"
                      aria-current={isLast && showActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span
                      className="nav-breadcrumb__text"
                      aria-current={isLast && showActive ? 'page' : undefined}
                    >
                      {item.label}
                    </span>
                  )}

                  {/* Separator */}
                  {!isLast && (
                    <span
                      className="nav-breadcrumb__separator"
                      aria-hidden="true"
                    >
                      {separator}
                    </span>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
