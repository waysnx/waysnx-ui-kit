/**
 * Audit Logging and Event Tracking Utilities
 * 
 * Provides utilities for creating, formatting, and filtering audit events.
 * Ensures comprehensive security audit trails for compliance and forensics.
 */

import type { AuditEvent } from '../types';
import { generateSecureId } from './crypto';

/**
 * Audit event severity levels
 */
export enum AuditSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * Common audit event types
 */
export enum AuditEventType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  LOGIN_FAILED = 'login_failed',
  PASSWORD_CHANGED = 'password_changed',
  PASSWORD_RESET = 'password_reset',
  MFA_ENABLED = 'mfa_enabled',
  MFA_DISABLED = 'mfa_disabled',
  MFA_VERIFIED = 'mfa_verified',
  MFA_FAILED = 'mfa_failed',
  PERMISSION_GRANTED = 'permission_granted',
  PERMISSION_REVOKED = 'permission_revoked',
  ROLE_ASSIGNED = 'role_assigned',
  ROLE_REMOVED = 'role_removed',
  SESSION_CREATED = 'session_created',
  SESSION_TERMINATED = 'session_terminated',
  SESSION_TIMEOUT = 'session_timeout',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  ACCESS_DENIED = 'access_denied',
  DATA_ACCESS = 'data_access',
  DATA_MODIFIED = 'data_modified',
  DATA_DELETED = 'data_deleted',
  POLICY_VIOLATION = 'policy_violation',
  DEVICE_REGISTERED = 'device_registered',
  DEVICE_REVOKED = 'device_revoked',
}

/**
 * Create a new audit event
 * 
 * @param eventType - Type of event
 * @param userId - User ID who triggered the event
 * @param description - Event description
 * @param metadata - Additional event metadata
 * @returns Created AuditEvent
 */
