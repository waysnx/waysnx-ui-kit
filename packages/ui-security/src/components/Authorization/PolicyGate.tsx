/**
 * PolicyGate Component
 * 
 * Gate component for policy-based access control.
 * Supports complex access policies with conditions.
 */

import React, { ReactNode } from 'react';


export interface PolicyGateProps {
  /**
   * Policy identifier
   */
  policyId: string;
  /**
   * Whether policy evaluation passed
   */
  isPolicyMet: boolean;
  /**
   * Policy evaluation details
   */
  policyDetails?: {
    description?: string;
    reason?: string;
  };
  /**
   * Content to render if policy is met
   */
  children: ReactNode;
  /**
   * Content to render if policy is not met
   */
  fallback?: ReactNode;
  /**
   * Whether to completely remove from DOM (vs just hiding)
   */
  unmountOnDeny?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * PolicyGate - Gate component for policy-based access control
 */
export const PolicyGate: React.FC<PolicyGateProps> = ({
  policyId,
  isPolicyMet,
  policyDetails,
  children,
  fallback,
  unmountOnDeny = true,
  className,
}) => {
  if (isPolicyMet) {
    return <>{children}</>;
  }

  if (unmountOnDeny) {
    return null;
  }

  return (
    <div className={className} role="status" aria-label={`Policy ${policyId} not met`}>
      {fallback || (
        <div>
          <span style={{ display: 'block', color: 'var(--wx-color-danger, #d4183d)', fontSize: '0.875rem', fontWeight: 500 }}>
            Access Denied
          </span>
          {policyDetails?.reason && (
            <span style={{ display: 'block', color: 'var(--wx-color-text-muted, #717182)', fontSize: '0.75rem' }}>
              {policyDetails.reason}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

PolicyGate.displayName = 'PolicyGate';

export default PolicyGate;
