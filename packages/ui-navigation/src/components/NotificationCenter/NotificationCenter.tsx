/**
 * @file components/NotificationCenter/NotificationCenter.tsx
 * NotificationCenter component for displaying and managing notifications
 */

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
  useMemo,
} from 'react';
import { useTranslation } from '@waysnx/ui-i18n';
import './notification-center.css';

/**
 * Notification object
 */
export interface Notification {
  id: string;
  title: string;
  message?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  category?: string;
  icon?: React.ReactNode;
  timestamp?: Date | number;
  read?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  avatar?: string;
  priority?: 'low' | 'normal' | 'high';
}

/**
 * NotificationCenter props
 */
export interface NotificationCenterProps {
  /**
   * List of notifications
   */
  notifications?: Notification[];

  /**
   * Callback when notification is read
   */
  onMarkAsRead?: (notificationId: string) => void;

  /**
   * Callback when notification is deleted
   */
  onDelete?: (notificationId: string) => void;

  /**
   * Callback when all notifications are marked as read
   */
  onMarkAllAsRead?: () => void;

  /**
   * Callback when all notifications are cleared
   */
  onClearAll?: () => void;

  /**
   * Show unread count badge
   */
  showBadge?: boolean;

  /**
   * Trigger button trigger ('hover' or 'click')
   */
  trigger?: 'hover' | 'click';

  /**
   * Max notifications to display
   */
  maxNotifications?: number;

  /**
   * Show notification categories
   */
  showCategories?: boolean;

  /**
   * Available categories for filtering
   */
  categories?: Array<{ id: string; label: string; icon?: React.ReactNode }>;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: React.CSSProperties;

  /**
   * Custom bell icon
   */
  bellIcon?: React.ReactNode;

  /**
   * Show 'Clear All' button
   */
  showClearAll?: boolean;

  /**
   * Position of dropdown
   */
  position?: 'left' | 'right';

  /**
   * Menu width
   */
  menuWidth?: string | number;

  /**
   * Accessible label
   */
  ariaLabel?: string;

  /**
   * Empty state message
   */
  emptyMessage?: string;
}

/**
 * NotificationCenter Component
 *
 * Dropdown panel for displaying notifications with filtering, reading, and deletion.
 *
 * @example
 * ```tsx
 * <NotificationCenter
 *   notifications={notifications}
 *   onMarkAsRead={handleMarkAsRead}
 *   onDelete={handleDelete}
 *   showBadge={true}
 * />
 * ```
 */
