/**
 * @file types/audit.ts
 * Audit logging and compliance types
 */

/**
 * Audit event type
 */
export type AuditEventType =
  | 'user_locked'
  | 'user_unlocked'
  | 'user_login'
  | 'user_logout'
  | 'permission_denied'
  | 'invalid_credentials'
  | 'account_locked'
  | 'password_changed'
  | 'mfa_enabled'
  | 'mfa_disabled'
  | 'suspicious_activity'
  | 'security_alert'
  | 'user_action'
  | string;

/**
 * Audit event severity
 */
export type AuditSeverity = 'info' | 'warning' | 'error' | 'critical';

/**
 * Audit event
 */
export interface AuditEvent {
  id: string;
  eventType: AuditEventType;
  severity: AuditSeverity;
  userId?: string;
  userEmail?: string;
  username?: string;
  timestamp: Date;
  action: string;
  description: string;
  resource?: string;
  resourceId?: string;
  resourceType?: string;
  resourceName?: string;
  changes?: Record<string, any>;
  oldValue?: any;
  newValue?: any;
  status: 'success' | 'failure' | 'partial';
  errorMessage?: string;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  organizationId?: string;
  location?: GeoLocation;
  metadata?: Record<string, any>;
}

/**
 * Geographic location
 */
export interface GeoLocation {
  ip: string;
  country: string;
  countryCode: string;
  state?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  isKnownLocation: boolean;
  riskScore?: number;
}

/**
 * Audit query filter
 */
export interface AuditQueryFilter {
  userId?: string;
  eventType?: AuditEventType | AuditEventType[];
  severity?: AuditSeverity | AuditSeverity[];
  startDate?: Date;
  endDate?: Date;
  resource?: string;
  resourceId?: string;
  organizationId?: string;
  searchText?: string;
  page?: number;
  limit?: number;
  sortBy?: 'timestamp' | 'severity' | 'userId';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Audit query result
 */
export interface AuditQueryResult {
  events: AuditEvent[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * Login history entry
 */
export interface LoginHistoryEntry {
  id: string;
  userId: string;
  timestamp: Date;
  success: boolean;
  ipAddress?: string;
  userAgent?: string;
  geoLocation?: GeoLocation;
  deviceInfo?: Record<string, any>;
  mfaUsed: boolean;
}

/**
 * Security event log
 */
export interface SecurityEventLog {
  id: string;
  timestamp: Date;
  eventType: string;
  severity: AuditSeverity;
  userId?: string;
  description: string;
  ipAddress?: string;
  geoLocation?: GeoLocation;
  riskScore?: number;
  /** Optional human-readable category label for the event. */
  category?: string;
  /** Optional resource identifier the event relates to. */
  resource?: string;
  /** Optional structured details rendered as key/value pairs. */
  details?: Record<string, unknown>;
}

/**
 * Security event types
 */
export type SecurityEventType =
  | 'brute_force_attempt'
  | 'suspicious_login'
  | 'impossible_travel'
  | 'unusual_location'
  | 'failed_mfa'
  | 'policy_violation'
  | 'unauthorized_access'
  | 'data_breach'
  | 'malware_detected'
  | 'encryption_failure'
  | 'certificate_expiry'
  | 'vpn_disconnect'
  | 'anonymous_access'
  | 'tor_network_access'
  | 'rate_limit_exceeded'
  | 'ddos_attack'
  | 'sql_injection_attempt'
  | 'xss_attempt'
  | 'privilege_escalation'
  | 'lateral_movement'
  | string;

/**
 * Activity feed entry
 */
export interface ActivityFeedEntry {
  id: string;
  userId: string;
  timestamp: Date;
  actionType: string;
  description: string;
  metadata?: Record<string, any>;
}

/**
 * Audit event timeline
 */
export interface AuditEventTimeline {
  date: Date;
  events: AuditEvent[];
  count: number;
}

/**
 * Audit policy
 */
export interface AuditPolicy {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  retention: {
    days: number;
    archiveAfterDays?: number;
    deleteAfterDays?: number;
  };
  events: AuditEventType[];
  logLevel: 'minimal' | 'standard' | 'detailed';
  alertOn: AuditSeverity[];
  realTimeAlerts: boolean;
  storageLocation: 'local' | 'cloud' | 'external';
  encryptionEnabled: boolean;
}

/**
 * Compliance report
 */
export interface ComplianceReport {
  id: string;
  reportType: ComplianceReportType;
  complianceLevel: string;
  generatedAt: Date;
  period: {
    startDate: Date;
    endDate: Date;
  };
  findings: ComplianceFinding[];
  summary: Record<string, any>;
  statistics: AuditStatistics;
}

/**
 * Compliance report types
 */
export type ComplianceReportType = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';

/**
 * Compliance finding
 */
export interface ComplianceFinding {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  title: string;
  description: string;
  timestamp: Date;
  affectedResources: string[];
}

/**
 * Audit statistics
 */
export interface AuditStatistics {
  totalEvents: number;
  eventsByType: Record<string, number>;
  eventsBySeverity: Record<string, number>;
  uniqueUsers: Set<string>;
  topUsers: Array<{ userId: string; count: number }>;
  topResources: Array<{ resource: string; count: number }>;
}

/**
 * Audit export format
 */
export type AuditExportFormat = 'json' | 'csv' | 'xml' | 'pdf';

/**
 * Audit export options
 */
export interface AuditExportOptions {
  format: AuditExportFormat;
  filter?: AuditQueryFilter;
  includeMetadata: boolean;
  encryptExport: boolean;
  signExport: boolean;
  deliveryMethod?: 'email' | 'download' | 'cloud';
}
