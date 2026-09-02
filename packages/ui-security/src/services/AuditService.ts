/**
 * @file services/AuditService.ts
 * Audit logging, compliance reporting, and security event tracking
 * 
 * Provides audit event logging, querying, compliance reporting,
 * export functionality, and activity feed management.
 * 
 * @example
 * ```tsx
 * const auditService = new AuditService();
 * 
 * // Log event
 * await auditService.logEvent({
 *   eventType: 'user_login',
 *   userId: 'user123',
 *   severity: 'info',
 *   description: 'User logged in',
 * });
 * 
 * // Query events
 * const events = await auditService.queryEvents({
 *   userId: 'user123',
 *   startDate: new Date('2024-01-01'),
 *   endDate: new Date('2024-01-31'),
 * });
 * 
 * // Generate report
 * const report = await auditService.generateComplianceReport('monthly');
 * ```
 */

import {
  AuditEventType,
  AuditSeverity,
  AuditEvent,
  AuditQueryFilter,
  AuditQueryResult,
  LoginHistoryEntry,
  SecurityEventLog,
  SecurityEventType,
  ActivityFeedEntry,
  AuditEventTimeline,
  AuditPolicy,
  ComplianceReport,
  ComplianceReportType,
  ComplianceFinding,
  AuditStatistics,
  AuditExportOptions,
} from '../types/audit';
import { generateSecureId } from '../utils/crypto';

/**
 * Audit service configuration
 */
interface AuditServiceConfig {
  maxEvents?: number;
  enablePersistence?: boolean;
  complianceLevel?: 'SOC2' | 'HIPAA' | 'GDPR' | 'PCI-DSS' | 'ISO27001';
  retentionDays?: number;
  encryptionEnabled?: boolean;
}

/**
 * Audit service
 */
export class AuditService {
  private config: AuditServiceConfig;
  private events: AuditEvent[] = [];
  private loginHistory: LoginHistoryEntry[] = [];
  private activityFeed: ActivityFeedEntry[] = [];
  private policies: AuditPolicy[] = [];

  constructor(config?: AuditServiceConfig) {
    this.config = {
      maxEvents: config?.maxEvents || 100000,
      enablePersistence: config?.enablePersistence !== false,
      complianceLevel: config?.complianceLevel || 'SOC2',
      retentionDays: config?.retentionDays || 90,
      encryptionEnabled: config?.encryptionEnabled !== false,
    };
  }

  /**
   * Log audit event
   */
  async logEvent(eventData: Partial<AuditEvent>): Promise<AuditEvent> {
    const event: AuditEvent = {
      id: this.generateEventId(),
      eventType: (eventData.eventType as AuditEventType) || 'user_action',
      userId: eventData.userId,
      timestamp: eventData.timestamp || new Date(),
      severity: (eventData.severity as AuditSeverity) || 'info',
      description: eventData.description || '',
      action: eventData.action || (eventData.eventType as string) || 'action',
      status: (eventData.status as any) || 'success',
      resource: eventData.resource,
      resourceId: eventData.resourceId,
      ipAddress: eventData.ipAddress,
      userAgent: eventData.userAgent,
      organizationId: eventData.organizationId,
      sessionId: eventData.sessionId,
      metadata: eventData.metadata || {},
    };

    // Add to events
    this.events.push(event);

    // Enforce max events
    if (this.events.length > this.config.maxEvents!) {
      this.events = this.events.slice(-this.config.maxEvents!);
    }

    // Track specific event types
    if (eventData.eventType === 'user_login' && eventData.userId) {
      this.trackLoginEvent(event);
    } else if (eventData.eventType && this.isSecurityEvent(eventData.eventType)) {
      this.trackSecurityEvent(event);
    } else {
      this.trackActivityEvent(event);
    }

    return event;
  }

