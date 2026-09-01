import type { ReactNode } from 'react';
import type { NotificationBadgeProps } from '../../types';

export function NotificationBadge({
  count,
  maxCount = 99,
  className = '',
}: NotificationBadgeProps & { children?: ReactNode }) {
  if (count <= 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : String(count);

  return (
    <span className={`wx-comm-notification-badge__count ${className}`} aria-label={`${count} notifications`}>
      {displayCount}
    </span>
  );
}
