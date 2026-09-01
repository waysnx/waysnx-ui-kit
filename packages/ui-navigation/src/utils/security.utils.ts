/**
 * @file utils/security.utils.ts
 * Security/permission utilities for navigation
 * Note: This integrates with @waysnx/ui-security (to be implemented)
 */

import type { NavigationItem, MenuItem, SecurityContext } from '../types';

/**
 * Check if user can access a navigation item (placeholder for ui-security)
 */
export function canAccessItem(
  item: NavigationItem | MenuItem,
  security?: SecurityContext
): boolean {
  if (!security) {
    return true;
  }

  // Check permissions
  if ('permissions' in item && item.permissions?.length) {
    if (!security.permissions) {
      return false;
    }
    const hasPermission = item.permissions.some((perm) =>
      security.permissions?.includes(perm)
    );
    if (!hasPermission) {
      return false;
    }
  }

  // Check roles
  if ('roles' in item && item.roles?.length) {
    if (!security.roles) {
      return false;
    }
    const hasRole = item.roles.some((role) => security.roles?.includes(role));
    if (!hasRole) {
      return false;
    }
  }

  // Check features
  if ('feature' in item && item.feature) {
    if (!security.features?.includes(item.feature)) {
      return false;
    }
  }

  return true;
}

/**
 * Filter menu items based on permissions
 */
export function filterMenuByPermissions(
  items: NavigationItem[],
  security?: SecurityContext
): NavigationItem[] {
  return items
    .filter((item) => canAccessItem(item, security))
    .map((item) => ({
      ...item,
      children: item.children ? filterMenuByPermissions(item.children, security) : undefined,
    }));
}

/**
 * Check if item requires specific permission
 */
export function requiresPermission(item: NavigationItem | MenuItem): boolean {
  if ('permissions' in item) {
    return (item.permissions?.length || 0) > 0;
  }
  return false;
}

/**
 * Check if item requires specific role
 */
export function requiresRole(item: NavigationItem | MenuItem): boolean {
  if ('roles' in item) {
    return (item.roles?.length || 0) > 0;
  }
  return false;
}

/**
 * Get required permissions for a menu item
 */
export function getRequiredPermissions(item: NavigationItem | MenuItem): string[] {
  if ('permissions' in item && item.permissions) {
    return item.permissions;
  }
  return [];
}

/**
 * Get required roles for a menu item
 */
export function getRequiredRoles(item: NavigationItem | MenuItem): string[] {
  if ('roles' in item && item.roles) {
    return item.roles;
  }
  return [];
}

/**
 * Mark item as requiring permission
 */
export function requirePermission(
  item: NavigationItem,
  permissions: string[]
): MenuItem {
  return {
    ...item,
    permissions,
  } as MenuItem;
}

/**
 * Mark item as requiring role
 */
export function requireRole(item: NavigationItem, roles: string[]): MenuItem {
  return {
    ...item,
    roles,
  } as MenuItem;
}

/**
 * Mark item as requiring feature flag
 */
export function requireFeature(item: NavigationItem, feature: string): MenuItem {
  return {
    ...item,
    feature,
  } as MenuItem;
}
