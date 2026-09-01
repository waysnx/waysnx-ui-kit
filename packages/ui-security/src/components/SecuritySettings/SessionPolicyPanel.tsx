/**
 * SessionPolicyPanel Component
 * 
 * Session timeout and policy management.
 */

import React from 'react';
import { Button, Checkbox } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface SessionPolicyPanelProps {
  [key: string]: any;
  sessionTimeoutMinutes?: number;
  onSave?: (config: any) => void;
}

export const SessionPolicyPanel: React.FC<SessionPolicyPanelProps> = ({
  sessionTimeoutMinutes = 30,
  onSave,
}) => {
  const [timeout, setTimeout] = React.useState(sessionTimeoutMinutes);
  const [requireMFAReauth, setRequireMFAReauth] = React.useState(false);

  return (
    <div>
      <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Session Policy
      </span>

      <Stack gap="lg">
        <div>
          <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Idle Timeout: {timeout} minutes
          </span>
          <input
            type="range"
            min="5"
            max="480"
            step="5"
            value={timeout}
            onChange={(e: any) => setTimeout(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Checkbox checked={requireMFAReauth} onChange={(e: any) => setRequireMFAReauth(e.target.checked)} />
          <span style={{ fontSize: '0.875rem' }}>Require MFA re-authentication for sensitive operations</span>
        </div>
      </Stack>

      <div style={{ marginTop: '1.5rem' }}>
        <Button variant="primary" onClick={() => onSave?.({ sessionTimeoutMinutes: timeout, requireMFAReauth })}>
          Save Policy
        </Button>
      </div>
    </div>
  );
};

SessionPolicyPanel.displayName = 'SessionPolicyPanel';
export default SessionPolicyPanel;
