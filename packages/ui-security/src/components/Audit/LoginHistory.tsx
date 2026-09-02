/**
 * LoginHistory Component
 * 
 * Display login attempts history.
 */

import React from 'react';
import { Stack } from '@waysnx/ui-layout';
import { Badge } from '@waysnx/ui-feedback';

export interface LoginRecord {
  /**
   * Unique ID
   */
  id: string;
  /**
   * Login timestamp
   */
  timestamp: Date;
  /**
   * Login status
   */
  status: 'success' | 'failure';
  /**
   * IP address
   */
  ipAddress?: string;
  /**
   * Device/browser info
   */
  deviceInfo?: string;
  /**
   * Location
   */
  location?: string;
  /**
   * Failure reason if applicable
   */
  failureReason?: string;
  /**
   * Additional metadata (e.g. location) keyed by name
   */
  metadata?: Record<string, string>;
}

export interface LoginHistoryProps {
  /**
   * Login records
   */
  records: LoginRecord[];
  /**
   * Max records to show
   */
  maxRecords?: number;
  /**
   * Show location column
   */
  showLocation?: boolean;
}

/**
 * LoginHistory - Display login history with details
 */
export const LoginHistory: React.FC<LoginHistoryProps> = ({
  records,
  maxRecords = 10,
  showLocation = true,
}) => {
  const displayedRecords = records.slice(0, maxRecords);
  const successCount = records.filter(r => r.status === 'success').length;
  const failureCount = records.filter(r => r.status === 'failure').length;

  return (
    <div>
      {/* Statistics */}
      <Stack gap="md" direction="row" marginBottom="lg">
        <div
          padding="md"
          backgroundColor="background-alt"
          borderRadius="md"
          flex={1}
        >
          <span fontSize="sm" color="muted" marginBottom="xs">
            Successful Logins
          </span>
          <span fontSize="lg" fontWeight="bold" color="success">
            {successCount}
          </span>
        </div>
        <div
          padding="md"
          backgroundColor="background-alt"
          borderRadius="md"
          flex={1}
        >
          <span fontSize="sm" color="muted" marginBottom="xs">
            Failed Attempts
          </span>
          <span fontSize="lg" fontWeight="bold" color="danger">
            {failureCount}
          </span>
        </div>
      </Stack>

      {/* Login Records */}
      <Stack gap="md">
        {displayedRecords.length > 0 ? (
          displayedRecords.map(record => (
            <div
              key={record.id}
              padding="md"
              backgroundColor="background-alt"
              borderRadius="md"
              border={`2px solid var(--color-${record.status === 'success' ? 'success' : 'danger'}, #ccc)`}
              borderLeft={`4px solid var(--color-${record.status === 'success' ? 'success' : 'danger'}, #ccc)`}
            >
              <div display="flex" justifyContent="space-between" alignItems="flex-start" marginBottom="md">
                <div>
                  <span fontSize="sm" fontWeight="bold">
                    {record.timestamp.toLocaleString()}
                  </span>
                  {record.deviceInfo && (
                    <span fontSize="xs" color="muted">
                      {record.deviceInfo}
                    </span>
                  )}
                </div>
                <Badge color={record.status === 'success' ? 'success' : 'danger'}>
                  {record.status === 'success' ? 'âœ“ Success' : 'âœ• Failed'}
                </Badge>
              </div>

              <Stack gap="sm" fontSize="sm">
                {record.ipAddress && (
                  <div display="flex" justifyContent="space-between">
                    <span color="muted">IP Address:</span>
                    <span fontFamily="monospace">{record.ipAddress}</span>
                  </div>
                )}

                {showLocation && record.metadata?.['location'] && (
                  <div display="flex" justifyContent="space-between">
                    <span color="muted">Location:</span>
                    <span>{record.metadata?.['location']}</span>
                  </div>
                )}

                {record.status === 'failure' && record.failureReason && (
                  <div
                    padding="sm"
                    backgroundColor="danger"
                    borderRadius="md"
                  >
                    <span fontSize="xs" color="white">
                      Reason: {record.failureReason}
                    </span>
                  </div>
                )}
              </Stack>
            </div>
          ))
        ) : (
          <div
            padding="lg"
            backgroundColor="background-alt"
            borderRadius="md"
            textAlign="center"
          >
            <span color="muted">No login history available</span>
          </div>
        )}
      </Stack>

      {records.length > maxRecords && (
        <div
          padding="md"
          backgroundColor="background-alt"
          borderRadius="md"
          textAlign="center"
          marginTop="lg"
        >
          <span fontSize="sm" color="muted">
            Showing {maxRecords} of {records.length} login attempts
          </span>
        </div>
      )}
    </div>
  );
};

LoginHistory.displayName = 'LoginHistory';

export default LoginHistory;
