/**
 * @file components/TreeMenu/TreeMenu.tsx
 * TreeMenu component for hierarchical tree navigation
 */

import React, { useState, useCallback, useRef, forwardRef } from 'react';
import type { NavigationItem } from '../../types';
import type { SecurityContext } from '../../types';
import { filterMenuByPermissions } from '../../utils';
import './tree-menu.css';

/**
 * TreeMenu component props
 */
export interface TreeMenuProps {
  /**
   * Root menu items for tree
   */
  items: NavigationItem[];

  /**
   * Callback when item is clicked
   */
  onItemClick?: (item: NavigationItem) => void;

  /**
   * Callback when item is selected
   */
  onItemSelect?: (item: NavigationItem | undefined) => void;

  /**
   * Currently selected item
   */
  selectedItem?: NavigationItem;

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
   * Accessible label for tree
   */
  ariaLabel?: string;

  /**
   * Allow multiple item selection (checkbox mode)
   */
  multiSelect?: boolean;

  /**
   * Selected item IDs (for multi-select mode)
   */
  selectedIds?: Set<string>;

  /**
   * Callback when selection changes (multi-select mode)
   */
  onSelectionChange?: (selectedIds: Set<string>) => void;

  /**
   * Expand all items initially
   */
  expandAll?: boolean;

  /**
   * Indent size in pixels
   */
  indentSize?: number;

  /**
   * Show expand/collapse icons
   */
  showExpandIcons?: boolean;
}

/**
 * TreeMenu Component
 *
 * Hierarchical tree display with expandable nodes, recursive rendering,
 * single/multi-select, and full keyboard navigation support.
 *
 * @example
 * ```tsx
 * <TreeMenu
 *   items={treeItems}
 *   selectedItem={current}
 *   onItemSelect={setCurrent}
 *   keyboardNav={true}
 * />
 * ```
 */
export const TreeMenu = forwardRef<HTMLDivElement, TreeMenuProps>(
  (
    {
      items,
      onItemClick,
      onItemSelect,
      selectedItem,
      security,
      density = 'normal',
      variant = 'default',
      className = '',
      style,
      showIcons = true,
      showBadges = true,
      maxDepth = 10,
      keyboardNav = true,
      ariaLabel,
      multiSelect = false,
      selectedIds = new Set(),
      onSelectionChange,
      expandAll = false,
      indentSize = 20,
      showExpandIcons = true,
    },
    ref
  ) => {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
      if (expandAll) {
        const allIds = new Set<string>();
        const collect = (nodes: NavigationItem[]) => {
          nodes.forEach((node) => {
            if (node.children?.length) {
              allIds.add(node.id);
              collect(node.children);
            }
          });
        };
        collect(items);
        return allIds;
      }
      return new Set();
    });

    const [focusedItemId, setFocusedItemId] = useState<string>();
    const [localSelectedIds, setLocalSelectedIds] = useState<Set<string>>(selectedIds);
    const treeRef = useRef<HTMLDivElement>(null);

    // Filter items by permissions
    const visibleItems = security ? filterMenuByPermissions(items, security) : items;

    // Handle item expand/collapse
    const handleToggleExpand = useCallback((itemId: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(itemId)) {
          next.delete(itemId);
        } else {
          next.add(itemId);
        }
        return next;
      });
    }, []);

    // Handle item click
    const handleItemClick = useCallback(
      (item: NavigationItem) => {
        onItemClick?.(item);
        if (!multiSelect) {
          onItemSelect?.(item);
        }
      },
      [onItemClick, onItemSelect, multiSelect]
    );

    // Handle item selection (single or multi)
    const handleItemSelect = useCallback(
      (item: NavigationItem, selected: boolean) => {
        if (multiSelect) {
          const next = new Set(localSelectedIds);
          if (selected) {
            next.add(item.id);
          } else {
            next.delete(item.id);
          }
          setLocalSelectedIds(next);
          onSelectionChange?.(next);
        } else {
          onItemSelect?.(selected ? item : undefined);
        }
      },
      [multiSelect, localSelectedIds, onItemSelect, onSelectionChange]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!keyboardNav) return;

        const flatItems: NavigationItem[] = [];
        const flatten = (nodes: NavigationItem[]) => {
          nodes.forEach((node) => {
            flatItems.push(node);
            if (expandedIds.has(node.id) && node.children?.length) {
              flatten(node.children);
            }
          });
        };
        flatten(visibleItems);

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            const currentIdx = flatItems.findIndex((item) => item.id === focusedItemId);
            const nextIdx = Math.min(currentIdx + 1, flatItems.length - 1);
            setFocusedItemId(flatItems[nextIdx]?.id);
            break;

          case 'ArrowUp':
            e.preventDefault();
            const currIdx = flatItems.findIndex((item) => item.id === focusedItemId);
            const prevIdx = Math.max(currIdx - 1, 0);
            setFocusedItemId(flatItems[prevIdx]?.id);
            break;

          case 'ArrowRight':
            e.preventDefault();
            if (focusedItemId) {
              const item = flatItems.find((i) => i.id === focusedItemId);
              if (item?.children?.length) {
                if (!expandedIds.has(focusedItemId)) {
                  handleToggleExpand(focusedItemId);
                }
              }
            }
            break;

          case 'ArrowLeft':
            e.preventDefault();
            if (focusedItemId) {
              const item = flatItems.find((i) => i.id === focusedItemId);
              if (item?.children?.length && expandedIds.has(focusedItemId)) {
                handleToggleExpand(focusedItemId);
              }
            }
            break;

          case 'Enter':
          case ' ':
            e.preventDefault();
            if (focusedItemId) {
              const item = flatItems.find((i) => i.id === focusedItemId);
              if (item) {
                handleItemClick(item);
              }
            }
            break;

          case 'Home':
            e.preventDefault();
            setFocusedItemId(flatItems[0]?.id);
            break;

          case 'End':
            e.preventDefault();
            setFocusedItemId(flatItems[flatItems.length - 1]?.id);
            break;
        }
      },
      [focusedItemId, visibleItems, expandedIds, keyboardNav, handleToggleExpand, handleItemClick]
    );

    return (
      <div
        ref={ref || treeRef}
        className={`nav-tree-menu nav-tree-menu--${density} nav-tree-menu--${variant} nav-component ${className}`}
        role="tree"
        aria-label={ariaLabel || 'Navigation tree'}
        onKeyDown={handleKeyDown}
        style={style}
      >
        <TreeNode
          items={visibleItems}
          depth={0}
          maxDepth={maxDepth}
          expandedIds={expandedIds}
          focusedItemId={focusedItemId}
          selectedItem={selectedItem}
          multiSelect={multiSelect}
          selectedIds={localSelectedIds}
          showIcons={showIcons}
          showBadges={showBadges}
          showExpandIcons={showExpandIcons}
          indentSize={indentSize}
          security={security}
          onToggleExpand={handleToggleExpand}
          onItemClick={handleItemClick}
          onItemSelect={handleItemSelect}
          onFocus={setFocusedItemId}
        />
      </div>
    );
  }
);

