/**
 * Permission and Authorization Utilities
 * 
 * Provides utilities for permission checking, role validation, and feature flag evaluation.
 * Follows the principle of least privilege with secure defaults.
 */

import type { Permission, Role, AuthorizationContext } from '../types';

/**
 * Check if a user has a specific permission
 * 
 * @param userPermissions - Array of permissions the user has
 * @param requiredPermission - Permission to check for
 * @returns true if user has the permission, false otherwise
 */
export function hasPermission(
  userPermissions: Permission[],
  requiredPermission: Permission
): boolean {
  if (!userPermissions || !requiredPermission) {
    return false;
  }

  return userPermissions.some((perm) => {
    // Exact match
    if (perm.id === requiredPermission.id) {
      return true;
    }

    // Wildcard matching (e.g., "users:*" matches "users:read", "users:write")
    if (perm.id.endsWith(':*')) {
      const prefix = perm.id.slice(0, -2);
      return requiredPermission.id.startsWith(prefix);
    }

    return false;
  });
}

/**
 * Check if a user has multiple permissions (AND operation)
 * 
 * @param userPermissions - Array of permissions the user has
 * @param requiredPermissions - Permissions to check for
 * @returns true if user has ALL permissions, false otherwise
 */
export function hasAllPermissions(
  userPermissions: Permission[],
  requiredPermissions: Permission[]
): boolean {
  if (!Array.isArray(requiredPermissions) || requiredPermissions.length === 0) {
    return true;
  }

  return requiredPermissions.every((perm) =>
    hasPermission(userPermissions, perm)
  );
}

/**
 * Check if a user has any of the required permissions (OR operation)
 * 
 * @param userPermissions - Array of permissions the user has
 * @param requiredPermissions - Permissions to check for
 * @returns true if user has ANY permission, false otherwise
 */
export function hasAnyPermission(
  userPermissions: Permission[],
  requiredPermissions: Permission[]
): boolean {
  if (!Array.isArray(requiredPermissions) || requiredPermissions.length === 0) {
    return true;
  }

  return requiredPermissions.some((perm) =>
    hasPermission(userPermissions, perm)
  );
}

/**
 * Check if a user has a specific role
 * 
 * @param userRoles - Array of roles the user has
 * @param requiredRole - Role to check for
 * @returns true if user has the role, false otherwise
 */
export function hasRole(
  userRoles: Role[],
  requiredRole: Role | string
): boolean {
  if (!userRoles) {
    return false;
  }

  const roleId = typeof requiredRole === 'string' ? requiredRole : requiredRole.id;

  return userRoles.some((role) => {
    // Exact match
    if (role.id === roleId) {
      return true;
    }

    // Compare by name if no exact ID match
    if (typeof requiredRole === 'object' && requiredRole.name) {
      return role.name === requiredRole.name;
    }

    return false;
  });
}

/**
 * Check if a user has multiple roles (AND operation)
 * 
 * @param userRoles - Array of roles the user has
 * @param requiredRoles - Roles to check for
 * @returns true if user has ALL roles, false otherwise
 */
export function hasAllRoles(
  userRoles: Role[],
  requiredRoles: (Role | string)[]
): boolean {
  if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
    return true;
  }

  return requiredRoles.every((role) => hasRole(userRoles, role));
}

/**
 * Check if a user has any of the required roles (OR operation)
 * 
 * @param userRoles - Array of roles the user has
 * @param requiredRoles - Roles to check for
 * @returns true if user has ANY role, false otherwise
 */
export function hasAnyRole(
  userRoles: Role[],
  requiredRoles: (Role | string)[]
): boolean {
  if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
    return true;
  }

  return requiredRoles.some((role) => hasRole(userRoles, role));
}

/**
 * Check if a feature is enabled for the given context
 * 
 * @param featureId - Feature identifier
 * @param context - Authorization context with user info and features
 * @returns true if feature is enabled, false otherwise
 */
