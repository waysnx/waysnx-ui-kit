/**
 * RoleGate Component
 * 
 * Gate component that conditionally renders children based on user roles.
 * Useful for role-based access control (RBAC).
 */

import React, { ReactNode } from 'react';


export interface RoleGateProps {
  /**
   * Role(s) required to view children
   */
  role: string | string[];
  /**
   * User's current roles
   */
  userRoles: string[];
  /**
   * Content to render if role matches
   */
  children: ReactNode;
  /**
   * Content to render if role doesn't match
   */
  fallback?: ReactNode;
  /**
   * Require all roles (and) or any role (or)
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
 * Check if user has required roles
 */
const hasRequiredRoles = (
  requiredRoles: string[],
  userRoles: string[],
  requireAll: boolean
): boolean => {
  if (requireAll) {
    return requiredRoles.every(role => userRoles.includes(role));
  }
  return requiredRoles.some(role => userRoles.includes(role));
};

/**
 * RoleGate - Gate component for role-based access control
 */
export const RoleGate: React.FC<RoleGateProps> = ({
  role,
  userRoles,
  children,
  fallback,
  requireAll = false,
  unmountOnDeny = true,
  className,
}) => {
  const requiredRoles = Array.isArray(role) ? role : [role];
  const hasAccess = hasRequiredRoles(requiredRoles, userRoles, requireAll);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (unmountOnDeny) {
    return null;
  }

  return (
    <div className={className} role="status" aria-label="Role denied">
      {fallback || (
        <span style={{ color: 'var(--wx-color-danger, #d4183d)', fontSize: '0.875rem' }}>
          Your role doesn&apos;t have access to this content.
        </span>
      )}
    </div>
  );
};

RoleGate.displayName = 'RoleGate';

export default RoleGate;
