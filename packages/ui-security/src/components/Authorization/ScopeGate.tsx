/**
 * ScopeGate Component
 * 
 * Gate component for OAuth/OIDC scope-based access control.
 * Useful for API scope verification.
 */

import React, { ReactNode } from 'react';


export interface ScopeGateProps {
  /**
   * Scope(s) required
   */
  scope: string | string[];
  /**
   * User's granted scopes
   */
  grantedScopes: string[];
  /**
   * Content to render if scope is granted
   */
  children: ReactNode;
  /**
   * Content to render if scope is denied
   */
  fallback?: ReactNode;
  /**
   * Require all scopes (and) or any scope (or)
   */
  requireAll?: boolean;
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
 * Check if user has required scopes
 */
const hasRequiredScopes = (
  requiredScopes: string[],
  grantedScopes: string[],
  requireAll: boolean
): boolean => {
  if (requireAll) {
    return requiredScopes.every(scope => grantedScopes.includes(scope));
  }
  return requiredScopes.some(scope => grantedScopes.includes(scope));
};

/**
 * ScopeGate - Gate component for scope-based access control
 */
export const ScopeGate: React.FC<ScopeGateProps> = ({
  scope,
  grantedScopes,
  children,
  fallback,
  requireAll = false,
  unmountOnDeny = true,
  className,
}) => {
  const requiredScopes = Array.isArray(scope) ? scope : [scope];
  const hasAccess = hasRequiredScopes(requiredScopes, grantedScopes, requireAll);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (unmountOnDeny) {
    return null;
  }

  return (
    <div className={className} role="status" aria-label="Scope denied">
      {fallback || (
        <span color="error" fontSize="sm">
          Required permissions not granted.
        </span>
      )}
    </div>
  );
};

ScopeGate.displayName = 'ScopeGate';

export default ScopeGate;
