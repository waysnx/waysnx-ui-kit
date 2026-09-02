/**
 * SecurityStatusCard Component
 * 
 * Card displaying security status with icon and action.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';
import { Badge } from '@waysnx/ui-feedback';

export type StatusType = 'secure' | 'warning' | 'critical' | 'info';

export interface SecurityStatusCardProps {
  /**
   * Status title
   */
  title: string;
  /**
   * Status description
   */
  description?: string;
  /**
   * Current status
   */
  status?: StatusType;
  /**
   * Status value/percentage
   */
  value?: string | number;
  /**
   * Status label
   */
  label?: string;
  /**
   * Action button label
   */
  actionLabel?: string;
  /**
   * Action button callback
   */
  onAction?: () => void;
  /**
   * Card icon
   */
  icon?: React.ReactNode;
}

const getStatusStyles = (status: StatusType) => {
  const styles = {
    secure: { color: 'success', icon: 'âœ“' },
    warning: { color: 'warning', icon: 'âš ï¸' },
    critical: { color: 'danger', icon: 'ðŸš¨' },
    info: { color: 'info', icon: 'â„¹ï¸' },
  };
  return styles[status];
};

/**
 * SecurityStatusCard - Individual security status card
 */
export const SecurityStatusCard: React.FC<SecurityStatusCardProps> = ({
  title,
  description,
  status = 'info',
  value,
  label,
  actionLabel,
  onAction,
  icon,
}) => {
  const styles = getStatusStyles(status);
  const displayIcon = icon || styles.icon;

  return (
    <div
      style={{
        padding: '1.5rem',
        backgroundColor: 'var(--color-background-alt, #f9f9f9)',
        borderRadius: '0.375rem',
        border: '1px solid var(--color-border, #ccc)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.125rem' }}>{displayIcon}</span>
            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {title}
            </span>
          </div>
          {description && (
            <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-muted, #666)' }}>
              {description}
            </span>
          )}
        </div>
        <Badge color={styles.color}>
          {label || status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      {value !== undefined && (
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--color-background, #fff)',
            borderRadius: '0.375rem',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: `var(--color-${styles.color}, #333)` }}>
            {value}
          </span>
        </div>
      )}

      {actionLabel && onAction && (
        <Button
          variant="outline"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

SecurityStatusCard.displayName = 'SecurityStatusCard';

export default SecurityStatusCard;
