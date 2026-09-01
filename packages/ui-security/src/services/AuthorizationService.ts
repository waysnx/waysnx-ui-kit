/**
 * @file services/AuthorizationService.ts
 * Authorization, access control, and permission evaluation service
 * 
 * Provides permission, role, scope, and feature flag evaluation with caching.
 * Implements hierarchical permission checking, policy enforcement, and feature toggles.
 * 
 * @example
 * ```tsx
 * const authzService = new AuthorizationService(httpClient, {
 *   cacheTTL: 300000, // 5 minutes
 *   enableCaching: true,
 * });
 * 
 * // Check permission
 * const canCreate = authzService.hasPermission('user123', 'user.create');
 * 
 * // Check role
 * const isAdmin = authzService.hasRole('user123', 'admin');
 * 
 * // Evaluate access
 * const access = await authzService.evaluateAccess({
 *   userId: 'user123',
 *   permission: 'employee.view',
 *   resource: 'employees',
 *   resourceId: 'emp456',
 * });
 * 
 * // Check feature
 * const featureEnabled = await authzService.isFeatureEnabled('new_dashboard', 'user123');
 * ```
 */

import {
  PermissionDefinition,
  RoleDefinition,
  ScopeDefinition,
  FeatureFlagDefinition,
  PolicyDefinition,
  AccessEvaluationResult,
  AuthorizationContext,
  PermissionCheckRequest,
  RoleCheckRequest,
  FeatureAccessRequest,
  ScopeCheckRequest,
  PolicyCondition,
} from '../types/authorization';

/**
 * HTTP client interface
 */
interface HttpClient {
  post<T>(url: string, data: any): Promise<T>;
  get<T>(url: string): Promise<T>;
}

/**
 * Authorization service configuration
 */
interface AuthorizationConfig {
  httpClient?: HttpClient;
  cacheTTL?: number; // Time to live for cached data in ms
  enableCaching?: boolean;
  defaultCacheTTL?: number; // Default cache TTL if not specified
  maxCacheSize?: number; // Maximum number of items to cache
}

/**
 * Cache entry for authorization data
 */
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

/**
 * Authorization service
 */
export class AuthorizationService {
  private cacheTTL: number;
  private enableCaching: boolean;
  private maxCacheSize: number;

  // Cache storage
  private permissionCache = new Map<string, CacheEntry<Map<string, boolean>>>();
  private roleCache = new Map<string, CacheEntry<string[]>>();
  private contextCache = new Map<string, CacheEntry<AuthorizationContext>>();
  private featureFlagCache = new Map<string, CacheEntry<FeatureFlagDefinition>>();
  private policyCache = new Map<string, CacheEntry<PolicyDefinition>>();

  // In-memory data stores
  private permissions = new Map<string, PermissionDefinition>();
  private roles = new Map<string, RoleDefinition>();
  private scopes = new Map<string, ScopeDefinition>();
  private features = new Map<string, FeatureFlagDefinition>();
  private policies = new Map<string, PolicyDefinition>();

  constructor(config?: AuthorizationConfig) {
    this.cacheTTL = config?.cacheTTL || config?.defaultCacheTTL || 300000; // 5 minutes default
    this.enableCaching = config?.enableCaching !== false;
    this.maxCacheSize = config?.maxCacheSize || 500;
  }

