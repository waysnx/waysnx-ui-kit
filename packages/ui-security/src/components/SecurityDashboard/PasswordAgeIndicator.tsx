/**
 * PasswordAgeIndicator Component
 * 
 * Display password age and recommend change.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';
import { Badge } from '@waysnx/ui-feedback';

export interface PasswordAgeIndicatorProps {
  lastChangedDate?: Date;
  recommendChangeDaysThreshold?: number;
  onChangePassword?: () => void;
  showAction?: boolean;
}

const getPasswordAgeStatus = (daysOld: number, threshold: number) => {
  if (daysOld < threshold * 0.5) return { status: 'good', color: 'success' as const };
  if (daysOld < threshold) return { status: 'warning', color: 'warning' as const };
  return { status: 'expired', color: 'error' as const };
};

export const PasswordAgeIndicator: React.FC<PasswordAgeIndicatorProps> = ({
  lastChangedDate, recommendChangeDaysThreshold = 90, onChangePassword, showAction = true,
}) => {
  const getDaysOld = () => {
    if (!lastChangedDate) return null;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastChangedDate.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysOld = getDaysOld();
  const ageStatus = daysOld !== null ? getPasswordAgeStatus(daysOld, recommendChangeDaysThreshold) : null;

  return (
    <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-background-alt, #f9f9f9)', borderRadius: '0.375rem', border: '1px solid var(--color-border, #ccc)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>Password Age</span>
        {ageStatus && <Badge color={ageStatus.color}>{ageStatus.status}</Badge>}
      </div>

      {daysOld !== null ? (
        <>
          <div style={{ padding: '1rem', backgroundColor: 'var(--color-background, #fff)', borderRadius: '0.375rem', marginBottom: '1rem', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '1.125rem', fontWeight: 'bold' }}>{daysOld} days</span>
            <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-muted, #666)' }}>{lastChangedDate?.toLocaleDateString()}</span>
          </div>

          {daysOld >= recommendChangeDaysThreshold && (
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-warning, #fff3cd)', borderRadius: '0.375rem', marginBottom: '1rem', borderLeft: '4px solid var(--color-warning, #ffc107)' }}>
              <span style={{ fontSize: '0.875rem' }}>
                ⚠ Your password is{' '}
                {daysOld >= recommendChangeDaysThreshold * 1.5 ? 'significantly' : ''} overdue for a change.
              </span>
            </div>
          )}

          {showAction && onChangePassword && (
            <Button variant="outline" onClick={onChangePassword}>Change Password</Button>
          )}
        </>
      ) : (
        <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-muted, #666)', textAlign: 'center' }}>
          No password change history
        </span>
      )}
    </div>
  );
};

PasswordAgeIndicator.displayName = 'PasswordAgeIndicator';
export default PasswordAgeIndicator;
