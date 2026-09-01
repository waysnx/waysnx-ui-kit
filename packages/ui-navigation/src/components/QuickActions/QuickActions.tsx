/**
 * @file components/QuickActions/QuickActions.tsx
 * QuickActions component for rapid access to common actions
 */

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import type { QuickAction, QuickActionGroup } from '../../types';
import './quick-actions.css';

/**
 * QuickActions component props
 */
export interface QuickActionsProps {
  /**
   * Array of quick action groups or individual actions
   */
  actions: (QuickAction | QuickActionGroup)[];

  /**
   * Callback when action is triggered
   */
  onActionClick?: (action: QuickAction) => void | Promise<void>;

  /**
   * Display orientation
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Display variant
   */
  variant?: 'bar' | 'grid' | 'compact';

  /**
   * Size of actions
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Show action labels
   */
  showLabels?: boolean;

  /**
   * Show action icons
   */
  showIcons?: boolean;

  /**
   * Enable keyboard shortcuts
   */
  enableKeyboardShortcuts?: boolean;

  /**
   * Maximum number of visible actions (rest go to "More")
   */
  maxVisible?: number;

  /**
   * User permissions for filtering
   */
  permissions?: string[];

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
 * Helper to check if action has required permissions
 */
const hasPermission = (action: QuickAction, permissions?: string[]): boolean => {
  if (!action.requiredPermissions || action.requiredPermissions.length === 0) {
    return true;
  }
  if (!permissions) return false;
  return action.requiredPermissions.some((perm) => permissions.includes(perm));
};

/**
 * Helper to flatten actions from groups
 */
const flattenActions = (items: (QuickAction | QuickActionGroup)[]): QuickAction[] => {
  return items.flatMap((item) => {
    if ('actions' in item) {
      return flattenActions(item.actions);
    }
    return item;
  });
};

/**
 * QuickActions Component
 *
 * Provides quick access to frequently used actions with keyboard shortcuts,
 * permission-based filtering, and flexible display options.
 *
 * @example
 * ```tsx
 * const actions = [
 *   { id: 'save', label: 'Save', icon: '💾', shortcut: 'Ctrl+S' },
 *   { id: 'export', label: 'Export', icon: '📤' },
 * ];
 *
 * <QuickActions actions={actions} onActionClick={handleAction} />
 * ```
 */
export const QuickActions = forwardRef<HTMLDivElement, QuickActionsProps>(
  (
    {
      actions,
      onActionClick,
      orientation = 'horizontal',
      variant = 'bar',
      size = 'md',
      showLabels = true,
      showIcons = true,
      enableKeyboardShortcuts = true,
      maxVisible,
      permissions,
      className = '',
      style,
      ariaLabel = 'Quick actions',
      testId,
    },
    ref
  ) => {
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const moreButtonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState<string | null>(null);

    // Filter actions by permissions
    const filterByPermissions = (items: (QuickAction | QuickActionGroup)[]) => {
      return items.filter((item) => {
        if ('actions' in item) {
          // For groups, check if group has permission or any child action is accessible
          const accessibleChildren = item.actions.filter((action) =>
            'actions' in action ? true : hasPermission(action, permissions)
          );
          return accessibleChildren.length > 0;
        }
        return hasPermission(item, permissions);
      });
    };

    const filteredActions = filterByPermissions(actions);
    const visibleActions =
      maxVisible && variant !== 'grid'
        ? filteredActions.slice(0, maxVisible)
        : filteredActions;
    const hiddenActions =
      maxVisible && variant !== 'grid' ? filteredActions.slice(maxVisible) : [];

    // Keyboard shortcut handling
    useEffect(() => {
      if (!enableKeyboardShortcuts) return;

      const flatActions = flattenActions(filteredActions);
      const shortcutMap = new Map(
        flatActions
          .filter((action) => action.shortcut && !action.disabled)
          .map((action) => [action.shortcut!.toUpperCase(), action])
      );

      const handleKeyDown = (event: KeyboardEvent) => {
        // Build the pressed keys string (Ctrl+S, Shift+A, etc.)
        const keys: string[] = [];
        if (event.ctrlKey || event.metaKey) keys.push(event.metaKey ? 'Cmd' : 'Ctrl');
        if (event.shiftKey) keys.push('Shift');
        if (event.altKey) keys.push('Alt');
        keys.push(event.key.toUpperCase());

        const shortcutStr = keys.join('+');
        const action = shortcutMap.get(shortcutStr);

        if (action) {
          event.preventDefault();
          handleActionClick(action);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [enableKeyboardShortcuts, filteredActions]);

    // Click outside to close "More" menu
    useEffect(() => {
      if (!isMoreOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsMoreOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMoreOpen]);

    const handleActionClick = async (action: QuickAction) => {
      if (action.disabled) return;

      try {
        setIsLoading(action.id);
        await onActionClick?.(action);
        action.onClick?.();
      } finally {
        setIsLoading(null);
        setIsMoreOpen(false);
      }
    };

    const variantClass = `wx-quick-actions--${variant}`;
    const orientationClass = `wx-quick-actions--${orientation}`;
    const sizeClass = `wx-quick-actions--${size}`;
    const combinedClassName = `wx-quick-actions ${variantClass} ${orientationClass} ${sizeClass} ${className}`.trim();

    const renderAction = (action: QuickAction, _isInMore = false) => (
      <button
        key={action.id}
        className={`wx-quick-actions__button ${
          isLoading === action.id ? 'wx-quick-actions__button--loading' : ''
        } ${action.disabled ? 'wx-quick-actions__button--disabled' : ''}`}
        onClick={() => handleActionClick(action)}
        disabled={action.disabled || isLoading !== null}
        title={action.tooltip || `${action.label}${action.shortcut ? ` (${action.shortcut})` : ''}`}
        aria-label={action.label}
        data-testid={`quick-action-${action.id}`}
      >
        {showIcons && action.icon && (
          <span className="wx-quick-actions__icon">{action.icon}</span>
        )}
        {showLabels && (
          <span className="wx-quick-actions__label">{action.label}</span>
        )}
        {action.shortcut && (
          <span className="wx-quick-actions__shortcut" aria-hidden="true">
            {action.shortcut}
          </span>
        )}
        {isLoading === action.id && (
          <span className="wx-quick-actions__spinner" aria-hidden="true" />
        )}
      </button>
    );

    const renderGroup = (group: QuickActionGroup) => {
      const accessibleActions = group.actions.filter((action): action is QuickAction =>
        !('actions' in action) && hasPermission(action, permissions)
      );

      if (accessibleActions.length === 0) return null;

      return (
        <div key={group.id} className="wx-quick-actions__group">
          {group.label && (
            <div className="wx-quick-actions__group-label">{group.label}</div>
          )}
          <div className="wx-quick-actions__group-items">
            {accessibleActions.map((action) => renderAction(action))}
          </div>
        </div>
      );
    };

    // Render grid variant
    if (variant === 'grid') {
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
          role="toolbar"
          aria-label={ariaLabel}
        >
          {filteredActions.map((item) => {
            if ('actions' in item) {
              return renderGroup(item);
            }
            return renderAction(item);
          })}
        </div>
      );
    }

    // Render bar variant (with optional "More" menu)
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
        role="toolbar"
        aria-label={ariaLabel}
      >
        {/* Visible actions */}
        <div className="wx-quick-actions__visible">
          {visibleActions.map((item) => {
            if ('actions' in item) {
              return renderGroup(item);
            }
            return renderAction(item);
          })}
        </div>

        {/* More button if there are hidden actions */}
        {hiddenActions.length > 0 && (
          <div className="wx-quick-actions__more">
            <button
              ref={moreButtonRef}
              className="wx-quick-actions__more-button"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              aria-haspopup="menu"
              aria-expanded={isMoreOpen}
              aria-label={`${hiddenActions.length} more actions`}
              data-testid="quick-actions-more"
            >
              <span className="wx-quick-actions__more-icon">⋯</span>
            </button>

            {isMoreOpen && (
              <div
                className="wx-quick-actions__more-menu"
                role="menu"
              >
                {hiddenActions.map((item) => {
                  if ('actions' in item) {
                    return renderGroup(item);
                  }
                  return (
                    <div key={item.id} role="none">
                      {renderAction(item, true)}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

QuickActions.displayName = 'QuickActions';