export function isFeatureEnabled(
  featureId: string,
  context: AuthorizationContext
): boolean {
  if (!featureId || !context) {
    return false;
  }

  // Check if feature is in enabled features
  if (context.enabledFeatures?.includes(featureId)) {
    return true;
  }

  // Check if feature is disabled
  if (context.disabledFeatures?.includes(featureId)) {
    return false;
  }

  // Default: feature is not explicitly enabled
  return false;
}

/**
 * Check if a scope is granted
 * 
 * @param userScopes - Array of scopes granted to user
 * @param requiredScope - Scope to check for
 * @returns true if user has the scope, false otherwise
 */
export function hasScope(
  userScopes: string[],
  requiredScope: string
): boolean {
  if (!userScopes || !requiredScope) {
    return false;
  }

  return userScopes.some((scope) => {
    // Exact match
    if (scope === requiredScope) {
      return true;
    }

    // Wildcard matching (e.g., "api:*" matches "api:read", "api:write")
    if (scope.endsWith('*')) {
      const prefix = scope.slice(0, -1);
      return requiredScope.startsWith(prefix);
    }

    return false;
  });
}

/**
 * Check if all required scopes are granted
 * 
 * @param userScopes - Array of scopes granted to user
 * @param requiredScopes - Scopes to check for
 * @returns true if user has ALL scopes, false otherwise
 */
export function hasAllScopes(
  userScopes: string[],
  requiredScopes: string[]
): boolean {
  if (!Array.isArray(requiredScopes) || requiredScopes.length === 0) {
    return true;
  }

  return requiredScopes.every((scope) => hasScope(userScopes, scope));
}

/**
 * Check if any of the required scopes are granted
 * 
 * @param userScopes - Array of scopes granted to user
 * @param requiredScopes - Scopes to check for
 * @returns true if user has ANY scope, false otherwise
 */
export function hasAnyScope(
  userScopes: string[],
  requiredScopes: string[]
): boolean {
  if (!Array.isArray(requiredScopes) || requiredScopes.length === 0) {
    return true;
  }

  return requiredScopes.some((scope) => hasScope(userScopes, scope));
}

/**
 * Evaluate authorization context against criteria
 * 
 * @param context - Authorization context
 * @param criteria - Authorization criteria to evaluate
 * @returns true if all criteria are met, false otherwise
 */
export function evaluateAuthorizationContext(
  context: AuthorizationContext,
  criteria: {
    requiredPermissions?: Permission[];
    requiredRoles?: (Role | string)[];
    requiredScopes?: string[];
    requiredFeatures?: string[];
  }
): boolean {
  if (!context) {
    return false;
  }

  // Check permissions
  if (criteria.requiredPermissions && criteria.requiredPermissions.length > 0) {
    // Convert Permission objects to strings for comparison
    const requiredPermStrings = criteria.requiredPermissions.map(p => 
      typeof p === 'string' ? p : (p as any).id || (p as any).name
    );
    if (!hasAllScopes(context.permissions || [], requiredPermStrings)) {
      return false;
    }
  }

  // Check roles
  if (criteria.requiredRoles && criteria.requiredRoles.length > 0) {
    const requiredRoleStrings = criteria.requiredRoles.map(r => 
      typeof r === 'string' ? r : (r as any).id || (r as any).name
    );
    if (!hasAllScopes(context.roles || [], requiredRoleStrings)) {
      return false;
    }
  }

  // Check scopes
  if (criteria.requiredScopes && criteria.requiredScopes.length > 0) {
    if (!hasAllScopes(context.scopes || [], criteria.requiredScopes)) {
      return false;
    }
  }

  // Check features
  if (criteria.requiredFeatures && criteria.requiredFeatures.length > 0) {
    if (!criteria.requiredFeatures.every((feature) => isFeatureEnabled(feature, context))) {
      return false;
    }
  }

  return true;
}
