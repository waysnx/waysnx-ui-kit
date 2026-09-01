/**
 * AuthorizationProvider
 *
 * Context provider for authorization and permission management
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { AuthorizationService } from '../services/AuthorizationService';
import type { PermissionDefinition, RoleDefinition } from '../types/authorization';

export interface AuthorizationContextValue {
  roles: RoleDefinition[];
  permissions: PermissionDefinition[];
  canAccess: (resourceId: string, action?: string) => boolean;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
  canPerformAction: (action: string, resource?: string) => boolean;
  isFeatureEnabled: (featureId: string) => boolean;
  refreshPermissions: () => Promise<void>;
}

const AuthorizationContext = createContext<AuthorizationContextValue | undefined>(
  undefined
);

export interface AuthorizationProviderProps {
  children: ReactNode;
  authorizationService: AuthorizationService;
  initialRoles?: RoleDefinition[];
  initialPermissions?: PermissionDefinition[];
  onPermissionsChange?: (permissions: PermissionDefinition[]) => void;
}

/**
 * AuthorizationProvider - Manages authorization and permissions
 */
export const AuthorizationProvider: React.FC<AuthorizationProviderProps> = ({
  children,
  authorizationService: _authorizationService,
  initialRoles = [],
  initialPermissions = [],
  onPermissionsChange,
}) => {
  const [roles, _setRoles] = useState<RoleDefinition[]>(initialRoles);
  const [permissions, _setPermissions] = useState<PermissionDefinition[]>(initialPermissions);

  const canAccess = useCallback(
    (resourceId: string, action?: string) => {
      return permissions.some(p => p.resource === resourceId && (!action || p.action === action));
    },
    [permissions]
  );

  const hasRole = useCallback(
    (role: string) => {
      return roles.some(r => r.id === role || r.name === role);
    },
    [roles]
  );

  const hasPermission = useCallback(
    (permission: string) => {
      return permissions.some(p => p.id === permission || p.action === permission);
    },
    [permissions]
  );

  const canPerformAction = useCallback(
    (action: string, resource?: string) => {
      return permissions.some(p => p.action === action && (!resource || p.resource === resource || resource === '*'));
    },
    [permissions]
  );

  const isFeatureEnabled = useCallback(
    (_featureId: string) => {
      // Feature flag evaluation - returns false by default without server context
      return false;
    },
    []
  );

  const refreshPermissions = useCallback(async () => {
    try {
      // Call service to refresh permissions from server
      onPermissionsChange?.(permissions);
    } catch (error) {
      console.error('Failed to refresh permissions:', error);
    }
  }, [permissions, onPermissionsChange]);

  const value: AuthorizationContextValue = {
    roles,
    permissions,
    canAccess,
    hasRole,
    hasPermission,
    canPerformAction,
    isFeatureEnabled,
    refreshPermissions,
  };

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
};

/**
 * useAuthorization - Hook to access authorization context
 */
export const useAuthorization = (): AuthorizationContextValue => {
  const context = useContext(AuthorizationContext);

  if (!context) {
    throw new Error('useAuthorization must be used within AuthorizationProvider');
  }

  return context;
};

export default AuthorizationProvider;
