/**
 * AuditTimeline Component
 * 
 * Display audit events in a vertical timeline format.
 */

import React from 'react';
import { Badge } from '@waysnx/ui-feedback';
import type { AuditEvent } from '../../types/audit';

export interface AuditTimelineProps {
  [key: string]: any;
  /**
   * Audit events to display
   */
  events: AuditEvent[];
  /**
   * Maximum events to show
   */
  maxEvents?: number;
  /**
   * Show timestamp
   */
  showTimestamp?: boolean;
}

const getEventColor = (eventType: string) => {
  const colors: Record<string, string> = {
    'login-success': 'success',
    'login-failure': 'danger',
    'logout': 'info',
    'password-change': 'warning',
    'mfa-enabled': 'success',
    'mfa-disabled': 'warning',
    'session-created': 'info',
    'session-terminated': 'danger',
    'permission-denied': 'danger',
  };
  return colors[eventType] || 'info';
};

const getEventIcon = (eventType: string) => {
  const icons: Record<string, string> = {
    'login-success': '✓',
    'login-failure': '✕',
    'logout': '👋',
    'password-change': '🔐',
    'mfa-enabled': '✓',
    'mfa-disabled': '✕',
    'session-created': '+',
    'session-terminated': '-',
    'permission-denied': '🚫',
  };
  return icons[eventType] || '•';
};

/**
 * AuditTimeline - Display audit events in timeline
 */
export const AuditTimeline: React.FC<AuditTimelineProps> = ({
  events,
  maxEvents = 10,
  showTimestamp = true,
}) => {
  const displayedEvents = events.slice(0, maxEvents);

  return (
    <div>
      <div position="relative" paddingLeft="lg">
        {displayedEvents.map((event, idx) => {
          const color = getEventColor(event.eventType);
          const icon = getEventIcon(event.eventType);

          return (
            <div key={`${event.id}-${idx}`} marginBottom="md" position="relative">
              {/* Timeline connector */}
              {idx < displayedEvents.length - 1 && (
                <div
                  position="absolute"
                  left="-1.25rem"
                  top="2rem"
                  width="2px"
                  height="calc(100% + 1rem)"
                  backgroundColor="border"
                />
              )}

              {/* Timeline dot */}
              <div
                position="absolute"
                left="-1.5rem"
                top="0.25rem"
                width="1rem"
                height="1rem"
                borderRadius="full"
                backgroundColor={`var(--color-${color}, #ccc)`}
                border="2px solid var(--color-background, white)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xs"
              >
                {icon}
              </div>

              {/* Event content */}
              <div
                padding="md"
                backgroundColor="background-alt"
                borderRadius="md"
                border="1px solid var(--color-border, #ccc)"
              >
                <div display="flex" justifyContent="space-between" alignItems="flex-start" marginBottom="xs">
                  <div>
                    <span fontSize="sm" fontWeight="bold">
                      {event.description || event.eventType}
                    </span>
                    {event.userId && (
                      <span fontSize="xs" color="muted">
                        User: {event.userId}
                      </span>
                    )}
                  </div>
                  <Badge color={color}>{event.eventType}</Badge>
                </div>

                {showTimestamp && event.timestamp && (
                  <span fontSize="xs" color="muted">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                )}

                {event.metadata && Object.keys(event.metadata).length > 0 && (
                  <div marginTop="sm">
                    {Object.entries(event.metadata).map(([key, value]) => (
                      <span key={key} fontSize="xs" color="muted">
                        {key}: {String(value)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {events.length > maxEvents && (
        <div
          padding="md"
          backgroundColor="background-alt"
          borderRadius="md"
          textAlign="center"
          marginTop="md"
        >
          <span fontSize="sm" color="muted">
            Showing {maxEvents} of {events.length} events
          </span>
        </div>
      )}
    </div>
  );
};

AuditTimeline.displayName = 'AuditTimeline';

export default AuditTimeline;
