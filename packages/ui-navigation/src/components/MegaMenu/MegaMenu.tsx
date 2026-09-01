/**
 * @file components/MegaMenu/MegaMenu.tsx
 * MegaMenu component for multi-column dropdown navigation
 */

import React, { useState, useCallback, useRef, useEffect, forwardRef } from 'react';
import type { NavigationItem } from '../../types';
import type { SecurityContext } from '../../types';
import { filterMenuByPermissions } from '../../utils';
import './mega-menu.css';

/**
 * Section configuration for mega menu columns
 */
export interface MegaMenuSection {
  /**
   * Section title/label
   */
  title?: string;

  /**
   * Items in this section
   */
  items: NavigationItem[];

  /**
   * Column width (1-4)
   */
  columnWidth?: 1 | 2 | 3 | 4;

  /**
   * Whether section has a featured/highlighted item
   */
  featured?: boolean;
}

/**
 * MegaMenu component props
 */
export interface MegaMenuProps {
  /**
   * Root menu items (triggers for mega menu dropdowns)
   */
  items: NavigationItem[];

  /**
   * Callback when item is clicked
   */
  onItemClick?: (item: NavigationItem) => void;

  /**
   * Security context for permission-based filtering
   */
  security?: SecurityContext;

  /**
   * Component density
   */
  density?: 'compact' | 'normal' | 'spacious';

  /**
   * Theme variant
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
   * Whether to show icons
   */
  showIcons?: boolean;

  /**
   * Whether to show badges
   */
  showBadges?: boolean;

  /**
   * Keyboard navigation enabled
   */
  keyboardNav?: boolean;

  /**
   * Accessible label for menu
   */
  ariaLabel?: string;

  /**
   * Close dropdown when item is clicked
   */
  closeOnItemClick?: boolean;

  /**
   * Number of columns for mega menu grid
   */
  gridColumns?: 2 | 3 | 4;

  /**
   * Gap between grid items
   */
  gridGap?: 'sm' | 'md' | 'lg';

  /**
   * Enable hover to open dropdowns
   */
  hoverToOpen?: boolean;

  /**
   * Delay in ms before opening dropdown on hover
   */
  hoverDelay?: number;

  /**
   * Callback when dropdown is opened
   */
  onDropdownOpen?: (itemId: string) => void;

  /**
   * Callback when dropdown is closed
   */
  onDropdownClose?: (itemId: string) => void;

  /**
   * Allow multiple dropdowns open simultaneously
   */
  allowMultipleOpen?: boolean;
}

/**
 * MegaMenu Component
 *
 * Horizontal dropdown menu with support for multi-column layouts,
 * grid display, and mega menu dropdown patterns.
 *
 * @example
 * ```tsx
 * <MegaMenu
 *   items={menuItems}
 *   onItemClick={handleClick}
 *   gridColumns={3}
 *   hoverToOpen={true}
 * />
 * ```
 */
