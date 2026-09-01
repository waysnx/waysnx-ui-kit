/**
 * @file components/FavoritesMenu/FavoritesMenu.tsx
 * FavoritesMenu component for managing favorite items
 */

import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from '@waysnx/ui-i18n';
import type { FavoriteItem } from '../../types';
import './favorites-menu.css';

/**
 * FavoritesMenu component props
 */
export interface FavoritesMenuProps {
  /**
   * Array of favorite items
   */
  items: FavoriteItem[];

  /**
   * Callback when favorite item is selected
   */
  onItemSelect?: (item: FavoriteItem) => void;

  /**
   * Callback when favorite is toggled
   */
  onToggleFavorite?: (item: FavoriteItem, isFavorite: boolean) => void;

  /**
   * Maximum number of favorites to display
   */
  maxDisplayed?: number;

  /**
   * Show favorite count badge
   */
  showBadge?: boolean;

  /**
   * Enable drag and drop reordering
   */
  enableDragDrop?: boolean;

  /**
   * Show categories if available
   */
  showCategories?: boolean;

  /**
   * Display variant
   */
  variant?: 'dropdown' | 'inline' | 'compact';

  /**
   * Size of component
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Callback to check if item is favorited
   */
  isFavorited?: (itemId: string) => boolean;

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
 * FavoritesMenu Component
 *
 * Provides quick access to favorite items with management capabilities.
 * Supports multiple display variants and drag-and-drop reordering.
 *
 * @example
 * ```tsx
 * const favorites = [
 *   { id: '1', label: 'Home', href: '/', icon: '🏠' },
 *   { id: '2', label: 'Settings', href: '/settings', icon: '⚙️' },
 * ];
 *
 * <FavoritesMenu
 *   items={favorites}
 *   onItemSelect={handleSelect}
 *   onToggleFavorite={handleToggle}
 * />
 * ```
 */
export const FavoritesMenu = forwardRef<HTMLDivElement, FavoritesMenuProps>(
  (
    {
      items,
      onItemSelect,
      onToggleFavorite,
      maxDisplayed = 5,
      showBadge = true,
      enableDragDrop = false,
      showCategories = true,
      variant = 'dropdown',
      size = 'md',
      isFavorited,
      className = '',
      style,
      ariaLabel = 'Favorites menu',
      testId,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [localItems, setLocalItems] = useState(items);
    const [draggedItem, setDraggedItem] = useState<FavoriteItem | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Update local items when props change
    useEffect(() => {
      setLocalItems(items);
    }, [items]);

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
      (item: FavoriteItem) => {
        onItemSelect?.(item);
        if (variant === 'dropdown') {
          setIsOpen(false);
        }
      },
      [onItemSelect, variant]
    );

    const handleToggleFavorite = useCallback(
      (item: FavoriteItem, e: React.MouseEvent) => {
        e.stopPropagation();
        const currentlyFavorited = isFavorited?.(item.id) ?? true;
        onToggleFavorite?.(item, !currentlyFavorited);
      },
      [onToggleFavorite, isFavorited]
    );

    const handleDragStart = (item: FavoriteItem) => {
      if (!enableDragDrop) return;
      setDraggedItem(item);
    };

    const handleDragOver = (e: React.DragEvent) => {
      if (!enableDragDrop) return;
      e.preventDefault();
    };

    const handleDrop = (targetItem: FavoriteItem) => {
      if (!enableDragDrop || !draggedItem) return;

      const draggedIndex = localItems.findIndex((i) => i.id === draggedItem.id);
      const targetIndex = localItems.findIndex((i) => i.id === targetItem.id);

      if (draggedIndex === targetIndex) {
        setDraggedItem(null);
        return;
      }

      const newItems = [...localItems];
      [newItems[draggedIndex], newItems[targetIndex]] = [newItems[targetIndex], newItems[draggedIndex]];

      setLocalItems(newItems);
      setDraggedItem(null);
    };

    const groupedByCategory = showCategories
      ? localItems.reduce(
          (acc, item) => {
            const category = item.category || 'Other';
            if (!acc[category]) acc[category] = [];
            acc[category].push(item);
            return acc;
          },
          {} as Record<string, FavoriteItem[]>
        )
      : { 'All': localItems };

    const visibleItems = localItems.slice(0, maxDisplayed);
    const hiddenCount = Math.max(0, localItems.length - maxDisplayed);

    const variantClass = `wx-favorites-menu--${variant}`;
    const sizeClass = `wx-favorites-menu--${size}`;
    const combinedClassName = `wx-favorites-menu ${variantClass} ${sizeClass} ${className}`.trim();

    const renderFavoriteItem = (item: FavoriteItem, showStar = true) => (
      <button
        key={item.id}
        className="wx-favorites-menu__item"
        onClick={() => handleItemSelect(item)}
        draggable={enableDragDrop}
        onDragStart={() => handleDragStart(item)}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(item)}
        data-testid={`favorite-item-${item.id}`}
        title={item.label}
      >
        <div className="wx-favorites-menu__item-content">
          {item.icon && (
            <span className="wx-favorites-menu__item-icon">{item.icon}</span>
          )}
          <span className="wx-favorites-menu__item-label">{item.label}</span>
        </div>
        {showStar && (
          <button
            className="wx-favorites-menu__star"
            onClick={(e) => handleToggleFavorite(item, e)}
            aria-label={`Remove ${item.label} from favorites`}
            data-testid={`favorite-star-${item.id}`}
          >
            ★
          </button>
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
            className="wx-favorites-menu__trigger"
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-label={ariaLabel}
          >
            <span className="wx-favorites-menu__star-icon">★</span>
            {showBadge && (
              <span className="wx-favorites-menu__badge">{localItems.length}</span>
            )}
          </button>

          {isOpen && (
            <div className="wx-favorites-menu__dropdown" role="menu">
              {localItems.length === 0 ? (
                <div className="wx-favorites-menu__empty">
                  {t('navigation.noFavorites')}
                </div>
              ) : showCategories ? (
                Object.entries(groupedByCategory).map(([category, categoryItems]) => (
                  <div key={category} className="wx-favorites-menu__category">
                    <div className="wx-favorites-menu__category-label">{category}</div>
                    <div className="wx-favorites-menu__category-items">
                      {categoryItems.map((item) => renderFavoriteItem(item))}
                    </div>
                  </div>
                ))
              ) : (
                localItems.map((item) => renderFavoriteItem(item))
              )}
            </div>
          )}
        </div>
      );
    }

    // Inline variant
    if (variant === 'inline') {
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
          {localItems.length === 0 ? (
            <div className="wx-favorites-menu__empty">{t('navigation.noFavorites')}</div>
          ) : (
            <>
              <div className="wx-favorites-menu__list">
                {localItems.map((item) => renderFavoriteItem(item))}
              </div>
              {hiddenCount > 0 && (
                <div className="wx-favorites-menu__more">
                  +{hiddenCount} more
                </div>
              )}
            </>
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
        {localItems.length === 0 ? (
          <div className="wx-favorites-menu__empty">{t('navigation.noFavorites')}</div>
        ) : (
          <div className="wx-favorites-menu__compact-list">
            {visibleItems.map((item) => (
              <button
                key={item.id}
                className="wx-favorites-menu__compact-item"
                onClick={() => handleItemSelect(item)}
                title={item.label}
                data-testid={`favorite-compact-${item.id}`}
              >
                {item.icon ? (
                  <span className="wx-favorites-menu__compact-icon">{item.icon}</span>
                ) : (
                  <span className="wx-favorites-menu__compact-label">{item.label.charAt(0)}</span>
                )}
              </button>
            ))}
            {hiddenCount > 0 && (
              <button
                className="wx-favorites-menu__compact-more"
                onClick={() => setIsOpen(!isOpen)}
                title={`${hiddenCount} more favorites`}
                data-testid="favorite-more-compact"
              >
                +{hiddenCount}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

FavoritesMenu.displayName = 'FavoritesMenu';
