/**
 * SecurityLogsPanel Component
 * 
 * View and export security logs.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface SecurityLogsPanelProps {
  onViewLogs?: () => void;
  onExportLogs?: (format: string) => void;
}

export const SecurityLogsPanel: React.FC<SecurityLogsPanelProps> = ({
  onViewLogs,
  onExportLogs,
}) => {
  return (
    <div>
      <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Security Logs
      </span>

      <Stack gap="md">
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-background-alt, #f9f9f9)', borderRadius: '0.375rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-muted, #666)' }}>
            View detailed security logs and export for compliance purposes.
          </span>
        </div>

        <Button variant="primary" onClick={onViewLogs}>
          View Logs
        </Button>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="outline" style={{ flex: 1 }} onClick={() => onExportLogs?.('csv')}>
            Export CSV
          </Button>
          <Button variant="outline" style={{ flex: 1 }} onClick={() => onExportLogs?.('json')}>
            Export JSON
          </Button>
        </div>
      </Stack>
    </div>
  );
};

SecurityLogsPanel.displayName = 'SecurityLogsPanel';
export default SecurityLogsPanel;
