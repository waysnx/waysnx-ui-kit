import type { Diagnostics, DiagnosticContext } from './types';

/**
 * Framework-agnostic form diagnostics helpers. These make form submission a
 * first-class diagnostic concern without collecting arbitrary form values.
 *
 * By default only field-level metadata (names, counts, invalid fields) is
 * captured — never raw values.
 */

export interface FormDiagnosticsInfo {
  formId?: string;
  schemaVersion?: string;
  /** Names of fields present in the form (not their values). */
  fieldsPresent?: string[];
  /** Names of fields that failed validation. */
  invalidFields?: string[];
}

function fieldMetadata(info: FormDiagnosticsInfo): Record<string, unknown> {
  const metadata: Record<string, unknown> = {};
  if (info.fieldsPresent) {
    metadata.fieldsPresent = info.fieldsPresent;
    metadata.fieldCount = info.fieldsPresent.length;
  }
  if (info.invalidFields) {
    metadata.invalidFields = info.invalidFields;
  }
  return metadata;
}

/**
 * Report a failure that occurred while processing a successful response, or an
 * unexpected exception during submission. Classified as FORM_SUBMISSION.
 */
export function captureFormSubmissionError(
  diagnostics: Diagnostics,
  error: unknown,
  info: FormDiagnosticsInfo = {},
  context: DiagnosticContext = {},
): void {
  diagnostics.captureError(error, {
    category: 'FORM_SUBMISSION',
    operation: 'submit',
    form: { formId: info.formId, schemaVersion: info.schemaVersion, operation: 'submit' },
    ...context,
    metadata: { ...fieldMetadata(info), ...(context.metadata ?? {}) },
  });
}

/**
 * Report a validation failure. This is an expected event and is not treated as
 * a UI defect.
 */
export function captureFormValidationError(
  diagnostics: Diagnostics,
  info: FormDiagnosticsInfo = {},
  context: DiagnosticContext = {},
): void {
  diagnostics.captureEvent({
    message: 'Form validation failed',
    category: 'VALIDATION',
    operation: 'validate',
    severity: 'info',
    form: { formId: info.formId, schemaVersion: info.schemaVersion, operation: 'validate' },
    metadata: { ...fieldMetadata(info), ...(context.metadata ?? {}) },
  });
}

/**
 * Report an error thrown by a conditional-rule / rule-engine evaluation.
 * Classified as RULE_ENGINE (unexpected).
 */
export function captureRuleEngineError(
  diagnostics: Diagnostics,
  error: unknown,
  info: FormDiagnosticsInfo = {},
  context: DiagnosticContext = {},
): void {
  diagnostics.captureError(error, {
    category: 'RULE_ENGINE',
    operation: 'rule-evaluation',
    form: { formId: info.formId, schemaVersion: info.schemaVersion },
    ...context,
    metadata: { ...fieldMetadata(info), ...(context.metadata ?? {}) },
  });
}

/**
 * Report a schema-processing error (e.g. invalid or unexpected schema shape).
 * Classified as SCHEMA (unexpected).
 */
export function captureSchemaError(
  diagnostics: Diagnostics,
  error: unknown,
  info: FormDiagnosticsInfo = {},
  context: DiagnosticContext = {},
): void {
  diagnostics.captureError(error, {
    category: 'SCHEMA',
    operation: 'schema-processing',
    form: { formId: info.formId, schemaVersion: info.schemaVersion },
    ...context,
    metadata: { ...fieldMetadata(info), ...(context.metadata ?? {}) },
  });
}
