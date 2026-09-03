/**
 * EncryptionBadge Component
 * 
 * Badge showing encryption status.
 */

import React from 'react';
import { Badge } from '@waysnx/ui-feedback';

export type EncryptionStatus = 'encrypted' | 'unencrypted' | 'partial';

export interface EncryptionBadgeProps {
  /**
   * Encryption status
   */
  status?: EncryptionStatus;
  /**
   * Encryption method (e.g., 'AES-256')
   */
  method?: string;
  /**
   * Show detailed tooltip
   */
  showDetails?: boolean;
}

type BadgeColor = 'default' | 'success' | 'error' | 'warning' | 'info';

const getStatusColor = (status: EncryptionStatus): BadgeColor => {
  const colors: Record<EncryptionStatus, BadgeColor> = {
    encrypted: 'success',
    partial: 'warning',
    unencrypted: 'error',
  };
  return colors[status];
};

const getStatusIcon = (status: EncryptionStatus) => {
  const icons = {
    encrypted: '[lock]',
    partial: '⚠',
    unencrypted: '[key]',
  };
  return icons[status];
};

const getStatusLabel = (status: EncryptionStatus) => {
  const labels = {
    encrypted: 'Encrypted',
    partial: 'Partially Encrypted',
    unencrypted: 'Not Encrypted',
  };
  return labels[status];
};

/**
 * EncryptionBadge - Display encryption status
 */
export const EncryptionBadge: React.FC<EncryptionBadgeProps> = ({
  status = 'encrypted',
  method = 'AES-256-GCM',
  showDetails = false,
}) => {
  const color = getStatusColor(status);
  const icon = getStatusIcon(status);
  const label = getStatusLabel(status);

  return (
    <div>
      <Badge color={color}>
        {icon} {label}
      </Badge>

      {showDetails && (
        <div
          style={{
            padding: '0.5rem',
            backgroundColor: 'var(--color-background-alt, #f9f9f9)',
            borderRadius: '0.375rem',
            marginTop: '0.5rem',
            fontSize: '0.75rem',
          }}
        >
          <span style={{ color: 'var(--color-muted, #666)' }}>
            Method: {method}
          </span>
        </div>
      )}
    </div>
  );
};

EncryptionBadge.displayName = 'EncryptionBadge';

export default EncryptionBadge;
