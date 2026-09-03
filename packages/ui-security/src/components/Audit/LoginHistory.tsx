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

const MUTED = 'var(--wx-color-text-muted, #717182)';
const CARD_BG = 'var(--wx-color-background-alt, #f3f3f5)';

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
      <Stack gap="md" direction="horizontal">
        <div style={{ padding: 12, background: CARD_BG, borderRadius: 8, flex: 1 }}>
          <span style={{ display: 'block', fontSize: '0.875rem', color: MUTED, marginBottom: 4 }}>
            Successful Logins
          </span>
          <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--wx-color-success, #16a34a)' }}>
            {successCount}
          </span>
        </div>
        <div style={{ padding: 12, background: CARD_BG, borderRadius: 8, flex: 1 }}>
          <span style={{ display: 'block', fontSize: '0.875rem', color: MUTED, marginBottom: 4 }}>
            Failed Attempts
          </span>
          <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--wx-color-danger, #d4183d)' }}>
            {failureCount}
          </span>
        </div>
      </Stack>

      {/* Login Records */}
      <Stack gap="md">
        {displayedRecords.length > 0 ? (
          displayedRecords.map(record => {
            const accent = record.status === 'success'
              ? 'var(--wx-color-success, #16a34a)'
              : 'var(--wx-color-danger, #d4183d)';
            return (
              <div
                key={record.id}
                style={{
                  padding: 12,
                  background: CARD_BG,
                  borderRadius: 8,
                  border: `2px solid ${accent}`,
                  borderLeft: `4px solid ${accent}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700 }}>
                      {record.timestamp.toLocaleString()}
                    </span>
                    {record.deviceInfo && (
                      <span style={{ fontSize: '0.75rem', color: MUTED }}>
                        {record.deviceInfo}
                      </span>
                    )}
                  </div>
                  <Badge color={record.status === 'success' ? 'success' : 'error'}>
                    {record.status === 'success' ? 'Success' : 'Failed'}
                  </Badge>
                </div>

                <Stack gap="sm">
                  {record.ipAddress && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: MUTED }}>IP Address:</span>
                      <span style={{ fontFamily: 'monospace' }}>{record.ipAddress}</span>
                    </div>
                  )}

                  {showLocation && record.metadata?.['location'] && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: MUTED }}>Location:</span>
                      <span>{record.metadata?.['location']}</span>
                    </div>
                  )}

                  {record.status === 'failure' && record.failureReason && (
                    <div style={{ padding: 8, background: 'var(--wx-color-danger, #d4183d)', borderRadius: 8 }}>
                      <span style={{ fontSize: '0.75rem', color: '#fff' }}>
                        Reason: {record.failureReason}
                      </span>
                    </div>
                  )}
                </Stack>
              </div>
            );
          })
        ) : (
          <div style={{ padding: 16, background: CARD_BG, borderRadius: 8, textAlign: 'center' }}>
            <span style={{ color: MUTED }}>No login history available</span>
          </div>
        )}
      </Stack>

      {records.length > maxRecords && (
        <div style={{ padding: 12, background: CARD_BG, borderRadius: 8, textAlign: 'center', marginTop: 16 }}>
          <span style={{ fontSize: '0.875rem', color: MUTED }}>
            Showing {maxRecords} of {records.length} login attempts
          </span>
        </div>
      )}
    </div>
  );
};

LoginHistory.displayName = 'LoginHistory';

export default LoginHistory;
