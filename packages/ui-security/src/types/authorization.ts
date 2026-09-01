/**
 * @file types/authorization.ts
 * Authorization, access control, and permission-related types
 */

/**
 * Permission with hierarchical structure
 */
export interface PermissionDefinition {
  id: string;
  namespace: string;
  resource: string;
  action: string;
  description?: string;
  scope?: 'global' | 'organization' | 'team' | 'personal';
  metadata?: Record<string, any>;
}

/**
 * Role with permissions
 */
export interface RoleDefinition {
  [key: string]: any;
  id: string;
  name: string;
  description?: string;
  permissions: string[]; // Permission IDs
  inheritsFrom?: string[]; // Parent role IDs
  scope?: 'global' | 'organization' | 'team';
  metadata?: Record<string, any>;
}

/**
 * Access scope definition
 */
export interface ScopeDefinition {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  metadata?: Record<string, any>;
}

/**
 * Feature flag definition
 */
export interface FeatureFlagDefinition {
  [key: string]: any;
  id: string;
  name: string;
  key: string;
  enabled: boolean;
  description?: string;
  audiences?: FeatureAudience[];
  rolloutPercentage?: number;
  conditions?: FeatureCondition[];
  metadata?: Record<string, any>;
}

/**
 * Feature audience
 */
export interface FeatureAudience {
  id?: string;
  name: string;
  type: 'public' | 'authenticated' | 'role-based' | 'custom';
  roles?: string[];
  userIds?: string[];
  organizationIds?: string[];
  condition?: string;
}

/**
 * Feature condition for evaluation
 */
export interface FeatureCondition {
  [key: string]: any;
  field: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'regex' | 'greaterThan' | 'lessThan';
  value: any;
}

/**
 * Policy definition
 */
export interface PolicyDefinition {
  id: string;
  name: string;
  description?: string;
  effect: 'allow' | 'deny';
  principal?: string; // User, role, or wildcard
  actions: string[];
  resources: string[];
  conditions?: PolicyCondition[];
  metadata?: Record<string, any>;
}

/**
 * Policy condition
 */
export interface PolicyCondition {
  [key: string]: any;
  field: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'in' | 'regex';
  value: any;
}

/**
 * Access evaluation result
 */
export interface AccessEvaluationResult {
  allowed: boolean;
  reason: string;
  matchedPolicies?: string[];
  deniedBy?: string[];
  details?: Record<string, any>;
}

/**
 * Permission check request
 */
export interface PermissionCheckRequest {
  [key: string]: any;
  userId: string;
  permission: string | PermissionDefinition;
  resource?: string;
  resourceId?: string;
  context?: Record<string, any>;
}

/**
 * Role check request
 */
export interface RoleCheckRequest {
  userId: string;
  role: string | RoleDefinition;
  scope?: 'global' | 'organization' | 'team';
  context?: Record<string, any>;
}

/**
 * Feature access request
 */
export interface FeatureAccessRequest {
  [key: string]: any;
  userId?: string;
  featureId: string;
  organizationId?: string;
  context?: Record<string, any>;
}

/**
 * Scope check request
 */
export interface ScopeCheckRequest {
  userId: string;
  scope: string | ScopeDefinition;
  context?: Record<string, any>;
}

/**
 * Authorization context
 */
export interface AuthorizationContext {
  [key: string]: any;
  userId: string;
  roles: string[];
  permissions: string[];
  scopes: string[];
  features: string[];
  enabledFeatures: string[];  // For backward compatibility
  disabledFeatures: string[];  // For backward compatibility
  metadata?: Record<string, any>;
}

/**
 * Access denied error
 */
export interface AccessDeniedError {
  code: string;
  message: string;
  reason: 'permission_denied' | 'role_denied' | 'feature_disabled' | 'scope_denied' | 'policy_denied';
  requiredPermission?: string;
  requiredRole?: string;
  requiredFeature?: string;
  requiredScope?: string;
  suggestion?: string;
}

/**
 * Authorization check result
 */
export interface AuthorizationCheckResult {
  [key: string]: any;
  allowed: boolean;
  reason?: string;
  error?: AccessDeniedError;
  metadata?: Record<string, any>;
}
