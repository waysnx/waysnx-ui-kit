import type { PresenceIndicatorProps } from '../../types';

export function PresenceIndicator({
  status,
  size = 'md',
  showLabel = false,
  className = '',
}: PresenceIndicatorProps) {
  return (
    <span
      className={`wx-comm-presence ${className}`}
      role="status"
      aria-label={`Status: ${status}`}
    >
      <span
        className={`wx-comm-presence__dot wx-comm-presence__dot--${size} wx-comm-presence__dot--${status}`}
      />
      {showLabel && (
        <span className="wx-comm-presence__label">{status}</span>
      )}
    </span>
  );
}