/**
 * TreeNode component for recursive rendering
 */
interface TreeNodeProps {
  items: NavigationItem[];
  depth: number;
  maxDepth: number;
  expandedIds: Set<string>;
  focusedItemId?: string;
  selectedItem?: NavigationItem;
  multiSelect: boolean;
  selectedIds: Set<string>;
  showIcons: boolean;
  showBadges: boolean;
  showExpandIcons: boolean;
  indentSize: number;
  security?: SecurityContext;
  onToggleExpand: (id: string) => void;
  onItemClick: (item: NavigationItem) => void;
  onItemSelect: (item: NavigationItem, selected: boolean) => void;
  onFocus: (id: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  items,
  depth,
  maxDepth,
  expandedIds,
  focusedItemId,
  selectedItem,
  multiSelect,
  selectedIds,
  showIcons,
  showBadges,
  showExpandIcons,
  indentSize,
  security,
  onToggleExpand,
  onItemClick,
  onItemSelect,
  onFocus,
}) => {
  const visibleItems = security ? filterMenuByPermissions(items, security) : items;

  if (depth > maxDepth) {
    return null;
  }

  return (
    <ul className="nav-tree-menu__list" role="group">
      {visibleItems.map((item) => {
        const isExpanded = expandedIds.has(item.id);
        const isFocused = focusedItemId === item.id;
        const isSelected = multiSelect ? selectedIds.has(item.id) : selectedItem?.id === item.id;
        const hasChildren = item.children?.length || false;

        return (
          <li
            key={item.id}
            className={`nav-tree-menu__item ${hasChildren ? 'nav-tree-menu__item--branch' : 'nav-tree-menu__item--leaf'}`}
            role="none"
            style={{ paddingLeft: `${depth * indentSize}px` }}
          >
            <div className={`nav-tree-menu__row ${isFocused ? 'nav-tree-menu__row--focused' : ''} ${isSelected ? 'nav-tree-menu__row--selected' : ''}`}>
              {/* Expand/collapse button */}
              {hasChildren && showExpandIcons && (
                <button
                  className={`nav-tree-menu__expand-btn ${isExpanded ? 'nav-tree-menu__expand-btn--expanded' : ''}`}
                  onClick={() => onToggleExpand(item.id)}
                  aria-expanded={isExpanded}
                  aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
                  tabIndex={-1}
                >
                  ▶
                </button>
              )}

              {/* Placeholder for items without children */}
              {!hasChildren && showExpandIcons && <span className="nav-tree-menu__expand-placeholder" />}

              {/* Checkbox for multi-select */}
              {multiSelect && (
                <input
                  type="checkbox"
                  className="nav-tree-menu__checkbox"
                  checked={isSelected}
                  onChange={(e) => onItemSelect(item, e.target.checked)}
                  aria-label={`Select ${item.label}`}
                  tabIndex={-1}
                />
              )}

              {/* Item content */}
              <button
                className={`nav-tree-menu__item-btn ${isFocused ? 'nav-tree-menu__item-btn--focused' : ''}`}
                onClick={() => {
                  onItemClick(item);
                  if (!multiSelect) {
                    onItemSelect(item, true);
                  }
                }}
                onFocus={() => onFocus(item.id)}
                aria-selected={isSelected}
                disabled={item.disabled}
                role="treeitem"
              >
                {showIcons && item.icon && (
                  <span className="nav-tree-menu__item-icon">{item.icon}</span>
                )}
                <span className="nav-tree-menu__item-label">{item.label}</span>
                {showBadges && item.badge && (
                  <span className="nav-tree-menu__item-badge">{item.badge}</span>
                )}
              </button>
            </div>

            {/* Nested children */}
            {hasChildren && isExpanded && (
              <TreeNode
                items={item.children!}
                depth={depth + 1}
                maxDepth={maxDepth}
                expandedIds={expandedIds}
                focusedItemId={focusedItemId}
                selectedItem={selectedItem}
                multiSelect={multiSelect}
                selectedIds={selectedIds}
                showIcons={showIcons}
                showBadges={showBadges}
                showExpandIcons={showExpandIcons}
                indentSize={indentSize}
                security={security}
                onToggleExpand={onToggleExpand}
                onItemClick={onItemClick}
                onItemSelect={onItemSelect}
                onFocus={onFocus}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

TreeMenu.displayName = 'TreeMenu';

export default TreeMenu;
