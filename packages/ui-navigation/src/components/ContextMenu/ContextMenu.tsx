/**
 * @file components/ContextMenu/ContextMenu.tsx
 * ContextMenu component for right-click context menus
 */

import React, { useState, useCallback, useRef, useEffect, forwardRef } from 'react';
import type { NavigationItem } from '../../types';
import { MenuItem } from '../Menu/MenuItem';
import type { SecurityContext } from '../../types';
import { canAccessItem, filterMenuByPermissions } from '../../utils';
import './context-menu.css';

/**
 * Position of the context menu
 */
export type ContextMenuPosition = {
  x: number;
  y: number;
};

/**
 * ContextMenu component props
 */
export interface ContextMenuProps {
  /**
   * Menu items to display
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
   * Maximum depth for nested items
   */
  maxDepth?: number;

  /**
   * Keyboard navigation enabled
   */
  keyboardNav?: boolean;

  /**
   * Accessible label for menu
   */
  ariaLabel?: string;

  /**
   * Callback when context menu is opened
   */
  onOpen?: (position: ContextMenuPosition) => void;

  /**
   * Callback when context menu is closed
   */
  onClose?: () => void;

  /**
   * Whether menu is visible
   */
  isOpen?: boolean;

  /**
   * Menu position
   */
  position?: ContextMenuPosition;

  /**
   * Offset from mouse position
   */
  offset?: { x: number; y: number };

  /**
   * Whether to close menu on item click
   */
  closeOnItemClick?: boolean;

  /**
   * Viewport padding to prevent menu overflow
   */
  viewportPadding?: number;
}

/**
 * ContextMenu Component
 *
 * Right-click context menu with support for nested items, keyboard navigation,
 * and intelligent positioning to prevent viewport overflow.
 *
 * @example
 * ```tsx
 * const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(null);
 *
 * return (
 *   <>
 *     <div onContextMenu={(e) => {
 *       e.preventDefault();
 *       setContextMenu({ x: e.clientX, y: e.clientY });
 *     }}>
 *       Right-click here
 *     </div>
 *     {contextMenu && (
 *       <ContextMenu
 *         items={menuItems}
 *         position={contextMenu}
 *         isOpen={true}
 *         onItemClick={handleMenuClick}
 *         onClose={() => setContextMenu(null)}
 *       />
 *     )}
 *   </>
 * );
 * ```
 */
export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
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
      maxDepth = 5,
      keyboardNav = true,
      ariaLabel,
      // onOpen is kept for API completeness but internally we use onClose to manage state
      onClose,
      isOpen = false,
      position,
      offset = { x: 0, y: 0 },
      closeOnItemClick = true,
      viewportPadding = 8,
    },
    ref
  ) => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [focusedItemId, setFocusedItemId] = useState<string>();
    const [adjustedPosition, setAdjustedPosition] = useState<ContextMenuPosition | undefined>(
      position
    );
    const menuRef = useRef<HTMLDivElement>(null);

    // Filter items by permissions
    const visibleItems = security
      ? filterMenuByPermissions(items, security)
      : items;

    // Adjust position to prevent viewport overflow
    useEffect(() => {
      if (!position || !menuRef.current || !isOpen) return;

      const rect = menuRef.current.getBoundingClientRect();
      const newPosition = { ...position };

      // Adjust horizontal position
      if (newPosition.x + offset.x + rect.width + viewportPadding > window.innerWidth) {
        newPosition.x = window.innerWidth - rect.width - viewportPadding;
      }

      // Adjust vertical position
      if (newPosition.y + offset.y + rect.height + viewportPadding > window.innerHeight) {
        newPosition.y = window.innerHeight - rect.height - viewportPadding;
      }

      // Ensure minimum position
      newPosition.x = Math.max(viewportPadding, newPosition.x + offset.x);
      newPosition.y = Math.max(viewportPadding, newPosition.y + offset.y);

      setAdjustedPosition(newPosition);
    }, [position, offset, isOpen, viewportPadding]);

    // Handle item click
    const handleItemClick = useCallback(
      (item: NavigationItem) => {
        onItemClick?.(item);
        if (closeOnItemClick) {
          onClose?.();
        }
      },
      [onItemClick, closeOnItemClick, onClose]
    );

    // Handle item expansion
    const handleToggleExpand = useCallback((itemId: string) => {
      setExpandedItems((prev) => {
        const next = new Set(prev);
        if (next.has(itemId)) {
          next.delete(itemId);
        } else {
          next.add(itemId);
        }
        return next;
      });
    }, []);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!keyboardNav) return;

        switch (e.key) {
          case 'Escape':
            e.preventDefault();
            onClose?.();
            break;

          case 'ArrowDown':
            e.preventDefault();
            // Move focus to next item
            setFocusedItemId((prev) => {
              const items = visibleItems.flatMap((item) => [
                item,
                ...(item.children || []),
              ]);
              const current = prev
                ? items.findIndex((item) => item.id === prev)
                : -1;
              return items[Math.min(current + 1, items.length - 1)]?.id;
            });
            break;

          case 'ArrowUp':
            e.preventDefault();
            // Move focus to previous item
            setFocusedItemId((prev) => {
              const items = visibleItems.flatMap((item) => [
                item,
                ...(item.children || []),
              ]);
              const current = prev
                ? items.findIndex((item) => item.id === prev)
                : 0;
              return items[Math.max(current - 1, 0)]?.id;
            });
            break;

          case 'ArrowRight':
            if (focusedItemId) {
              const item = visibleItems.find((i) => i.id === focusedItemId);
              if (item?.children?.length) {
                handleToggleExpand(focusedItemId);
              }
            }
            break;

          case 'ArrowLeft':
            if (focusedItemId) {
              setExpandedItems((prev) => {
                const next = new Set(prev);
                next.delete(focusedItemId);
                return next;
              });
            }
            break;

          case 'Enter':
          case ' ':
            e.preventDefault();
            if (focusedItemId) {
              const item = visibleItems.find((i) => i.id === focusedItemId);
              if (item) {
                handleItemClick(item);
                if (item.children?.length) {
                  handleToggleExpand(focusedItemId);
                }
              }
            }
            break;
        }
      },
      [focusedItemId, visibleItems, keyboardNav, handleItemClick, handleToggleExpand, onClose]
    );

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          onClose?.();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, onClose]);

    if (!isOpen || !adjustedPosition) {
      return null;
    }

    return (
      <div
        ref={ref || menuRef}
        className={`nav-context-menu nav-context-menu--${density} nav-context-menu--${variant} nav-component ${className}`}
        role="menu"
        aria-label={ariaLabel || 'Context menu'}
        onKeyDown={handleKeyDown}
        style={{
          ...style,
          position: 'fixed',
          left: `${adjustedPosition.x}px`,
          top: `${adjustedPosition.y}px`,
          zIndex: 1000,
        }}
      >
        <ul className="nav-context-menu__list" role="presentation">
          {visibleItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              isFocused={focusedItemId === item.id}
              isExpanded={expandedItems.has(item.id)}
              onItemClick={handleItemClick}
              onToggleExpand={handleToggleExpand}
              onFocus={setFocusedItemId}
              showIcons={showIcons}
              showBadges={showBadges}
              depth={0}
              maxDepth={maxDepth}
              security={security}
              canAccess={security ? (item: NavigationItem) => canAccessItem(item, security) : undefined}
            />
          ))}
        </ul>
      </div>
    );
  }
);

ContextMenu.displayName = 'ContextMenu';

export default ContextMenu;