  /**
   * Check if user has permission
   * 
   * @param userId - User ID
   * @param permission - Permission name or definition
   * @param resource - Optional resource name
   * @returns true if user has permission
   */
  async hasPermission(
    userId: string,
    permission: string | PermissionDefinition,
    resource?: string
  ): Promise<boolean> {
    try {
      const result = await this.checkPermission({
        userId,
        permission,
        resource,
      });
      return result.allowed;
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }

  /**
   * Check permission with detailed result
   */
  async checkPermission(request: PermissionCheckRequest): Promise<AccessEvaluationResult> {
    const permissionName = typeof request.permission === 'string'
      ? request.permission
      : request.permission.id;

    // Check cache first
    if (this.enableCaching) {
      const cached = this.getCachedPermission(request.userId, permissionName);
      if (cached !== undefined) {
        return {
          allowed: cached,
          reason: cached ? 'Permission granted' : 'Permission denied',
        };
      }
    }

    // Evaluate permission through roles and policies
    const context = await this.getAuthorizationContext(request.userId);
    
    // Check direct permissions
    if (context.permissions.includes(permissionName)) {
      this.cachePermission(request.userId, permissionName, true);
      return {
        allowed: true,
        reason: 'Direct permission granted',
      };
    }

    // Check through roles
    for (const roleId of context.roles) {
      const role = this.roles.get(roleId);
      if (role?.permissions.includes(permissionName)) {
        this.cachePermission(request.userId, permissionName, true);
        return {
          allowed: true,
          reason: `Permission granted through role: ${roleId}`,
        };
      }
    }

    // Check policies
    const policyMatch = await this.evaluatePolicy(request.userId, permissionName, request);
    if (policyMatch.allowed) {
      this.cachePermission(request.userId, permissionName, true);
      return policyMatch;
    }

    this.cachePermission(request.userId, permissionName, false);
    return {
      allowed: false,
      reason: 'Permission denied: insufficient privileges',
      deniedBy: ['direct_check', 'role_check', 'policy_check'],
    };
  }

  /**
   * Check if user has role
   * 
   * @param userId - User ID
   * @param role - Role name or definition
   * @param scope - Optional scope
   * @returns true if user has role
   */
  async hasRole(
    userId: string,
    role: string | RoleDefinition,
    scope?: string
  ): Promise<boolean> {
    try {
      const result = await this.checkRole({
        userId,
        role,
        scope: scope as any,
      });
      return result.allowed;
    } catch (error) {
      console.error('Error checking role:', error);
      return false;
    }
  }

  /**
   * Check role with detailed result
   */
  async checkRole(request: RoleCheckRequest): Promise<AccessEvaluationResult> {
    const roleName = typeof request.role === 'string' ? request.role : request.role.id;

    // Check cache first
    if (this.enableCaching) {
      const cached = this.getCachedRole(request.userId);
      if (cached && cached.includes(roleName)) {
        return {
          allowed: true,
          reason: `User has role: ${roleName}`,
        };
      }
    }

    // Get user context
    const context = await this.getAuthorizationContext(request.userId);
    
    const hasRole = context.roles.includes(roleName);
    
    if (hasRole) {
      return {
        allowed: true,
        reason: `User has role: ${roleName}`,
      };
    }

    return {
      allowed: false,
      reason: `User does not have role: ${roleName}`,
    };
  }

  /**
   * Check if user has access to scope
   */
  async hasScope(
    userId: string,
    scope: string | ScopeDefinition
  ): Promise<boolean> {
    try {
      const result = await this.checkScope({
        userId,
        scope,
      });
      return result.allowed;
    } catch (error) {
      console.error('Error checking scope:', error);
      return false;
    }
  }

  /**
   * Check scope with detailed result
   */
  async checkScope(request: ScopeCheckRequest): Promise<AccessEvaluationResult> {
    const scopeName = typeof request.scope === 'string' ? request.scope : request.scope.id;

    const context = await this.getAuthorizationContext(request.userId);
    
    if (context.scopes.includes(scopeName)) {
      return {
        allowed: true,
        reason: `User has scope: ${scopeName}`,
      };
    }

    return {
      allowed: false,
      reason: `User does not have scope: ${scopeName}`,
    };
  }

  /**
   * Check if feature is enabled for user
   */
  async isFeatureEnabled(
    featureKey: string,
    userId?: string,
    organizationId?: string
  ): Promise<boolean> {
    try {
      // Check cache first
      if (this.enableCaching) {
        const cached = this.getCachedFeature(featureKey);
        if (cached) {
          return this.evaluateFeatureFlag(cached, userId, organizationId);
        }
      }

      // Get feature from storage
      const feature = this.features.get(featureKey);
      if (!feature) {
        return false;
      }

      // Evaluate feature
      const enabled = this.evaluateFeatureFlag(feature, userId, organizationId);
      
      if (this.enableCaching) {
        this.cacheFeature(featureKey, feature);
      }

      return enabled;
    } catch (error) {
      console.error('Error checking feature:', error);
      return false;
    }
  }

  /**
   * Check feature access with detailed result
   */
  async checkFeature(request: FeatureAccessRequest): Promise<AccessEvaluationResult> {
    const enabled = await this.isFeatureEnabled(
      request.featureId,
      request.userId,
      request.organizationId
    );

    return {
      allowed: enabled,
      reason: enabled ? 'Feature enabled' : 'Feature disabled',
    };
  }

  /**
   * Evaluate access based on permission check request
   */
  async evaluateAccess(request: PermissionCheckRequest): Promise<AccessEvaluationResult> {
    return this.checkPermission(request);
  }

  /**
   * Get authorization context for user
   */
  async getAuthorizationContext(userId: string): Promise<AuthorizationContext> {
    // Check cache first
    if (this.enableCaching) {
      const cached = this.getCachedContext(userId);
      if (cached) {
        return cached;
      }
    }

    // Build context from stored data
    const context: AuthorizationContext = {
      userId,
      roles: [],
      permissions: [],
      scopes: [],
      features: [],
      enabledFeatures: [],
      disabledFeatures: [],
    };

    // In a real implementation, this would fetch from backend
    // For now, return empty context
    if (this.enableCaching) {
      this.cacheContext(userId, context);
    }

    return context;
  }

  /**
   * Set user authorization context
   */
  setAuthorizationContext(context: AuthorizationContext): void {
    if (this.enableCaching) {
      this.cacheContext(context.userId, context);
    }
  }

  /**
   * Register permission
   */
  registerPermission(permission: PermissionDefinition): void {
    this.permissions.set(permission.id, permission);
  }

  /**
   * Register role
   */
  registerRole(role: RoleDefinition): void {
    this.roles.set(role.id, role);
  }

  /**
   * Register scope
   */
  registerScope(scope: ScopeDefinition): void {
    this.scopes.set(scope.id, scope);
  }

  /**
   * Register feature flag
   */
  registerFeature(feature: FeatureFlagDefinition): void {
    this.features.set(feature.key, feature);
  }

  /**
   * Register policy
   */
  registerPolicy(policy: PolicyDefinition): void {
    this.policies.set(policy.id, policy);
  }

  /**
   * Clear all caches
   */
  clearCache(): void {
    this.permissionCache.clear();
    this.roleCache.clear();
    this.contextCache.clear();
    this.featureFlagCache.clear();
    this.policyCache.clear();
  }

  /**
   * Clear cache for specific user
   */
  clearUserCache(userId: string): void {
    // Clear all caches that contain this user
    this.permissionCache.delete(userId);
    this.roleCache.delete(userId);
    this.contextCache.delete(userId);
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      permissionCache: this.permissionCache.size,
      roleCache: this.roleCache.size,
      contextCache: this.contextCache.size,
      featureFlagCache: this.featureFlagCache.size,
      policyCache: this.policyCache.size,
      totalCacheSize: 
        this.permissionCache.size + 
        this.roleCache.size + 
        this.contextCache.size + 
        this.featureFlagCache.size + 
        this.policyCache.size,
    };
  }

