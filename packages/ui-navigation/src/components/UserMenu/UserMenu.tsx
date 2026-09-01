/**
 * @file components/UserMenu/UserMenu.tsx
 * UserMenu component for displaying user profile, settings, and logout
 */

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
} from 'react';
import './user-menu.css';

/**
 * User menu item
 */
export interface UserMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  divider?: boolean;
  destructive?: boolean;
  disabled?: boolean;
}

/**
 * User info displayed in menu header
 */
export interface UserInfo {
  name: string;
  email?: string;
  avatar?: string;
  badge?: React.ReactNode;
  status?: 'online' | 'away' | 'offline' | 'busy';
}

/**
 * UserMenu component props
 */
export interface UserMenuProps {
  /**
   * User information
   */
  user: UserInfo;

  /**
   * Menu items
   */
  items?: UserMenuItem[];

  /**
   * Trigger button trigger ('hover' or 'click')
   */
  trigger?: 'hover' | 'click';

  /**
   * Menu position relative to trigger
   */
  position?: 'left' | 'right';

  /**
   * Show status indicator
   */
  showStatus?: boolean;

  /**
   * Show trigger button
   */
  showTrigger?: boolean;

  /**
   * Custom trigger element
   */
  customTrigger?: React.ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: React.CSSProperties;

  /**
   * Callback when menu opens
   */
  onOpen?: () => void;

  /**
   * Callback when menu closes
   */
  onClose?: () => void;

  /**
   * Menu width
   */
  menuWidth?: string | number;

  /**
   * Show user info header
   */
  showUserInfo?: boolean;

  /**
   * Custom header content
   */
  headerContent?: React.ReactNode;

  /**
   * Accessible label
   */
  ariaLabel?: string;
}

/**
 * UserMenu Component
 *
 * Dropdown menu for displaying user profile, settings, and logout options.
 *
 * @example
 * ```tsx
 * <UserMenu
 *   user={{ name: 'John Doe', email: 'john@example.com' }}
 *   items={[
 *     { id: 'profile', label: 'Profile', onClick: () => navigate('/profile') },
 *     { id: 'settings', label: 'Settings', onClick: () => navigate('/settings') },
 *     { id: 'logout', label: 'Logout', onClick: handleLogout, destructive: true },
 *   ]}
 * />
 * ```
 */
export const UserMenu = forwardRef<HTMLDivElement, UserMenuProps>(
  (
    {
      user,
      items = [],
      trigger = 'click',
      position = 'right',
      showStatus = true,
      showTrigger = true,
      customTrigger,
      className = '',
      style,
      onOpen,
      onClose,
      menuWidth = 280,
      showUserInfo = true,
      headerContent,
      ariaLabel = 'User menu',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Handle open state change
    useEffect(() => {
      if (isOpen) {
        onOpen?.();
      } else {
        onClose?.();
      }
    }, [isOpen, onOpen, onClose]);

    // Close menu on outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    // Close menu on Escape
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          setIsOpen(false);
          triggerRef.current?.focus();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
    }, [isOpen]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isOpen) return;

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            const firstItem = menuRef.current?.querySelector('[role="menuitem"]:not([disabled])');
            if (firstItem && firstItem instanceof HTMLElement) {
              firstItem.focus();
            }
            break;
          case 'Escape':
            e.preventDefault();
            setIsOpen(false);
            triggerRef.current?.focus();
            break;
          default:
            break;
        }
      },
      [isOpen]
    );

    // Handle trigger click
    const handleTriggerClick = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    // Handle item click
    const handleItemClick = useCallback(
      (item: UserMenuItem) => {
        if (!item.disabled) {
          item.onClick();
          setIsOpen(false);
        }
      },
      []
    );

    // Get status color
    const getStatusColor = (status?: string) => {
      switch (status) {
        case 'online':
          return 'var(--color-success, #10b981)';
        case 'away':
          return 'var(--color-warning, #f59e0b)';
        case 'busy':
          return 'var(--color-error, #ef4444)';
        default:
          return 'var(--color-gray-400, #9ca3af)';
      }
    };

    const menuWidth_ = typeof menuWidth === 'number' ? `${menuWidth}px` : menuWidth;

    return (
      <div
        ref={ref || containerRef}
        className={`user-menu nav-component ${className}`}
        style={style}
        onKeyDown={handleKeyDown}
      >
        {/* Trigger Button */}
        {showTrigger && (
          <button
            ref={triggerRef}
            className="user-menu__trigger"
            onClick={handleTriggerClick}
            onMouseEnter={() => trigger === 'hover' && setIsOpen(true)}
            onMouseLeave={() => trigger === 'hover' && !isOpen && setIsOpen(false)}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-label={ariaLabel}
            title={user.name}
          >
            {customTrigger ? (
              customTrigger
            ) : (
              <>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="user-menu__avatar" />
                ) : (
                  <div className="user-menu__avatar user-menu__avatar--placeholder">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                )}
                {showStatus && user.status && (
                  <div
                    className="user-menu__status"
                    style={{ backgroundColor: getStatusColor(user.status) }}
                    title={user.status}
                  />
                )}
              </>
            )}
          </button>
        )}

        {/* Menu Dropdown */}
        {isOpen && (
          <div
            ref={menuRef}
            className={`user-menu__dropdown user-menu__dropdown--${position}`}
            role="menu"
            style={{ width: menuWidth_ }}
            onMouseLeave={() => trigger === 'hover' && setIsOpen(false)}
          >
            {/* User Info Header */}
            {showUserInfo && !headerContent && (
              <div className="user-menu__header">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="user-menu__header-avatar" />
                ) : (
                  <div className="user-menu__header-avatar user-menu__header-avatar--placeholder">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                )}
                <div className="user-menu__header-info">
                  <div className="user-menu__header-name">{user.name}</div>
                  {user.email && <div className="user-menu__header-email">{user.email}</div>}
                </div>
              </div>
            )}

            {/* Custom Header */}
            {headerContent && (
              <div className="user-menu__header user-menu__header--custom">{headerContent}</div>
            )}

            {/* Menu Items */}
            <div className="user-menu__items">
              {items.map((item, index) => (
                <div key={item.id}>
                  {item.divider && index > 0 ? (
                    <div className="user-menu__divider" role="separator" />
                  ) : null}
                  <button
                    className={`user-menu__item ${
                      item.destructive ? 'user-menu__item--destructive' : ''
                    } ${item.disabled ? 'user-menu__item--disabled' : ''}`}
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    role="menuitem"
                    aria-disabled={item.disabled}
                  >
                    {item.icon && <span className="user-menu__item-icon">{item.icon}</span>}
                    <span className="user-menu__item-label">{item.label}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

UserMenu.displayName = 'UserMenu';

export default UserMenu;
