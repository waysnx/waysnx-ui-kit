/**
 * Core type definitions for @waysnx/ui-diagnostics.
 *
 * These types form the stable contract between the client-side diagnostics
 * library and any receiving Diagnostics API / monitoring platform. The library
 * is framework-agnostic; nothing in this file depends on React.
 */

// ---------------------------------------------------------------------------
// Error taxonomy
// ---------------------------------------------------------------------------

/**
 * Expected errors typically originate from the application/API and should not
 * automatically be treated as UI defects.
 */
export type ExpectedDiagnosticCategory =
  | 'VALIDATION'
  | 'BUSINESS_RULE'
  | 'AUTHENTICATION'
  | 'AUTHORIZATION'
  | 'API_ERROR'
  | 'NETWORK_ERROR'
  | 'NOT_FOUND'
  | 'CONFLICT';

/**
 * Unexpected errors indicate potential UI/runtime defects.
 */
export type UnexpectedDiagnosticCategory =
  | 'UI_RUNTIME'
  | 'COMPONENT'
  | 'FORM'
  | 'FORM_SUBMISSION'
  | 'SCHEMA'
  | 'RULE_ENGINE'
  | 'RENDER'
  | 'UNHANDLED_REJECTION'
  | 'UNKNOWN';

export type DiagnosticCategory =
  | ExpectedDiagnosticCategory
  | UnexpectedDiagnosticCategory;

/** Categories considered "expected" (application/API), not UI defects. */
export const EXPECTED_CATEGORIES: readonly ExpectedDiagnosticCategory[] = [
  'VALIDATION',
  'BUSINESS_RULE',
  'AUTHENTICATION',
  'AUTHORIZATION',
  'API_ERROR',
  'NETWORK_ERROR',
  'NOT_FOUND',
  'CONFLICT',
];

export type DiagnosticSeverity = 'debug' | 'info' | 'warning' | 'error' | 'fatal';

// ---------------------------------------------------------------------------
// Diagnostic event schema
// ---------------------------------------------------------------------------

export interface DiagnosticApplicationContext {
  name?: string;
  version?: string;
  environment?: string;
  release?: string;
}

export interface DiagnosticUiKitContext {
  version?: string;
  package?: string;
}

export interface DiagnosticComponentContext {
  name?: string;
  version?: string;
}

export interface DiagnosticFormContext {
  formId?: string;
  schemaVersion?: string;
  operation?: string;
}

export interface DiagnosticRouteContext {
  path?: string;
  screen?: string;
}

export interface DiagnosticRuntimeContext {
  browser?: string;
  browserVersion?: string;
  os?: string;
  platform?: string;
}

/**
 * The normalized, structured representation of a captured diagnostic condition.
 * This is the sole contract handed off to a reporter.
 */
export interface DiagnosticEvent {
  id: string;
  timestamp: string;
  category: DiagnosticCategory;
  severity: DiagnosticSeverity;
  message: string;
  errorName?: string;
  stack?: string;
  source?: string;
  operation?: string;
  application?: DiagnosticApplicationContext;
  uiKit?: DiagnosticUiKitContext;
  component?: DiagnosticComponentContext;
  form?: DiagnosticFormContext;
  route?: DiagnosticRouteContext;
  runtime?: DiagnosticRuntimeContext;
  correlationId?: string;
  sessionId?: string;
  fingerprint?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Context that may be attached to a capture call or held on the instance and
 * merged into every emitted event.
 */
export interface DiagnosticContext {
  category?: DiagnosticCategory;
  severity?: DiagnosticSeverity;
  source?: string;
  operation?: string;
  component?: DiagnosticComponentContext;
  form?: DiagnosticFormContext;
  route?: DiagnosticRouteContext;
  correlationId?: string;
  metadata?: Record<string, unknown>;
  /** Optional HTTP status used to help classify network/API errors. */
  httpStatus?: number;
}

// ---------------------------------------------------------------------------
// Reporter contract (boundary with the receiving system)
// ---------------------------------------------------------------------------

export interface DiagnosticReporter {
  report(event: DiagnosticEvent): void | Promise<void>;
  flush?(): Promise<void>;
  shutdown?(): void | Promise<void>;
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

export interface DiagnosticCaptureConfig {
  globalErrors?: boolean;
  unhandledRejections?: boolean;
  formErrors?: boolean;
}

export interface DiagnosticPrivacyConfig {
  /** Field names (case-insensitive) whose values are redacted from metadata. */
  redactFields?: string[];
  /**
   * Application-defined sanitizer applied after built-in redaction. Should be
   * pure and must not throw; throwing sanitizers are ignored defensively.
   */
  sanitize?: (metadata: Record<string, unknown>) => Record<string, unknown>;
  /** Maximum serialized payload size in bytes before truncation. */
  maxPayloadBytes?: number;
}

export interface DiagnosticSamplingConfig {
  /** Fraction of events to keep, 0..1. Defaults to 1 (keep everything). */
  rate?: number;
}

export interface DiagnosticDedupeConfig {
  /** Suppress repeated identical fingerprints within this window (ms). */
  windowMs?: number;
}

export interface DiagnosticsConfig {
  application?: DiagnosticApplicationContext;
  uiKit?: DiagnosticUiKitContext;
  reporter?: DiagnosticReporter;
  capture?: DiagnosticCaptureConfig;
  privacy?: DiagnosticPrivacyConfig;
  sampling?: DiagnosticSamplingConfig;
  dedupe?: DiagnosticDedupeConfig;
  /** Session id, if the application chooses to provide one. */
  sessionId?: string;
  /** Environment override; falls back to application.environment. */
  environment?: string;
  /** Disable diagnostics entirely (no capture, no reporting). */
  enabled?: boolean;
  /**
   * Inspect/modify a diagnostic event before it reaches the reporter. Returning
   * null suppresses the event. Runs after redaction, before the reporter.
   */
  beforeReport?: (event: DiagnosticEvent) => DiagnosticEvent | null;
  /** Application-provided classification override. */
  classify?: (
    error: unknown,
    context: DiagnosticContext,
  ) => DiagnosticCategory | undefined;
}

/**
 * Public diagnostics instance surface.
 */
export interface Diagnostics {
  captureError(error: unknown, context?: DiagnosticContext): void;
  captureEvent(event: Partial<DiagnosticEvent> & { message: string }): void;
  setContext(context: Partial<DiagnosticContext>): void;
  setCorrelationId(correlationId: string | undefined): void;
  installGlobalHandlers(): void;
  removeGlobalHandlers(): void;
  setReporter(reporter: DiagnosticReporter): void;
  flush(): Promise<void>;
  shutdown(): Promise<void>;
}
