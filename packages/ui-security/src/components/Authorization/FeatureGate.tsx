/**
 * FeatureGate Component
 * 
 * Gate component for feature flag-based rendering.
 * Useful for feature toggles, A/B testing, and gradual rollouts.
 */

import React, { ReactNode } from 'react';


export interface FeatureGateProps {
  /**
   * Feature flag identifier
   */
  featureId: string;
  /**
   * Whether feature is enabled
   */
  isEnabled: boolean;
  /**
   * Content to render if feature is enabled
   */
  children: ReactNode;
  /**
   * Content to render if feature is disabled
   */
  fallback?: ReactNode;
  /**
   * Whether to completely remove from DOM (vs just hiding)
   */
  unmountOnDisable?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * FeatureGate - Gate component for feature flag-based access control
 */
export const FeatureGate: React.FC<FeatureGateProps> = ({
  featureId,
  isEnabled,
  children,
  fallback,
  unmountOnDisable = true,
  className,
}) => {
  if (isEnabled) {
    return <>{children}</>;
  }

  if (unmountOnDisable) {
    return null;
  }

  return (
    <div
      className={className}
      role="status"
      aria-label={`Feature ${featureId} is disabled`}
    >
      {fallback || (
        <span style={{ color: 'var(--wx-color-text-muted, #717182)', fontSize: '0.875rem' }}>
          This feature is not available yet.
        </span>
      )}
    </div>
  );
};

FeatureGate.displayName = 'FeatureGate';

export default FeatureGate;