export const MegaMenu = forwardRef<HTMLDivElement, MegaMenuProps>(
  (
    {
      items,
      onItemClick,
      security,
      density = 'normal',
      variant = 'default',
      className = '',
      style,
      showIcons = true,
      showBadges = true,
      keyboardNav = true,
      ariaLabel,
      closeOnItemClick = true,
      gridColumns = 3,
      gridGap = 'md',
      hoverToOpen = true,
      hoverDelay = 200,
      onDropdownOpen,
      onDropdownClose,
      allowMultipleOpen = false,
    },
    ref
  ) => {
    // const emptySet: string[] = [];
    const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
    const [focusedItemId, setFocusedItemId] = useState<string>();
    const [focusedSubItemId, setFocusedSubItemId] = useState<string>();
    const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Filter items by permissions
    const visibleItems = security ? filterMenuByPermissions(items, security) : items;

    // Handle dropdown open
    const handleOpenDropdown = useCallback(
      (itemId: string) => {
        setOpenDropdowns((prev) => {
          if (!allowMultipleOpen) {
            return [itemId];
          }
          if (prev.includes(itemId)) return prev;
          return [...prev, itemId];
        });
        onDropdownOpen?.(itemId);
      },
      [allowMultipleOpen, onDropdownOpen]
    );

    // Handle dropdown close
    const handleCloseDropdown = useCallback(
      (itemId: string) => {
        setOpenDropdowns((prev) => prev.filter((id) => id !== itemId));
        onDropdownClose?.(itemId);
      },
      [onDropdownClose]
    );

    // Close all dropdowns
    const handleCloseAll = useCallback(() => {
      setOpenDropdowns([]);
      setFocusedSubItemId(undefined);
    }, []);

    // Handle item click
    const handleItemClick = useCallback(
      (item: NavigationItem) => {
        onItemClick?.(item);
        if (closeOnItemClick && !item.children?.length) {
          handleCloseAll();
        }
      },
      [onItemClick, closeOnItemClick, handleCloseAll]
    );

    // Handle menu item hover (for dropdown trigger)
    const handleItemMouseEnter = useCallback(
      (itemId: string) => {
        if (!hoverToOpen) return;

        if (hoverTimerRef.current) {
          clearTimeout(hoverTimerRef.current);
        }

        hoverTimerRef.current = setTimeout(() => {
          handleOpenDropdown(itemId);
        }, hoverDelay);
      },
      [hoverToOpen, hoverDelay, handleOpenDropdown]
    );

    const handleItemMouseLeave = useCallback(() => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!keyboardNav) return;

        switch (e.key) {
          case 'ArrowRight':
            e.preventDefault();
            const nextIdx = visibleItems.findIndex((item) => item.id === focusedItemId);
            if (nextIdx < visibleItems.length - 1) {
              const nextItem = visibleItems[nextIdx + 1];
              setFocusedItemId(nextItem.id);
              if (nextItem.children?.length) {
                handleOpenDropdown(nextItem.id);
              }
            }
            break;

          case 'ArrowLeft':
            e.preventDefault();
            const prevIdx = visibleItems.findIndex((item) => item.id === focusedItemId);
            if (prevIdx > 0) {
              const prevItem = visibleItems[prevIdx - 1];
              setFocusedItemId(prevItem.id);
              if (prevItem.children?.length) {
                handleOpenDropdown(prevItem.id);
              }
            }
            break;

          case 'ArrowDown':
            e.preventDefault();
            if (focusedItemId) {
              const item = visibleItems.find((i) => i.id === focusedItemId);
              if (item?.children?.length && openDropdowns.includes(focusedItemId)) {
                // Move focus to first child
                const firstChild = item.children[0];
                setFocusedSubItemId(firstChild.id);
              }
            }
            break;

          case 'ArrowUp':
            e.preventDefault();
            if (focusedSubItemId) {
              setFocusedSubItemId(undefined);
            }
            break;

          case 'Enter':
          case ' ':
            e.preventDefault();
            if (focusedSubItemId) {
              const item = visibleItems
                .flatMap((i) => i.children || [])
                .find((i) => i.id === focusedSubItemId);
              if (item) {
                handleItemClick(item);
              }
            } else if (focusedItemId) {
              const item = visibleItems.find((i) => i.id === focusedItemId);
              if (item) {
                if (item.children?.length) {
                  if (openDropdowns.includes(focusedItemId)) {
                    handleCloseDropdown(focusedItemId);
                  } else {
                    handleOpenDropdown(focusedItemId);
                  }
                } else {
                  handleItemClick(item);
                }
              }
            }
            break;

          case 'Escape':
            e.preventDefault();
            handleCloseAll();
            break;
        }
      },
      [
        focusedItemId,
        focusedSubItemId,
        visibleItems,
        keyboardNav,
        openDropdowns,
        handleItemClick,
        handleOpenDropdown,
        handleCloseDropdown,
        handleCloseAll,
      ]
    );

    // Close dropdown on outside click
    useEffect(() => {
      if (openDropdowns.length === 0) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          handleCloseAll();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [openDropdowns, handleCloseAll]);

    // Cleanup timer on unmount
    useEffect(() => {
      return () => {
        if (hoverTimerRef.current) {
          clearTimeout(hoverTimerRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={ref || menuRef}
        className={`nav-mega-menu nav-mega-menu--${density} nav-mega-menu--${variant} nav-component ${className}`}
        role="menubar"
        aria-label={ariaLabel || 'Main menu'}
        onKeyDown={handleKeyDown}
        style={style}
      >
        <ul className="nav-mega-menu__list">
          {visibleItems.map((item) => (
            <li key={item.id} className="nav-mega-menu__item">
              <button
                className={`nav-mega-menu__trigger ${
                  focusedItemId === item.id ? 'nav-mega-menu__trigger--focused' : ''
                } ${openDropdowns.includes(item.id) ? 'nav-mega-menu__trigger--open' : ''}`}
                onClick={() => {
                  if (item.children?.length) {
                    if (openDropdowns.includes(item.id)) {
                      handleCloseDropdown(item.id);
                    } else {
                      handleOpenDropdown(item.id);
                    }
                  } else {
                    handleItemClick(item);
                  }
                }}
                onMouseEnter={() => {
                  setFocusedItemId(item.id);
                  handleItemMouseEnter(item.id);
                }}
                onMouseLeave={handleItemMouseLeave}
                onFocus={() => setFocusedItemId(item.id)}
                aria-expanded={openDropdowns.includes(item.id) ? 'true' : 'false'}
                aria-haspopup={item.children?.length ? 'true' : undefined}
                disabled={item.disabled}
              >
                {showIcons && item.icon && (
                  <span className="nav-mega-menu__trigger-icon">{item.icon}</span>
                )}
                <span className="nav-mega-menu__trigger-label">{item.label}</span>
                {item.children?.length && (
                  <span className="nav-mega-menu__trigger-chevron">▼</span>
                )}
              </button>

              {/* Dropdown menu */}
              {item.children?.length && openDropdowns.includes(item.id) && (
                <div className="nav-mega-menu__dropdown" role="menu">
                  <div className={`nav-mega-menu__grid nav-mega-menu__grid--cols-${gridColumns} nav-mega-menu__grid--gap-${gridGap}`}>
                    {item.children.map((child) => (
                      <div key={child.id} className="nav-mega-menu__section">
                        {child.label && (
                          <div className="nav-mega-menu__section-title">{child.label}</div>
                        )}
                        {child.children?.length && (
                          <ul className="nav-mega-menu__section-list">
                            {child.children.map((subItem) => (
                              <li key={subItem.id} className="nav-mega-menu__section-item">
                                <button
                                  className={`nav-mega-menu__link ${
                                    focusedSubItemId === subItem.id
                                      ? 'nav-mega-menu__link--focused'
                                      : ''
                                  }`}
                                  onClick={() => handleItemClick(subItem)}
                                  onFocus={() => setFocusedSubItemId(subItem.id)}
                                  onMouseEnter={() => setFocusedSubItemId(subItem.id)}
                                  onMouseLeave={() => setFocusedSubItemId(undefined)}
                                  disabled={subItem.disabled}
                                  aria-disabled={subItem.disabled}
                                >
                                  {showIcons && subItem.icon && (
                                    <span className="nav-mega-menu__link-icon">
                                      {subItem.icon}
                                    </span>
                                  )}
                                  <span className="nav-mega-menu__link-text">
                                    {subItem.label}
                                  </span>
                                  {showBadges && subItem.badge && (
                                    <span className="nav-mega-menu__link-badge">
                                      {subItem.badge}
                                    </span>
                                  )}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

MegaMenu.displayName = 'MegaMenu';

export default MegaMenu;
