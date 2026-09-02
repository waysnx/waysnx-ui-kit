/**
 * SessionCountdown Component
 * 
 * Displays session remaining time countdown.
 */

import React, { useEffect } from 'react';

export interface SessionCountdownProps {
  /**
   * Total session duration in milliseconds
   */
  totalDuration: number;
  /**
   * Remaining time in milliseconds
   */
  remainingTime: number;
  /**
   * Callback when time is low (30% remaining)
   */
  onTimeLow?: () => void;
  /**
   * Callback when time is critical (10% remaining)
   */
  onTimeCritical?: () => void;
  /**
   * Display format
   */
  format?: 'compact' | 'detailed';
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Format time for display
 */
const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * SessionCountdown - Session time countdown display
 */
export const SessionCountdown: React.FC<SessionCountdownProps> = ({
  totalDuration,
  remainingTime,
  onTimeLow,
  onTimeCritical,
  format = 'compact',
  className,
}) => {
  const percentage = (remainingTime / totalDuration) * 100;
  const isLow = percentage <= 30 && percentage > 10;
  const isCritical = percentage <= 10;

  useEffect(() => {
    if (isLow && onTimeLow) {
      onTimeLow();
    }
  }, [isLow, onTimeLow]);

  useEffect(() => {
    if (isCritical && onTimeCritical) {
      onTimeCritical();
    }
  }, [isCritical, onTimeCritical]);

  let colorScheme = 'success';
  if (isCritical) {
    colorScheme = 'error';
  } else if (isLow) {
    colorScheme = 'warning';
  }

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {/* Progress bar */}
      <div
        style={{
          flex: 1,
          height: '4px',
          backgroundColor: 'var(--color-muted, #ccc)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${Math.max(0, percentage)}%`,
            backgroundColor: `var(--color-${colorScheme}, #ccc)`,
            transition: 'width 200ms ease-out',
          }}
        />
      </div>

      {/* Time display */}
      {format === 'detailed' ? (
        <div>
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: `var(--color-${colorScheme}, #333)` }}>
            {formatTime(remainingTime)}
          </span>
          {isCritical && (
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-error, red)' }}>
              Session expiring
            </span>
          )}
        </div>
      ) : (
        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: `var(--color-${colorScheme}, #333)` }}>
          {formatTime(remainingTime)}
        </span>
      )}
    </div>
  );
};

SessionCountdown.displayName = 'SessionCountdown';

export default SessionCountdown;