  /**
   * Query audit events
   */
  async queryEvents(filter: AuditQueryFilter): Promise<AuditQueryResult> {
    let results = [...this.events];

    // Apply filters
    if (filter.userId) {
      results = results.filter(e => e.userId === filter.userId);
    }

    if (filter.eventType) {
      const types = Array.isArray(filter.eventType) ? filter.eventType : [filter.eventType];
      results = results.filter(e => types.includes(e.eventType));
    }

    if (filter.severity) {
      const severities = Array.isArray(filter.severity) ? filter.severity : [filter.severity];
      results = results.filter(e => severities.includes(e.severity));
    }

    if (filter.startDate) {
      results = results.filter(e => e.timestamp >= filter.startDate!);
    }

    if (filter.endDate) {
      results = results.filter(e => e.timestamp <= filter.endDate!);
    }

    if (filter.resource) {
      results = results.filter(e => e.resource === filter.resource);
    }

    if (filter.resourceId) {
      results = results.filter(e => e.resourceId === filter.resourceId);
    }

    if (filter.organizationId) {
      results = results.filter(e => e.organizationId === filter.organizationId);
    }

    if (filter.searchText) {
      const text = filter.searchText.toLowerCase();
      results = results.filter(e =>
        e.description.toLowerCase().includes(text) ||
        e.userId?.toLowerCase().includes(text)
      );
    }

    // Apply pagination
    const offset = (filter.page || 1 - 1) * (filter.limit || 50);
    const paginated = results.slice(offset, offset + (filter.limit || 50));

    return {
      events: paginated,
      total: results.length,
      page: filter.page || 1,
      limit: filter.limit || 50,
      hasMore: offset + paginated.length < results.length,
    };
  }

