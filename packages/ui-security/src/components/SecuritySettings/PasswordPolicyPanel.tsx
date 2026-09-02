/**
 * PasswordPolicyPanel Component
 * 
 * Display and manage password policy settings.
 */

import React from 'react';
import { Button, Checkbox } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface PasswordPolicyPanelProps {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
  onSave?: (policy: any) => void;
}

export const PasswordPolicyPanel: React.FC<PasswordPolicyPanelProps> = ({
  minLength = 12, requireUppercase = true, requireLowercase = true,
  requireNumbers = true, requireSpecialChars = true, onSave,
}) => {
  const [policy, setPolicy] = React.useState({
    minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars,
  });

  return (
    <div>
      <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Password Policy
      </span>

      <Stack gap="lg">
        <div>
          <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Minimum Length: {policy.minLength}
          </span>
          <input type="range" min="8" max="32" value={policy.minLength}
            onChange={(e: any) => setPolicy({ ...policy, minLength: parseInt(e.target.value) })}
            style={{ width: '100%' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Checkbox checked={policy.requireUppercase} onChange={(e: any) => setPolicy({ ...policy, requireUppercase: e.target.checked })} />
          <span style={{ fontSize: '0.875rem' }}>Require uppercase letters (A-Z)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Checkbox checked={policy.requireLowercase} onChange={(e: any) => setPolicy({ ...policy, requireLowercase: e.target.checked })} />
          <span style={{ fontSize: '0.875rem' }}>Require lowercase letters (a-z)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Checkbox checked={policy.requireNumbers} onChange={(e: any) => setPolicy({ ...policy, requireNumbers: e.target.checked })} />
          <span style={{ fontSize: '0.875rem' }}>Require numbers (0-9)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Checkbox checked={policy.requireSpecialChars} onChange={(e: any) => setPolicy({ ...policy, requireSpecialChars: e.target.checked })} />
          <span style={{ fontSize: '0.875rem' }}>Require special characters (!@#$%^&*)</span>
        </div>
      </Stack>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
        <Button variant="primary" onClick={() => onSave?.(policy)}>Save Policy</Button>
        <Button variant="outline" onClick={() => setPolicy({ minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars })}>
          Reset
        </Button>
      </div>
    </div>
  );
};

PasswordPolicyPanel.displayName = 'PasswordPolicyPanel';
export default PasswordPolicyPanel;
