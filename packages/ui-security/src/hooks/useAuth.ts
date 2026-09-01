/**
 * useAuth Hook
 *
 * Combined hook for authentication and authorization
 */

import { useCallback, useMemo } from 'react';
import { useAuthentication } from '../providers/AuthenticationProvider';
import { useAuthorization } from '../providers/AuthorizationProvider';
import { useSession } from '../providers/SessionProvider';

/**
 * useAuth - Combined hook for auth operations
 *
 * Returns authentication state, authorization permissions, and session info
 */
export const useAuth = () => {
  const auth = useAuthentication();
  const authz = useAuthorization();
  const session = useSession();

  const isLoggedIn = useMemo(() => {
    return auth.isAuthenticated && auth.user !== null;
  }, [auth.isAuthenticated, auth.user]);

  const canAccess = useCallback(
    (resource: string, action?: string) => {
      if (!isLoggedIn) return false;
      return authz.canAccess(resource, action);
    },
    [isLoggedIn, authz]
  );

  const requireRole = useCallback(
    (role: string | string[]) => {
      if (!isLoggedIn) return false;

      const roles = Array.isArray(role) ? role : [role];
      return roles.some(r => authz.hasRole(r));
    },
    [isLoggedIn, authz]
  );

  const requirePermission = useCallback(
    (permission: string | string[]) => {
      if (!isLoggedIn) return false;

      const permissions = Array.isArray(permission) ? permission : [permission];
      return permissions.some(p => authz.hasPermission(p));
    },
    [isLoggedIn, authz]
  );

  return {
    // Authentication
    user: auth.user,
    isLoggedIn,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    login: auth.login,
    logout: auth.logout,
    register: auth.register,
    updatePassword: auth.updatePassword,

    // Authorization
    canAccess,
    requireRole,
    requirePermission,
    hasPermission: authz.hasPermission,
    hasRole: authz.hasRole,
    isFeatureEnabled: authz.isFeatureEnabled,

    // Session
    currentSession: session.currentSession,
    isIdle: session.isIdle,
    idleTimeRemaining: session.idleTimeRemaining,
    extendSession: session.extendSession,
    markActivity: session.markActivity,
  };
};

export default useAuth;
