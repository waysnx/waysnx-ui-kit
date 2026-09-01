/**
 * TrustedDevicesPanel Component
 * 
 * Manage trusted devices and their access.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface TrustedDevicesPanelProps {
  [key: string]: any;
  onViewDevices?: () => void;
  onRevokeDevice?: (deviceId: string) => void;
}

export const TrustedDevicesPanel: React.FC<TrustedDevicesPanelProps> = ({
  onViewDevices,
  onRevokeDevice,
}) => {
  return (
    <div>
      <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Trusted Devices
      </span>

      <Stack gap="md">
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-background-alt, #f9f9f9)', borderRadius: '0.375rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-muted, #666)' }}>
            Manage devices that you trust and those that don't require MFA verification.
          </span>
        </div>

        <Button variant="primary" onClick={onViewDevices}>
          View & Manage Devices
        </Button>
      </Stack>
    </div>
  );
};

TrustedDevicesPanel.displayName = 'TrustedDevicesPanel';
export default TrustedDevicesPanel;