  // Private helper methods

  /**
   * Evaluate policy for permission
   */
  private async evaluatePolicy(
    _userId: string,
    permission: string,
    context?: any
  ): Promise<AccessEvaluationResult> {
    for (const policy of this.policies.values()) {
      if (policy.actions.includes(permission) || policy.actions.includes('*')) {
        if (this.evaluatePolicyConditions(policy.conditions || [], context)) {
          if (policy.effect === 'allow') {
            return {
              allowed: true,
              reason: `Policy ${policy.id} grants access`,
              matchedPolicies: [policy.id],
            };
          } else if (policy.effect === 'deny') {
            return {
              allowed: false,
              reason: `Policy ${policy.id} denies access`,
              deniedBy: [policy.id],
            };
          }
        }
      }
    }

    return {
      allowed: false,
      reason: 'No matching policy found',
    };
  }

  /**
   * Evaluate policy conditions
   */
  private evaluatePolicyConditions(conditions: PolicyCondition[] | undefined, context?: any): boolean {
    if (!conditions || conditions.length === 0) {
      return true;
    }

    return conditions.every(condition => this.evaluateCondition(condition, context));
  }

  /**
   * Evaluate single condition
   */
  private evaluateCondition(condition: PolicyCondition, context?: any): boolean {
    if (!context || !(condition.field in context)) {
      return true;
    }

    const value = context[condition.field];

    switch (condition.operator) {
      case 'equals':
        return value === condition.value;
      case 'notEquals':
        return value !== condition.value;
      case 'contains':
        return String(value).includes(condition.value);
      case 'in':
        return Array.isArray(condition.value) && condition.value.includes(value);
      case 'regex':
        try {
          return new RegExp(condition.value).test(String(value));
        } catch {
          return false;
        }
      default:
        return false;
    }
  }

