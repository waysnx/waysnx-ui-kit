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
  [key: string]: any;
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

const getSeverityColor = (severity: string) => {
  const colors: Record<string, string> = {
    critical: 'danger',
    high: 'danger',
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
        <div marginBottom="lg" display="flex" gap="md">
          <Button
            variant="outline"
           
            onClick={() => onExport('json')}
          >
            📥 Export as JSON
          </Button>
          <Button
            variant="outline"
           
            onClick={() => onExport('csv')}
          >
            📥 Export as CSV
          </Button>
        </div>
      )}

      {/* Severity Filter */}
      <div marginBottom="lg">
        <span fontSize="sm" fontWeight="bold" marginBottom="md">
          Filter by Severity:
        </span>
        <Stack gap="sm" direction="row">
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
              padding="lg"
              backgroundColor="background-alt"
              borderRadius="md"
              border="1px solid var(--color-border, #ccc)"
            >
              <div display="flex" justifyContent="space-between" alignItems="flex-start" marginBottom="md">
                <div>
                  <span fontSize="base" fontWeight="bold" marginBottom="xs">
                    {event.category || 'Security Event'}
                  </span>
                  <span fontSize="sm" color="muted">
                    {event.description}
                  </span>
                </div>
                {event.severity && (
                  <Badge color={getSeverityColor(event.severity)}>
                    {event.severity}
                  </Badge>
                )}
              </div>

              <Stack gap="sm" fontSize="sm">
                {event.timestamp && (
                  <div display="flex" justifyContent="space-between">
                    <span color="muted">Timestamp:</span>
                    <span>{new Date(event.timestamp).toLocaleString()}</span>
                  </div>
                )}

                {event.userId && (
                  <div display="flex" justifyContent="space-between">
                    <span color="muted">User ID:</span>
                    <span fontFamily="monospace">{event.userId}</span>
                  </div>
                )}

                {event.ipAddress && (
                  <div display="flex" justifyContent="space-between">
                    <span color="muted">IP Address:</span>
                    <span fontFamily="monospace">{event.ipAddress}</span>
                  </div>
                )}

                {event.resource && (
                  <div display="flex" justifyContent="space-between">
                    <span color="muted">Resource:</span>
                    <span fontFamily="monospace">{event.resource}</span>
                  </div>
                )}
              </Stack>

              {event.details && Object.keys(event.details).length > 0 && (
                <div
                  marginTop="md"
                  padding="sm"
                  backgroundColor="background"
                  borderRadius="md"
                  fontSize="xs"
                >
                  <span fontWeight="bold" marginBottom="xs" color="muted">
                    Additional Details:
                  </span>
                  {Object.entries(event.details).map(([key, value]) => (
                    <div key={key}>
                      <span color="muted">
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
            padding="lg"
            backgroundColor="background-alt"
            borderRadius="md"
            textAlign="center"
          >
            <span color="muted">No security events found</span>
          </div>
        )}
      </Stack>

      {/* Load More */}
      {hasMore && !showAll && (
        <div textAlign="center" marginTop="lg">
          <Button
            variant="outline"
            onClick={() => setShowAll(true)}
          >
            Show More ({filteredEvents.length - maxInitialEvents} more)
          </Button>
        </div>
      )}

      {showAll && hasMore && (
        <div textAlign="center" marginTop="lg">
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
