/**
 * ActiveSessions Component
 * 
 * Displays list of active sessions with device info and actions to revoke them.
 */

import React, { useState } from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';
import { Badge } from '@waysnx/ui-feedback';
import type { SessionInfo } from '../../types/session';

export interface ActiveSessionsProps {
  /**
   * List of active sessions
   */
  sessions: SessionInfo[];
  /**
   * Current session ID (to mark as current)
   */
  currentSessionId?: string;
  /**
   * Callback to revoke a session
   */
  onRevokeSession?: (sessionId: string) => Promise<void>;
  /**
   * Whether currently revoking a session
   */
  isRevoking?: boolean;
  /**
   * Custom label for current session
   */
  currentSessionLabel?: string;
  /**
   * Callback when all other sessions are revoked
   */
  onRevokeAll?: () => Promise<void>;
  /**
   * Whether showing revoke all button
   */
  showRevokeAll?: boolean;
}

/**
 * ActiveSessions - List of active sessions with revoke actions
 */
export const ActiveSessions: React.FC<ActiveSessionsProps> = ({
  sessions,
  currentSessionId,
  onRevokeSession,
  isRevoking = false,
  currentSessionLabel = 'Current',
  onRevokeAll,
  showRevokeAll = true,
}) => {
  const [revokingIds, setRevokingIds] = useState<Set<string>>(new Set());

  const handleRevokeSession = async (sessionId: string) => {
    if (!onRevokeSession) return;

    setRevokingIds(prev => new Set(prev).add(sessionId));
    try {
      await onRevokeSession(sessionId);
    } finally {
      setRevokingIds(prev => {
        const next = new Set(prev);
        next.delete(sessionId);
        return next;
      });
    }
  };

  const handleRevokeAll = async () => {
    if (!onRevokeAll) return;

    try {
      await onRevokeAll();
    } catch (error) {
      console.error('Failed to revoke all sessions:', error);
    }
  };

  const otherSessions = sessions.filter(
    session => !currentSessionId || session.id !== currentSessionId
  );
  const currentSession = sessions.find(session => session.id === currentSessionId);

  return (
    <div>
      {/* Current Session */}
      {currentSession && (
        <div
          style={{
            padding: 12,
            marginBottom: 16,
            border: '1px solid var(--wx-color-success, #16a34a)',
            borderRadius: 8,
          }}
        >
          <Stack gap="md">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold' }}>
                  {currentSessionLabel}
                </span>
                <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)', marginTop: '0.25rem' }}>
                  {currentSession.deviceInfo?.['name'] || 'Unknown Device' || 'Unknown Device'}
                </span>
              </div>
              <Badge color="success">{currentSessionLabel}</Badge>
            </div>

            <Stack gap="xs">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)' }}>
                  IP Address:
                </span>
                <span style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>
                  {currentSession.ipAddress || 'Unknown'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)' }}>
                  Last Active:
                </span>
                <span style={{ fontSize: '0.875rem' }}>
                  {currentSession.lastActivityAt
                    ? new Date(currentSession.lastActivityAt).toLocaleString()
                    : 'Now'}
                </span>
              </div>

              {currentSession.userAgent && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)' }}>
                    Browser:
                  </span>
                  <span style={{ fontSize: '0.875rem' }}>{currentSession.userAgent}</span>
                </div>
              )}
            </Stack>
          </Stack>
        </div>
      )}

      {/* Other Active Sessions */}
      {otherSessions.length > 0 ? (
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold' }}>
              Other Active Sessions
            </span>
            <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)', marginTop: '0.25rem' }}>
              {otherSessions.length} session{otherSessions.length !== 1 ? 's' : ''}
            </span>
          </div>

          <Stack gap="md">
            {otherSessions.map(session => (
              <div
                key={session.id}
                style={{
                  padding: 12,
                  border: '1px solid var(--wx-color-border, #ccc)',
                  borderRadius: 8,
                }}
              >
                <Stack gap="md">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold' }}>
                        {session.deviceInfo?.['name'] || 'Unknown Device' || 'Unknown Device'}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)', marginTop: '0.25rem' }}>
                        {session.ipAddress || 'Unknown IP'}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleRevokeSession(session.id)}
                      disabled={isRevoking || revokingIds.has(session.id)}
                    >
                      {revokingIds.has(session.id) ? 'Revoking...' : 'Revoke'}
                    </Button>
                  </div>

                  <Stack gap="xs">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>Created:</span>
                      <span>
                        {session.createdAt
                          ? new Date(session.createdAt).toLocaleString()
                          : 'Unknown'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>Last Active:</span>
                      <span>
                        {session.lastActivityAt
                          ? new Date(session.lastActivityAt).toLocaleString()
                          : 'Unknown'}
                      </span>
                    </div>

                    {session.userAgent && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                        <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>Browser:</span>
                        <span>{session.userAgent}</span>
                      </div>
                    )}
                  </Stack>
                </Stack>
              </div>
            ))}
          </Stack>

          {showRevokeAll && otherSessions.length > 0 && onRevokeAll && (
            <div style={{ marginTop: '1.5rem' }}>
              <Button
                variant="outline"
                onClick={handleRevokeAll}
                disabled={isRevoking || revokingIds.size > 0}
              >
                Revoke All Other Sessions
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            padding: '1.5rem',
            background: 'var(--wx-color-background-alt, #f3f3f5)',
            borderRadius: '0.375rem',
            textAlign: 'center',
          }}
        >
          <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>
            {currentSession ? 'Only this session is active' : 'No active sessions'}
          </span>
        </div>
      )}
    </div>
  );
};

ActiveSessions.displayName = 'ActiveSessions';

export default ActiveSessions;
