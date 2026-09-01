/**
 * SecurityBanner Component
 * 
 * Prominent banner to display security alerts and status messages.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';

export type SecuritySeverity = 'info' | 'warning' | 'danger' | 'success';

export interface SecurityBannerProps {
  [key: string]: any;
  /**
   * Banner message
   */
  message: string;
  /**
   * Severity level
   */
  severity?: SecuritySeverity;
  /**
   * Banner title
   */
  title?: string;
  /**
   * Whether banner is dismissible
   */
  dismissible?: boolean;
  /**
   * Callback when dismissed
   */
  onDismiss?: () => void;
  /**
   * Action button label
   */
  actionLabel?: string;
  /**
   * Action button callback
   */
  onAction?: () => void;
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
}

const getSeverityStyles = (severity: SecuritySeverity) => {
  const styles = {
    info: { bg: 'info', border: 'info', text: 'info' },
    warning: { bg: 'warning', border: 'warning', text: 'warning' },
    danger: { bg: 'danger', border: 'danger', text: 'danger' },
    success: { bg: 'success', border: 'success', text: 'success' },
  };
  return styles[severity];
};

const getDefaultIcon = (severity: SecuritySeverity) => {
  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    danger: '🚨',
    success: '✓',
  };
  return icons[severity];
};

/**
 * SecurityBanner - Display security alert or status banner
 */
export const SecurityBanner: React.FC<SecurityBannerProps> = ({
  message,
  severity = 'warning',
  title,
  dismissible = true,
  onDismiss,
  actionLabel,
  onAction,
  icon,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const styles = getSeverityStyles(severity);
  const displayIcon = icon || getDefaultIcon(severity);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <div
      style={{
        padding: '1rem',
        backgroundColor: `var(--color-${styles.bg}-light, #f0f0f0)`,
        borderRadius: '0.375rem',
        border: `2px solid var(--color-${styles.border}, #ccc)`,
        borderLeft: `4px solid var(--color-${styles.border}, #ccc)`,
        marginBottom: '1.5rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
          <div style={{ fontSize: '1.125rem', flex: 0 }}>
            {displayIcon}
          </div>
          <div style={{ flex: 1 }}>
            {title && (
              <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem', color: `var(--color-${styles.text}, #333)` }}>
                {title}
              </span>
            )}
            <span style={{ display: 'block', fontSize: '0.875rem', color: `var(--color-${styles.text}, #333)` }}>
              {message}
            </span>

            {actionLabel && onAction && (
              <div style={{ marginTop: '0.5rem' }}>
                <Button
                  variant="primary"
                  onClick={onAction}
                >
                  {actionLabel}
                </Button>
              </div>
            )}
          </div>
        </div>

        {dismissible && (
          <Button
            variant="ghost"
            onClick={handleDismiss}
          >
            ✕
          </Button>
        )}
      </div>
    </div>
  );
};

SecurityBanner.displayName = 'SecurityBanner';

export default SecurityBanner;