export const NotificationCenter = forwardRef<HTMLDivElement, NotificationCenterProps>(
  (
    {
      notifications = [],
      onMarkAsRead,
      onDelete,
      onMarkAllAsRead,
      onClearAll,
      showBadge = true,
      trigger = 'click',
      maxNotifications = 10,
      showCategories = false,
      categories = [],
      className = '',
      style,
      bellIcon = '🔔',
      showClearAll = true,
      position = 'right',
      menuWidth = 380,
      ariaLabel = 'Notifications',
      emptyMessage = 'No notifications',
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    // Calculate unread count
    const unreadCount = useMemo(
      () => notifications.filter((n) => !n.read).length,
      [notifications]
    );

    // Filter notifications by category
    const filteredNotifications = useMemo(() => {
      let filtered = [...notifications].slice(0, maxNotifications);
      if (selectedCategory) {
        filtered = filtered.filter((n) => n.category === selectedCategory);
      }
      return filtered;
    }, [notifications, selectedCategory, maxNotifications]);

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

    // Handle trigger click
    const handleTriggerClick = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    // Handle notification click
    const handleNotificationClick = useCallback(
      (notification: Notification) => {
        if (!notification.read) {
          onMarkAsRead?.(notification.id);
        }
      },
      [onMarkAsRead]
    );

    // Handle delete
    const handleDelete = useCallback(
      (notificationId: string) => {
        onDelete?.(notificationId);
      },
      [onDelete]
    );

    // Get notification type styles
    const getTypeClass = (type?: string) => {
      switch (type) {
        case 'success':
          return 'notification-center__item--success';
        case 'warning':
          return 'notification-center__item--warning';
        case 'error':
          return 'notification-center__item--error';
        case 'info':
        default:
          return 'notification-center__item--info';
      }
    };

    // Format timestamp
    const formatTime = (timestamp?: Date | number) => {
      if (!timestamp) return '';
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    };

    const menuWidth_ = typeof menuWidth === 'number' ? `${menuWidth}px` : menuWidth;

    return (
      <div
        ref={ref || containerRef}
        className={`notification-center nav-component ${className}`}
        style={style}
      >
        {/* Trigger Button */}
        <button
          ref={triggerRef}
          className="notification-center__trigger"
          onClick={handleTriggerClick}
          onMouseEnter={() => trigger === 'hover' && setIsOpen(true)}
          onMouseLeave={() => trigger === 'hover' && !isOpen && setIsOpen(false)}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label={ariaLabel}
        >
          <span className="notification-center__icon">{bellIcon}</span>
          {showBadge && unreadCount > 0 && (
            <span className="notification-center__badge" aria-label={`${unreadCount} unread`}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        {/* Panel Dropdown */}
        {isOpen && (
          <div
            ref={panelRef}
            className={`notification-center__panel notification-center__panel--${position}`}
            role="menu"
            style={{ width: menuWidth_ }}
            onMouseLeave={() => trigger === 'hover' && setIsOpen(false)}
          >
            {/* Header */}
            <div className="notification-center__header">
              <h3 className="notification-center__title">{t('navigation.notifications')}</h3>
              {unreadCount > 0 && (
                <button
                  className="notification-center__mark-all"
                  onClick={() => onMarkAllAsRead?.()}
                  title="Mark all as read"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Categories */}
            {showCategories && categories.length > 0 && (
              <div className="notification-center__categories">
                <button
                  className={`notification-center__category ${
                    selectedCategory === null ? 'notification-center__category--active' : ''
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`notification-center__category ${
                      selectedCategory === cat.id ? 'notification-center__category--active' : ''
                    }`}
                    onClick={() => setSelectedCategory(cat.id)}
                    title={cat.label}
                  >
                    {cat.icon && <span className="notification-center__category-icon">{cat.icon}</span>}
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Notifications List */}
            {filteredNotifications.length > 0 ? (
              <div className="notification-center__list">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-center__item ${getTypeClass(notification.type)} ${
                      !notification.read ? 'notification-center__item--unread' : ''
                    }`}
                    role="menuitem"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    {notification.avatar ? (
                      <img
                        src={notification.avatar}
                        alt=""
                        className="notification-center__item-avatar"
                      />
                    ) : notification.icon ? (
                      <span className="notification-center__item-icon">{notification.icon}</span>
                    ) : (
                      <span className="notification-center__item-icon-default">
                        {notification.type === 'success' && '✓'}
                        {notification.type === 'error' && '✕'}
                        {notification.type === 'warning' && '⚠'}
                        {notification.type === 'info' && 'ℹ'}
                      </span>
                    )}

                    <div className="notification-center__item-content">
                      <div className="notification-center__item-title">{notification.title}</div>
                      {notification.message && (
                        <div className="notification-center__item-message">{notification.message}</div>
                      )}
                      {notification.timestamp && (
                        <div className="notification-center__item-time">
                          {formatTime(notification.timestamp)}
                        </div>
                      )}
                    </div>

                    {notification.action && (
                      <button
                        className="notification-center__item-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          notification.action!.onClick();
                        }}
                      >
                        {notification.action.label}
                      </button>
                    )}

                    <button
                      className="notification-center__item-close"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notification.id);
                      }}
                      aria-label="Dismiss"
                      title="Dismiss"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="notification-center__empty">{emptyMessage}</div>
            )}

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="notification-center__footer">
                {notifications.length > maxNotifications && (
                  <div className="notification-center__footer-info">
                    Showing {filteredNotifications.length} of {notifications.length}
                  </div>
                )}
                {showClearAll && notifications.length > 0 && (
                  <button
                    className="notification-center__clear-all"
                    onClick={() => onClearAll?.()}
                  >
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

NotificationCenter.displayName = 'NotificationCenter';

export default NotificationCenter;
