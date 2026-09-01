/**
 * MFASettingsPanel Component
 * 
 * MFA configuration panel with method management.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface MFASettingsPanelProps {
  [key: string]: any;
  onSetupMFA?: () => void;
  onManageBackupCodes?: () => void;
}

export const MFASettingsPanel: React.FC<MFASettingsPanelProps> = ({
  onSetupMFA,
  onManageBackupCodes,
}) => {
  return (
    <div>
      <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Multi-Factor Authentication Settings
      </span>

      <Stack gap="md">
        <Button variant="primary" onClick={onSetupMFA}>
          Setup MFA Methods
        </Button>
        <Button variant="outline" onClick={onManageBackupCodes}>
          Manage Backup Codes
        </Button>
      </Stack>
    </div>
  );
};

MFASettingsPanel.displayName = 'MFASettingsPanel';
export default MFASettingsPanel;