  /**
   * Get login history for user
   */
  async getLoginHistory(
    userId: string,
    options?: { limit?: number; offset?: number }
  ): Promise<LoginHistoryEntry[]> {
    const limit = options?.limit || 50;
    const offset = options?.offset || 0;

    return this.loginHistory
      .filter(entry => entry.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(offset, offset + limit);
  }

  /**
   * Get security event log
   */
  async getSecurityEventLog(
    filter?: AuditQueryFilter & { eventType?: SecurityEventType[] }
  ): Promise<SecurityEventLog[]> {
    let results = this.events.filter(e => this.isSecurityEvent(e.eventType));

    if (filter?.eventType) {
      results = results.filter(e => filter.eventType!.includes(e.eventType as any));
    }

    if (filter?.userId) {
      results = results.filter(e => e.userId === filter.userId);
    }

    if (filter?.startDate) {
      results = results.filter(e => e.timestamp >= filter.startDate!);
    }

    if (filter?.endDate) {
      results = results.filter(e => e.timestamp <= filter.endDate!);
    }

    return results.map(e => ({
      id: e.id,
      timestamp: e.timestamp,
      eventType: e.eventType as any,
      severity: e.severity,
      userId: e.userId,
      description: e.description,
      ipAddress: e.ipAddress,
      geoLocation: undefined,
      riskScore: undefined,
    }));
  }

  /**
   * Get activity feed
   */
  async getActivityFeed(
    userId?: string,
    options?: { limit?: number; offset?: number }
  ): Promise<ActivityFeedEntry[]> {
    const limit = options?.limit || 50;
    const offset = options?.offset || 0;

    let feed = this.activityFeed;

    if (userId) {
      feed = feed.filter(entry => entry.userId === userId);
    }

    return feed
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(offset, offset + limit);
  }

  /**
   * Get event timeline
   */
  async getEventTimeline(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<AuditEventTimeline[]> {
    const userEvents = this.events.filter(
      e => e.userId === userId && e.timestamp >= startDate && e.timestamp <= endDate
    );

    // Group by date
    const timeline: Map<string, AuditEvent[]> = new Map();
    userEvents.forEach(event => {
      const dateKey = event.timestamp.toISOString().split('T')[0];
      const group = timeline.get(dateKey) || [];
      group.push(event);
      timeline.set(dateKey, group);
    });

    return Array.from(timeline.entries()).map(([date, events]) => ({
      date: new Date(date),
      events,
      count: events.length,
    }));
  }

  /**
   * Generate compliance report
   */
  async generateComplianceReport(
    reportType: ComplianceReportType
  ): Promise<ComplianceReport> {
    const now = new Date();
    const startDate = this.getReportStartDate(now, reportType);
    const endDate = now;

    const report: ComplianceReport = {
      id: `report_${Date.now()}`,
      reportType,
      complianceLevel: this.config.complianceLevel!,
      generatedAt: now,
      period: {
        startDate,
        endDate,
      },
      findings: [],
      summary: {},
      statistics: this.calculateStatistics(startDate, endDate),
    };

    // Analyze events for compliance findings
    report.findings = this.analyzeComplianceFindings(startDate, endDate);

    return report;
  }

  /**
   * Export audit events
   */
  async exportEvents(
    options: AuditExportOptions
  ): Promise<string> {
    const filtered = await this.queryEvents(options.filter || {});

    switch (options.format) {
      case 'csv':
        return this.exportAsCSV(filtered.events);
      case 'json':
        return this.exportAsJSON(filtered.events);
      case 'xml':
        return this.exportAsXML(filtered.events);
      default:
        return this.exportAsJSON(filtered.events);
    }
  }

  /**
   * Get audit statistics
   */
  async getStatistics(startDate: Date, endDate: Date): Promise<AuditStatistics> {
    return this.calculateStatistics(startDate, endDate);
  }

  /**
   * Register audit policy
   */
  registerPolicy(policy: AuditPolicy): void {
    this.policies.push(policy);
  }

  /**
   * Get audit policies
   */
  getPolicies(): AuditPolicy[] {
    return [...this.policies];
  }

  /**
   * Clear events older than retention days
   */
  clearOldEvents(): number {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - (this.config.retentionDays || 90));

    const oldCount = this.events.length;
    this.events = this.events.filter(e => e.timestamp >= cutoffDate);

    return oldCount - this.events.length;
  }

  /**
   * Get event count
   */
  getEventCount(): number {
    return this.events.length;
  }

  /**
   * Clear all events
   */
  clearAllEvents(): void {
    this.events = [];
    this.loginHistory = [];
    this.activityFeed = [];
  }

  // Private helper methods

  /**
   * Generate unique event ID
   */
  private generateEventId(): string {
    // Non-guessable audit event IDs to preserve forensic integrity.
    return generateSecureId('event');
  }

  /**
   * Track login event
   */
  private trackLoginEvent(event: AuditEvent): void {
    if (!event.userId) {
      return;
    }

    const entry: LoginHistoryEntry = {
      id: event.id,
      userId: event.userId,
      timestamp: event.timestamp,
      success: event.status === 'success',
      ipAddress: event.ipAddress,
      userAgent: event.userAgent,
      geoLocation: undefined,
      deviceInfo: event.metadata?.deviceInfo,
      mfaUsed: event.metadata?.mfaUsed || false,
    };

    this.loginHistory.push(entry);

    // Keep only recent login history
    if (this.loginHistory.length > 10000) {
      this.loginHistory = this.loginHistory.slice(-10000);
    }
  }

  /**
   * Track security event
   */
  private trackSecurityEvent(event: AuditEvent): void {
    const entry: ActivityFeedEntry = {
      id: event.id,
      userId: event.userId || 'system',
      timestamp: event.timestamp,
      actionType: 'security_alert',
      description: event.description,
      metadata: {
        severity: event.severity,
        eventType: event.eventType,
      },
    };

    this.activityFeed.push(entry);
  }

  /**
   * Track activity event
   */
  private trackActivityEvent(event: AuditEvent): void {
    const entry: ActivityFeedEntry = {
      id: event.id,
      userId: event.userId || 'system',
      timestamp: event.timestamp,
      actionType: 'activity',
      description: event.description,
      metadata: event.metadata,
    };

    this.activityFeed.push(entry);
  }

  /**
   * Check if event is security-related
   */
  private isSecurityEvent(eventType: string): boolean {
    const securityTypes = [
      'user_login',
      'user_logout',
      'permission_denied',
      'invalid_credentials',
      'account_locked',
      'password_changed',
      'mfa_enabled',
      'mfa_disabled',
      'suspicious_activity',
      'security_alert',
    ];

    return securityTypes.includes(eventType);
  }

  /**
   * Get report start date
   */
  private getReportStartDate(now: Date, reportType: ComplianceReportType): Date {
    const start = new Date(now);

    switch (reportType) {
      case 'daily':
        start.setDate(start.getDate() - 1);
        break;
      case 'weekly':
        start.setDate(start.getDate() - 7);
        break;
      case 'monthly':
        start.setMonth(start.getMonth() - 1);
        break;
      case 'quarterly':
        start.setMonth(start.getMonth() - 3);
        break;
      case 'annual':
        start.setFullYear(start.getFullYear() - 1);
        break;
    }

    return start;
  }

  /**
   * Calculate audit statistics
   */
  private calculateStatistics(startDate: Date, endDate: Date): AuditStatistics {
    const filtered = this.events.filter(e => e.timestamp >= startDate && e.timestamp <= endDate);

    const stats: AuditStatistics = {
      totalEvents: filtered.length,
      eventsByType: {},
      eventsBySeverity: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        info: 0,
      },
      uniqueUsers: new Set(),
      topUsers: [],
      topResources: [],
    };

    // Count by type
    filtered.forEach(event => {
      stats.eventsByType[event.eventType] = (stats.eventsByType[event.eventType] || 0) + 1;
      stats.eventsBySeverity[event.severity]++;
      if (event.userId) {
        stats.uniqueUsers.add(event.userId);
      }
    });

    // Top users
    const userCounts = new Map<string, number>();
    filtered.forEach(event => {
      if (event.userId) {
        userCounts.set(event.userId, (userCounts.get(event.userId) || 0) + 1);
      }
    });
    stats.topUsers = Array.from(userCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([userId, count]) => ({ userId, count }));

    // Top resources
    const resourceCounts = new Map<string, number>();
    filtered.forEach(event => {
      if (event.resource) {
        resourceCounts.set(event.resource, (resourceCounts.get(event.resource) || 0) + 1);
      }
    });
    stats.topResources = Array.from(resourceCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([resource, count]) => ({ resource, count }));

    return stats;
  }

