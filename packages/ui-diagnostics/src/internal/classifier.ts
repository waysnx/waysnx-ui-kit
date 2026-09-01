import type { DiagnosticCategory, DiagnosticContext } from '../types';
import { normalizeError } from './utils';

/**
 * Map an HTTP status code to an expected error category.
 * A 500 is an API_ERROR, not automatically a UI defect.
 */
export function classifyHttpStatus(status: number): DiagnosticCategory {
  if (status === 401) return 'AUTHENTICATION';
  if (status === 403) return 'AUTHORIZATION';
  if (status === 404) return 'NOT_FOUND';
  if (status === 409) return 'CONFLICT';
  if (status === 400 || status === 422) return 'VALIDATION';
  if (status >= 400 && status < 500) return 'API_ERROR';
  if (status >= 500) return 'API_ERROR';
  return 'API_ERROR';
}

/** Heuristics for recognizing network-level failures. */
function looksLikeNetworkError(name?: string, message?: string): boolean {
  const haystack = `${name ?? ''} ${message ?? ''}`.toLowerCase();
  return (
    haystack.includes('networkerror') ||
    haystack.includes('failed to fetch') ||
    haystack.includes('network request failed') ||
    haystack.includes('load failed') ||
    haystack.includes('timeout') ||
    haystack.includes('timed out') ||
    haystack.includes('econnrefused') ||
    haystack.includes('err_network') ||
    haystack.includes('err_internet_disconnected')
  );
}

/**
 * Determine the diagnostic category for an error.
 *
 * Resolution order:
 * 1. Explicit category on the context.
 * 2. HTTP status on the context.
 * 3. Network-error heuristics.
 * 4. Default fallback (UNKNOWN).
 *
 * Applications can override this entirely through config.classify, which is
 * applied by the engine before this function is consulted.
 */
export function classifyError(
  error: unknown,
  context: DiagnosticContext = {},
): DiagnosticCategory {
  if (context.category) return context.category;

  if (typeof context.httpStatus === 'number') {
    return classifyHttpStatus(context.httpStatus);
  }

  const { name, message } = normalizeError(error);
  if (looksLikeNetworkError(name, message)) {
    return 'NETWORK_ERROR';
  }

  return 'UNKNOWN';
}
