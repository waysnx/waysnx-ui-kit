/**
 * SecurityAlert Component
 * 
 * Card displaying individual security alert with actions.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';
import { Badge } from '@waysnx/ui-feedback';

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlertStatus = 'new' | 'acknowledged' | 'resolved';

export interface SecurityAlertProps {
  title: string;
  description: string;
  severity?: AlertSeverity;
  status?: AlertStatus;
  timestamp?: Date;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  details?: Record<string, string>;
}

type BadgeColor = 'default' | 'success' | 'error' | 'warning' | 'info';

const getSeverityColor = (severity: AlertSeverity): BadgeColor => {
  const colors: Record<AlertSeverity, BadgeColor> = { critical: 'error', high: 'error', medium: 'warning', low: 'info' };
  return colors[severity];
};

const getSeverityIcon = (severity: AlertSeverity) => {
  const icons = { critical: '!', high: '⚠', medium: '⚠', low: 'i' };
  return icons[severity];
};

const getStatusBadgeColor = (status: AlertStatus): BadgeColor => {
  const colors: Record<AlertStatus, BadgeColor> = { new: 'error', acknowledged: 'warning', resolved: 'success' };
  return colors[status];
};

export const SecurityAlert: React.FC<SecurityAlertProps> = ({
  title, description, severity = 'medium', status = 'new',
  timestamp, actionLabel, onAction, onDismiss, details,
}) => {
  const severityColor = getSeverityColor(severity);
  const severityIcon = getSeverityIcon(severity);
  const statusColor = getStatusBadgeColor(status);

  return (
    <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-background-alt, #f9f9f9)', borderRadius: '0.375rem', border: `2px solid var(--color-${severityColor}, #ccc)`, borderLeft: `4px solid var(--color-${severityColor}, #ccc)`, marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
          <div style={{ fontSize: '1.125rem' }}>{severityIcon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{title}</span>
              <Badge color={statusColor}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
            </div>
            <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-muted, #666)' }}>{description}</span>
          </div>
        </div>
      </div>

      {timestamp && (
        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-muted, #666)', marginBottom: '1rem' }}>
          {timestamp.toLocaleString()}
        </span>
      )}

      {details && Object.keys(details).length > 0 && (
        <div style={{ padding: '1rem', backgroundColor: 'var(--color-background, #fff)', borderRadius: '0.375rem', marginBottom: '1rem' }}>
          {Object.entries(details).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-muted, #666)' }}>{key}:</span>
              <span style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>{value}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        {onDismiss && (<Button variant="outline" onClick={onDismiss}>Dismiss</Button>)}
        {actionLabel && onAction && (<Button variant="primary" onClick={onAction}>{actionLabel}</Button>)}
      </div>
    </div>
  );
};

SecurityAlert.displayName = 'SecurityAlert';
export default SecurityAlert;
