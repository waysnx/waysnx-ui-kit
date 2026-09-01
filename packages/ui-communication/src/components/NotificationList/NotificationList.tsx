import type { NotificationListProps } from '../../types';

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

function formatRelativeTime(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function NotificationList({
  notifications,
  onRead,
  onReadAll,
  onClick,
  className = '',
}: NotificationListProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className={`wx-comm-notification-list ${className}`} role="list" aria-label="Notifications">
      <div className="wx-comm-notification-list__header">
        <span className="wx-comm-notification-list__title">
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </span>
        {unreadCount > 0 && (
          <button className="wx-comm-notification-list__mark-read" onClick={onReadAll} type="button">
            Mark all as read
          </button>
        )}
      </div>
      {notifications.length === 0 ? (
        <div style={{ padding: 24, textAlign: 'center', color: 'var(--wx-color-text-muted)', fontSize: 13 }}>
          No notifications
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`wx-comm-notification-item ${!notification.read ? 'wx-comm-notification-item--unread' : ''}`}
            onClick={() => { onRead?.(notification.id); onClick?.(notification); }}
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') { onRead?.(notification.id); onClick?.(notification); } }}
          >
            <div className="wx-comm-notification-item__avatar">
              {notification.sender?.avatar ? (
                <img src={notification.sender.avatar} alt={notification.sender.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                getInitials(notification.sender?.name || 'N')
              )}
            </div>
            <div className="wx-comm-notification-item__content">
              <div className="wx-comm-notification-item__title">{notification.title}</div>
              <div className="wx-comm-notification-item__body">{notification.body}</div>
            </div>
            <span className="wx-comm-notification-item__time">
              {formatRelativeTime(notification.createdAt)}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