  /**
   * Evaluate feature flag for user
   */
  private evaluateFeatureFlag(
    feature: FeatureFlagDefinition,
    userId?: string,
    organizationId?: string
  ): boolean {
    if (!feature.enabled) {
      return false;
    }

    // Check rollout percentage
    if (feature.rolloutPercentage !== undefined && feature.rolloutPercentage < 100) {
      const hash = this.hashUserId(userId || 'anonymous');
      if ((hash % 100) >= feature.rolloutPercentage) {
        return false;
      }
    }

    // Check audiences
    if (feature.audiences && feature.audiences.length > 0) {
      return feature.audiences.some(audience => 
        this.matchesAudience(audience, userId, organizationId)
      );
    }

    // Check conditions
    if (feature.conditions && feature.conditions.length > 0) {
      const context = { userId, organizationId };
      return feature.conditions.every(condition => 
        this.evaluateCondition(condition as any, context)
      );
    }

    return true;
  }

  /**
   * Check if user matches feature audience
   */
  private matchesAudience(audience: any, userId?: string, organizationId?: string): boolean {
    if (audience.type === 'public') {
      return true;
    }

    if (audience.type === 'authenticated' && userId) {
      return true;
    }

    if (audience.type === 'role-based' && audience.roles) {
      // This would need actual role checking
      return true;
    }

    if (audience.userIds && userId && audience.userIds.includes(userId)) {
      return true;
    }

    if (audience.organizationIds && organizationId && audience.organizationIds.includes(organizationId)) {
      return true;
    }

    return false;
  }

  /**
   * Hash user ID for rollout percentage calculation
   */
  private hashUserId(userId: string): number {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  // Cache helper methods

  /**
   * Get cached permission
   */
  private getCachedPermission(userId: string, permission: string): boolean | undefined {
    const entry = this.permissionCache.get(userId);
    if (!entry) {
      return undefined;
    }

    if (Date.now() > entry.expiresAt) {
      this.permissionCache.delete(userId);
      return undefined;
    }

    return entry.data.get(permission);
  }

  /**
   * Cache permission
   */
  private cachePermission(userId: string, permission: string, allowed: boolean): void {
    if (!this.enableCaching) {
      return;
    }

    let entry = this.permissionCache.get(userId);
    if (!entry) {
      entry = {
        data: new Map(),
        expiresAt: Date.now() + this.cacheTTL,
      };
      this.permissionCache.set(userId, entry);
    }

    entry.data.set(permission, allowed);

    // Enforce max cache size
    if (this.permissionCache.size > this.maxCacheSize) {
      const firstKey = this.permissionCache.keys().next().value;
      if (firstKey) {
        this.permissionCache.delete(firstKey);
      }
    }
  }

  /**
   * Get cached roles
   */
  private getCachedRole(userId: string): string[] | undefined {
    const entry = this.roleCache.get(userId);
    if (!entry) {
      return undefined;
    }

    if (Date.now() > entry.expiresAt) {
      this.roleCache.delete(userId);
      return undefined;
    }

    return entry.data;
  }

  /**
   * Get cached context
   */
  private getCachedContext(userId: string): AuthorizationContext | undefined {
    const entry = this.contextCache.get(userId);
    if (!entry) {
      return undefined;
    }

    if (Date.now() > entry.expiresAt) {
      this.contextCache.delete(userId);
      return undefined;
    }

    return entry.data;
  }

  /**
   * Cache context
   */
  private cacheContext(userId: string, context: AuthorizationContext): void {
    if (!this.enableCaching) {
      return;
    }

    this.contextCache.set(userId, {
      data: context,
      expiresAt: Date.now() + this.cacheTTL,
    });

    // Enforce max cache size
    if (this.contextCache.size > this.maxCacheSize) {
      const firstKey = this.contextCache.keys().next().value;
      if (firstKey) {
        this.contextCache.delete(firstKey);
      }
    }
  }

  /**
   * Get cached feature
   */
  private getCachedFeature(featureKey: string): FeatureFlagDefinition | undefined {
    const entry = this.featureFlagCache.get(featureKey);
    if (!entry) {
      return undefined;
    }

    if (Date.now() > entry.expiresAt) {
      this.featureFlagCache.delete(featureKey);
      return undefined;
    }

    return entry.data;
  }

  /**
   * Cache feature
   */
  private cacheFeature(featureKey: string, feature: FeatureFlagDefinition): void {
    if (!this.enableCaching) {
      return;
    }

    this.featureFlagCache.set(featureKey, {
      data: feature,
      expiresAt: Date.now() + this.cacheTTL,
    });

    // Enforce max cache size
    if (this.featureFlagCache.size > this.maxCacheSize) {
      const firstKey = this.featureFlagCache.keys().next().value;
      if (firstKey) {
        this.featureFlagCache.delete(firstKey);
      }
    }
  }
}

export default AuthorizationService;
