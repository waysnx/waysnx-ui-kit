/**
 * @waysnx/ui-diagnostics — framework-agnostic core entry point.
 *
 * React integration is available from "@waysnx/ui-diagnostics/react".
 */

export { createDiagnostics } from './core';

export { classifyError, classifyHttpStatus } from './internal/classifier';
export { computeFingerprint } from './internal/fingerprint';

export { createConsoleReporter } from './reporters/consoleReporter';
export type { ConsoleReporterOptions } from './reporters/consoleReporter';
export { createHttpReporter } from './reporters/httpReporter';
export type { HttpReporterOptions } from './reporters/httpReporter';
export {
  createNoopReporter,
  createMemoryReporter,
  composeReporters,
} from './reporters/utilityReporters';
export type { MemoryReporter } from './reporters/utilityReporters';

export {
  captureFormSubmissionError,
  captureFormValidationError,
  captureRuleEngineError,
  captureSchemaError,
} from './form';
export type { FormDiagnosticsInfo } from './form';

export { EXPECTED_CATEGORIES } from './types';
export type {
  Diagnostics,
  DiagnosticsConfig,
  DiagnosticEvent,
  DiagnosticCategory,
  ExpectedDiagnosticCategory,
  UnexpectedDiagnosticCategory,
  DiagnosticSeverity,
  DiagnosticReporter,
  DiagnosticContext,
  DiagnosticCaptureConfig,
  DiagnosticPrivacyConfig,
  DiagnosticSamplingConfig,
  DiagnosticDedupeConfig,
  DiagnosticApplicationContext,
  DiagnosticUiKitContext,
  DiagnosticComponentContext,
  DiagnosticFormContext,
  DiagnosticRouteContext,
  DiagnosticRuntimeContext,
} from './types';