  /**
   * Analyze compliance findings
   */
  private analyzeComplianceFindings(startDate: Date, endDate: Date): ComplianceFinding[] {
    const findings: ComplianceFinding[] = [];
    const filtered = this.events.filter(e => e.timestamp >= startDate && e.timestamp <= endDate);

    // Check for failed logins
    const failedLogins = filtered.filter(e =>
      e.eventType === 'user_login' && e.status !== 'success'
    );
    if (failedLogins.length > 50) {
      findings.push({
        id: `finding_${Date.now()}_1`,
        severity: 'high',
        category: 'access_control',
        title: 'High number of failed login attempts',
        description: `${failedLogins.length} failed login attempts detected`,
        timestamp: new Date(),
        affectedResources: [],
      });
    }

    // Check for permission denials
    const permissionDenials = filtered.filter(e => e.eventType === 'permission_denied');
    if (permissionDenials.length > 100) {
      findings.push({
        id: `finding_${Date.now()}_2`,
        severity: 'medium',
        category: 'authorization',
        title: 'High number of permission denials',
        description: `${permissionDenials.length} permission denial events detected`,
        timestamp: new Date(),
        affectedResources: [],
      });
    }

    return findings;
  }

  /**
   * Export as CSV
   */
  private exportAsCSV(events: AuditEvent[]): string {
    const headers = [
      'ID',
      'Timestamp',
      'Event Type',
      'User ID',
      'Severity',
      'Description',
      'Resource',
      'IP Address',
    ];

    const rows = events.map(e => [
      e.id,
      e.timestamp.toISOString(),
      e.eventType,
      e.userId || '',
      e.severity,
      e.description,
      e.resource || '',
      e.ipAddress || '',
    ].map(v => `"${String(v).replace(/"/g, '""')}"`));

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  /**
   * Export as JSON
   */
  private exportAsJSON(events: AuditEvent[]): string {
    return JSON.stringify(events, null, 2);
  }

  /**
   * Export as XML
   */
  private exportAsXML(events: AuditEvent[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<events>\n';

    events.forEach(e => {
      xml += '  <event>\n';
      xml += `    <id>${this.escapeXML(e.id)}</id>\n`;
      xml += `    <timestamp>${e.timestamp.toISOString()}</timestamp>\n`;
      xml += `    <eventType>${this.escapeXML(e.eventType)}</eventType>\n`;
      xml += `    <userId>${this.escapeXML(e.userId || '')}</userId>\n`;
      xml += `    <severity>${this.escapeXML(e.severity)}</severity>\n`;
      xml += `    <description>${this.escapeXML(e.description)}</description>\n`;
      xml += '  </event>\n';
    });

    xml += '</events>';
    return xml;
  }

  /**
   * Escape XML special characters
   */
  private escapeXML(str: string): string {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}

export default AuditService;
