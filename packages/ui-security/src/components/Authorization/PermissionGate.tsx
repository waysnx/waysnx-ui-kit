/**
 * PermissionGate Component
 * 
 * Gate component that conditionally renders children based on user permissions.
 * Useful for showing/hiding UI elements based on granular permissions.
 */

import React, { ReactNode } from 'react';


export interface PermissionGateProps {
  [key: string]: any;
  /**
   * Permission required to view children
   */
  permission: string | string[];
  /**
   * Whether user has the permission
   */
  hasPermission: boolean;
  /**
   * Content to render if permission is granted
   */
  children: ReactNode;
  /**
   * Content to render if permission is denied
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
 * PermissionGate - Gate component for permission-based access control
 */
export const PermissionGate: React.FC<PermissionGateProps> = ({
  permission: _permission,
  hasPermission,
  children,
  fallback,
  unmountOnDeny = true,
  className,
}) => {
  if (hasPermission) {
    return <>{children}</>;
  }

  if (unmountOnDeny) {
    return null;
  }

  return (
    <div className={className} role="status" aria-label="Permission denied">
      {fallback || (
        <span color="error" fontSize="sm">
          You don't have permission to access this content.
        </span>
      )}
    </div>
  );
};

PermissionGate.displayName = 'PermissionGate';

export default PermissionGate;
