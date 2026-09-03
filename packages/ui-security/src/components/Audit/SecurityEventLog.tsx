/**
 * SecurityEventLog Component
 * 
 * Display security-specific events with filtering and export.
 */

import React, { useState } from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';
import { Badge } from '@waysnx/ui-feedback';
import type { SecurityEventLog as SecurityEventLogType } from '../../types/audit';

export interface SecurityEventLogProps {
  /**
   * Security events to display
   */
  events: SecurityEventLogType[];
  /**
   * Enable export
   */
  enableExport?: boolean;
  /**
   * Callback for export
   */
  onExport?: (format: 'json' | 'csv') => void;
  /**
   * Max events to show initially
   */
  maxInitialEvents?: number;
}

type BadgeColor = 'default' | 'success' | 'error' | 'warning' | 'info';

const getSeverityColor = (severity: string): BadgeColor => {
  const colors: Record<string, BadgeColor> = {
    critical: 'error',
    high: 'error',
    medium: 'warning',
    low: 'info',
  };
  return colors[severity.toLowerCase()] || 'info';
};

/**
 * SecurityEventLog - Display security event log with details
 */
export const SecurityEventLog: React.FC<SecurityEventLogProps> = ({
  events,
  enableExport = true,
  onExport,
  maxInitialEvents = 20,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('');

  const filteredEvents = selectedSeverity
    ? events.filter(e => e.severity?.toLowerCase() === selectedSeverity.toLowerCase())
    : events;

  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, maxInitialEvents);
  const hasMore = filteredEvents.length > maxInitialEvents;

  const severityDistribution = {
    critical: events.filter(e => e.severity?.toLowerCase() === 'critical').length,
    high: events.filter(e => e.severity?.toLowerCase() === 'high').length,
    medium: events.filter(e => e.severity?.toLowerCase() === 'medium').length,
    low: events.filter(e => e.severity?.toLowerCase() === 'low').length,
  };

  return (
    <div>
      {/* Export Buttons */}
      {enableExport && onExport && (
        <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
          <Button variant="outline" onClick={() => onExport('json')}>
            Export as JSON
          </Button>
          <Button variant="outline" onClick={() => onExport('csv')}>
            Export as CSV
          </Button>
        </div>
      )}

      {/* Severity Filter */}
      <div style={{ marginBottom: 16 }}>
        <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: 12 }}>
          Filter by Severity:
        </span>
        <Stack gap="sm" direction="horizontal">
          <Button
            variant={selectedSeverity === '' ? 'primary' : 'outline'}
           
            onClick={() => setSelectedSeverity('')}
          >
            All ({events.length})
          </Button>
          {Object.entries(severityDistribution).map(([severity, count]) => (
            <Button
              key={severity}
              variant={selectedSeverity === severity ? 'primary' : 'outline'}
             
              onClick={() => setSelectedSeverity(severity)}
            >
              {severity.charAt(0).toUpperCase() + severity.slice(1)} ({count})
            </Button>
          ))}
        </Stack>
      </div>

      {/* Events */}
      <Stack gap="md">
        {displayedEvents.length > 0 ? (
          displayedEvents.map((event, idx) => (
            <div
              key={idx}
              style={{
                padding: 16,
                background: 'var(--wx-color-background-alt, #f3f3f5)',
                borderRadius: 8,
                border: '1px solid var(--wx-color-border, #ccc)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <span style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>
                    {event.category || 'Security Event'}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)' }}>
                    {event.description}
                  </span>
                </div>
                {event.severity && (
                  <Badge color={getSeverityColor(event.severity)}>
                    {event.severity}
                  </Badge>
                )}
              </div>

              <Stack gap="sm">
                {event.timestamp && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>Timestamp:</span>
                    <span>{new Date(event.timestamp).toLocaleString()}</span>
                  </div>
                )}

                {event.userId && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>User ID:</span>
                    <span style={{ fontFamily: 'monospace' }}>{event.userId}</span>
                  </div>
                )}

                {event.ipAddress && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>IP Address:</span>
                    <span style={{ fontFamily: 'monospace' }}>{event.ipAddress}</span>
                  </div>
                )}

                {event.resource && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>Resource:</span>
                    <span style={{ fontFamily: 'monospace' }}>{event.resource}</span>
                  </div>
                )}
              </Stack>

              {event.details && Object.keys(event.details).length > 0 && (
                <div
                  style={{
                    marginTop: 12,
                    padding: 8,
                    background: 'var(--wx-color-background, #ffffff)',
                    borderRadius: 8,
                    fontSize: '0.75rem',
                  }}
                >
                  <span style={{ display: 'block', fontWeight: 700, marginBottom: 4, color: 'var(--wx-color-text-muted, #717182)' }}>
                    Additional Details:
                  </span>
                  {Object.entries(event.details).map(([key, value]) => (
                    <div key={key}>
                      <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>
                        {key}: {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div
            style={{
              padding: 16,
              background: 'var(--wx-color-background-alt, #f3f3f5)',
              borderRadius: 8,
              textAlign: 'center',
            }}
          >
            <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>No security events found</span>
          </div>
        )}
      </Stack>

      {/* Load More */}
      {hasMore && !showAll && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button
            variant="outline"
            onClick={() => setShowAll(true)}
          >
            Show More ({filteredEvents.length - maxInitialEvents} more)
          </Button>
        </div>
      )}

      {showAll && hasMore && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button
            variant="outline"
            onClick={() => setShowAll(false)}
          >
            Show Less
          </Button>
        </div>
      )}
    </div>
  );
};

SecurityEventLog.displayName = 'SecurityEventLog';

export default SecurityEventLog;
