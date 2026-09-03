/**
 * AuditTimeline Component
 * 
 * Display audit events in a vertical timeline format.
 */

import React from 'react';
import { Badge } from '@waysnx/ui-feedback';
import type { AuditEvent } from '../../types/audit';

export interface AuditTimelineProps {
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

type BadgeColor = 'default' | 'success' | 'error' | 'warning' | 'info';

const getEventColor = (eventType: string): BadgeColor => {
  const colors: Record<string, BadgeColor> = {
    'login-success': 'success',
    'login-failure': 'error',
    'logout': 'info',
    'password-change': 'warning',
    'mfa-enabled': 'success',
    'mfa-disabled': 'warning',
    'session-created': 'info',
    'session-terminated': 'error',
    'permission-denied': 'error',
  };
  return colors[eventType] || 'info';
};

const getEventIcon = (eventType: string) => {
  const icons: Record<string, string> = {
    'login-success': '✓',
    'login-failure': '✕',
    'logout': '👋',
    'password-change': '🔑',
    'mfa-enabled': '✓',
    'mfa-disabled': '✕',
    'session-created': '+',
    'session-terminated': '-',
    'permission-denied': '⛔',
  };
  return icons[eventType] || '•';
};

const getEventColorVar = (color: BadgeColor): string => {
  const vars: Record<BadgeColor, string> = {
    default: 'var(--wx-color-border, #ccc)',
    success: 'var(--wx-color-success, #16a34a)',
    error: 'var(--wx-color-danger, #d4183d)',
    warning: 'var(--wx-color-warning, #f59e0b)',
    info: 'var(--wx-color-info, #2563eb)',
  };
  return vars[color];
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
      <div style={{ position: 'relative', paddingLeft: 16 }}>
        {displayedEvents.map((event, idx) => {
          const color = getEventColor(event.eventType);
          const icon = getEventIcon(event.eventType);

          return (
            <div key={`${event.id}-${idx}`} style={{ marginBottom: 12, position: 'relative' }}>
              {/* Timeline connector */}
              {idx < displayedEvents.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: '-1.25rem',
                    top: '2rem',
                    width: '2px',
                    height: 'calc(100% + 1rem)',
                    background: 'var(--wx-color-border, #ccc)',
                  }}
                />
              )}

              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-1.5rem',
                  top: '0.25rem',
                  width: '1rem',
                  height: '1rem',
                  borderRadius: 9999,
                  background: getEventColorVar(color),
                  border: '2px solid var(--wx-color-background, white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                }}
              >
                {icon}
              </div>

              {/* Event content */}
              <div
                style={{
                  padding: 12,
                  background: 'var(--wx-color-background-alt, #f3f3f5)',
                  borderRadius: 8,
                  border: '1px solid var(--wx-color-border, #ccc)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700 }}>
                      {event.description || event.eventType}
                    </span>
                    {event.userId && (
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--wx-color-text-muted, #717182)' }}>
                        User: {event.userId}
                      </span>
                    )}
                  </div>
                  <Badge color={color}>{event.eventType}</Badge>
                </div>

                {showTimestamp && event.timestamp && (
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--wx-color-text-muted, #717182)' }}>
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                )}

                {event.metadata && Object.keys(event.metadata).length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    {Object.entries(event.metadata).map(([key, value]) => (
                      <span key={key} style={{ display: 'block', fontSize: '0.75rem', color: 'var(--wx-color-text-muted, #717182)' }}>
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
          style={{
            padding: 12,
            background: 'var(--wx-color-background-alt, #f3f3f5)',
            borderRadius: 8,
            textAlign: 'center',
            marginTop: 12,
          }}
        >
          <span style={{ fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)' }}>
            Showing {maxEvents} of {events.length} events
          </span>
        </div>
      )}
    </div>
  );
};

AuditTimeline.displayName = 'AuditTimeline';

export default AuditTimeline;