export function createAuditEvent(
  eventType: string,
  userId: string,
  description: string,
  metadata: Record<string, any> = {}
): AuditEvent {
  return {
    id: generateEventId(),
    eventType,
    userId,
    description,
    timestamp: new Date(),
    severity: 'info',
    action: eventType,
    status: 'success',
    metadata,
    ipAddress: extractIpAddress(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
  };
}

/**
 * Generate a unique event ID
 */
function generateEventId(): string {
  // Audit event IDs must be non-guessable to preserve forensic integrity.
  return generateSecureId('evt');
}

/**
 * Extract IP address from request context
 * Note: In browser environment, this returns a placeholder
 */
function extractIpAddress(): string {
  // In a browser environment, we cannot get the client IP directly
  // This would typically be handled server-side
  return 'client';
}

/**
 * Create a login audit event
 * 
 * @param userId - User ID
 * @param method - Authentication method (e.g., 'password', 'oauth', 'mfa')
 * @param success - Whether login was successful
 * @param metadata - Additional metadata
 * @returns AuditEvent
 */
export function createLoginAuditEvent(
  userId: string,
  method: string,
  success: boolean = true,
  metadata: Record<string, any> = {}
): AuditEvent {
  return createAuditEvent(
    success ? AuditEventType.LOGIN : AuditEventType.LOGIN_FAILED,
    userId,
    `User ${success ? 'successfully logged in' : 'failed to login'} using ${method}`,
    { method, ...metadata }
  );
}

/**
 * Create a logout audit event
 * 
 * @param userId - User ID
 * @param reason - Logout reason (e.g., 'user_initiated', 'session_timeout', 'admin_revoked')
 * @param metadata - Additional metadata
 * @returns AuditEvent
 */
export function createLogoutAuditEvent(
  userId: string,
  reason: string = 'user_initiated',
  metadata: Record<string, any> = {}
): AuditEvent {
  return createAuditEvent(
    AuditEventType.LOGOUT,
    userId,
    `User logged out (${reason})`,
    { reason, ...metadata }
  );
}

/**
 * Create a password change audit event
 * 
 * @param userId - User ID
 * @param initiator - Who initiated the change ('user' or 'admin')
 * @param metadata - Additional metadata
 * @returns AuditEvent
 */
export function createPasswordChangeAuditEvent(
  userId: string,
  initiator: 'user' | 'admin' = 'user',
  metadata: Record<string, any> = {}
): AuditEvent {
  return createAuditEvent(
    AuditEventType.PASSWORD_CHANGED,
    userId,
    `Password ${initiator === 'user' ? 'changed by user' : 'changed by administrator'}`,
    { initiator, ...metadata }
  );
}

/**
 * Create an MFA event
 * 
 * @param userId - User ID
 * @param action - MFA action (enabled, disabled, verified, failed)
 * @param method - MFA method (totp, sms, email, etc.)
 * @param metadata - Additional metadata
 * @returns AuditEvent
 */
export function createMFAAuditEvent(
  userId: string,
  action: 'enabled' | 'disabled' | 'verified' | 'failed',
  method: string,
  metadata: Record<string, any> = {}
): AuditEvent {
  const eventTypeMap = {
    enabled: AuditEventType.MFA_ENABLED,
    disabled: AuditEventType.MFA_DISABLED,
    verified: AuditEventType.MFA_VERIFIED,
    failed: AuditEventType.MFA_FAILED,
  };

  return createAuditEvent(
    eventTypeMap[action],
    userId,
    `MFA ${action} using ${method}`,
    { action, method, ...metadata }
  );
}

/**
 * Create a permission change audit event
 * 
 * @param userId - User ID
 * @param targetUserId - User whose permissions are being changed
 * @param action - Permission action (granted or revoked)
 * @param permission - Permission identifier
 * @param reason - Reason for change
 * @param metadata - Additional metadata
 * @returns AuditEvent
 */
export function createPermissionAuditEvent(
  userId: string,
  targetUserId: string,
  action: 'granted' | 'revoked',
  permission: string,
  reason: string = '',
  metadata: Record<string, any> = {}
): AuditEvent {
  const eventType =
    action === 'granted'
      ? AuditEventType.PERMISSION_GRANTED
      : AuditEventType.PERMISSION_REVOKED;

  return createAuditEvent(
    eventType,
    userId,
    `Permission ${action} to ${targetUserId}: ${permission}`,
    { targetUserId, action, permission, reason, ...metadata }
  );
}

/**
 * Create an access denial audit event
 * 
 * @param userId - User ID
 * @param resource - Resource being accessed
 * @param reason - Reason for denial
 * @param metadata - Additional metadata
 * @returns AuditEvent
 */
export function createAccessDenialAuditEvent(
  userId: string,
  resource: string,
  reason: string = 'unauthorized',
  metadata: Record<string, any> = {}
): AuditEvent {
  return createAuditEvent(
    AuditEventType.ACCESS_DENIED,
    userId,
    `Access denied to ${resource}: ${reason}`,
    { resource, reason, ...metadata }
  );
}

/**
 * Create a data access audit event
 * 
 * @param userId - User ID
 * @param resource - Resource accessed
 * @param action - Data action (read, create, update, delete)
 * @param recordCount - Number of records accessed
 * @param metadata - Additional metadata
 * @returns AuditEvent
 */
export function createDataAuditEvent(
  userId: string,
  resource: string,
  action: 'read' | 'create' | 'update' | 'delete',
  recordCount: number = 1,
  metadata: Record<string, any> = {}
): AuditEvent {
  const actionMap = {
    read: AuditEventType.DATA_ACCESS,
    create: AuditEventType.DATA_MODIFIED,
    update: AuditEventType.DATA_MODIFIED,
    delete: AuditEventType.DATA_DELETED,
  };

  return createAuditEvent(
    actionMap[action],
    userId,
    `User ${action} ${recordCount} record(s) from ${resource}`,
    { resource, action, recordCount, ...metadata }
  );
}

/**
 * Create a suspicious activity audit event
 * 
 * @param userId - User ID or 'unknown' if not authenticated
 * @param activity - Description of suspicious activity
 * @param severity - Event severity
 * @param metadata - Additional metadata
 * @returns AuditEvent
 */
export function createSuspiciousActivityAuditEvent(
  userId: string,
  activity: string,
  severity: AuditSeverity = AuditSeverity.HIGH,
  metadata: Record<string, any> = {}
): AuditEvent {
  return createAuditEvent(
    AuditEventType.SUSPICIOUS_ACTIVITY,
    userId,
    `Suspicious activity detected: ${activity}`,
    { severity, ...metadata }
  );
}

/**
 * Filter audit events by criteria
 * 
 * @param events - Array of audit events
 * @param filters - Filter criteria
 * @returns Filtered audit events
 */
export function filterAuditEvents(
  events: AuditEvent[],
  filters: {
    userId?: string;
    eventType?: string;
    startDate?: Date;
    endDate?: Date;
    searchTerm?: string;
  }
): AuditEvent[] {
  return events.filter((event) => {
    if (filters.userId && event.userId !== filters.userId) {
      return false;
    }

    if (filters.eventType && event.eventType !== filters.eventType) {
      return false;
    }

    if (filters.startDate && event.timestamp < filters.startDate) {
      return false;
    }

    if (filters.endDate && event.timestamp > filters.endDate) {
      return false;
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      const matchesDescription = event.description.toLowerCase().includes(term);
      const matchesUserId = (event.userId || '').toLowerCase().includes(term);
      const matchesEventType = event.eventType.toLowerCase().includes(term);

      if (!matchesDescription && !matchesUserId && !matchesEventType) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sort audit events by timestamp
 * 
 * @param events - Array of audit events
 * @param order - Sort order ('asc' or 'desc')
 * @returns Sorted audit events
 */
export function sortAuditEvents(
  events: AuditEvent[],
  order: 'asc' | 'desc' = 'desc'
): AuditEvent[] {
  return [...events].sort((a, b) => {
    const timeA = a.timestamp.getTime();
    const timeB = b.timestamp.getTime();
    return order === 'asc' ? timeA - timeB : timeB - timeA;
  });
}

/**
 * Group audit events by date
 * 
 * @param events - Array of audit events
 * @returns Events grouped by date
 */
export function groupAuditEventsByDate(
  events: AuditEvent[]
): Map<string, AuditEvent[]> {
  const grouped = new Map<string, AuditEvent[]>();

  for (const event of events) {
    const dateKey = event.timestamp.toISOString().split('T')[0];
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey)!.push(event);
  }

  return grouped;
}

/**
 * Get audit event statistics
 * 
 * @param events - Array of audit events
 * @returns Event statistics
 */
export function getAuditEventStats(events: AuditEvent[]): {
  total: number;
  byType: Record<string, number>;
  byUser: Record<string, number>;
  dateRange: { start: Date; end: Date } | null;
} {
  const stats = {
    total: events.length,
    byType: {} as Record<string, number>,
    byUser: {} as Record<string, number>,
    dateRange: null as { start: Date; end: Date } | null,
  };

  if (events.length === 0) {
    return stats;
  }

  for (const event of events) {
    // Count by type
    stats.byType[event.eventType] = (stats.byType[event.eventType] || 0) + 1;

    // Count by user
    if (event.userId) {
      stats.byUser[event.userId] = (stats.byUser[event.userId] || 0) + 1;
    }
  }

  // Get date range
  const timestamps = events.map((e) => e.timestamp.getTime());
  stats.dateRange = {
    start: new Date(Math.min(...timestamps)),
    end: new Date(Math.max(...timestamps)),
  };

  return stats;
}

/**
 * Format audit event for display
 * 
 * @param event - Audit event to format
 * @returns Formatted event string
 */
export function formatAuditEvent(event: AuditEvent): string {
  const timestamp = event.timestamp.toLocaleString();
  const userId = event.userId || 'system';
  return `[${timestamp}] ${userId} - ${event.eventType}: ${event.description}`;
}

/**
 * Export audit events to CSV format
 * 
 * @param events - Array of audit events
 * @returns CSV string
 */
export function exportAuditEventsToCSV(events: AuditEvent[]): string {
  const headers = [
    'Event ID',
    'Timestamp',
    'User ID',
    'Event Type',
    'Description',
    'IP Address',
    'User Agent',
  ];

  const rows = events.map((event) => [
    event.id,
    event.timestamp.toISOString(),
    event.userId || '',
    event.eventType,
    `"${event.description.replace(/"/g, '""')}"`,
    event.ipAddress || '',
    `"${(event.userAgent || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  return csvContent;
}

/**
 * Check if event indicates suspicious behavior
 * 
 * @param event - Audit event
 * @returns true if event is suspicious, false otherwise
 */
export function isSuspiciousEvent(event: AuditEvent): boolean {
  const suspiciousTypes = [
    AuditEventType.LOGIN_FAILED,
    AuditEventType.MFA_FAILED,
    AuditEventType.ACCESS_DENIED,
    AuditEventType.SUSPICIOUS_ACTIVITY,
    AuditEventType.POLICY_VIOLATION,
  ];

  return suspiciousTypes.includes(event.eventType as AuditEventType);
}
