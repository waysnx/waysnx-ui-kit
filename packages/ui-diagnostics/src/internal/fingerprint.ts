import type { DiagnosticEvent } from '../types';

/**
 * Derive a stable fingerprint used to group repeated occurrences of the same
 * underlying error. Volatile data (ids, timestamps, values) is excluded.
 */

/** Normalize a stack trace by removing volatile numeric noise and blank lines. */
function normalizeStack(stack?: string): string {
  if (!stack) return '';
  return stack
    .split('\n')
    .slice(0, 5) // top frames are the most stable signal
    .map((line) =>
      line
        .trim()
        // Strip absolute/query-bearing URLs down to the file name.
        .replace(/https?:\/\/[^\s)]+\/([^/\s):]+)/g, '$1')
        // Remove :line:column suffixes which shift across builds.
        .replace(/:\d+:\d+/g, '')
        .replace(/:\d+/g, ''),
    )
    .filter(Boolean)
    .join('|');
}

/** Normalize a message by stripping numbers, quotes, and long hex/uuid tokens. */
function normalizeMessage(message?: string): string {
  if (!message) return '';
  return message
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, '<uuid>')
    .replace(/\b\d+\b/g, '<n>')
    .replace(/["'`]/g, '')
    .trim()
    .slice(0, 200);
}

/**
 * Compute a fingerprint from category, error name, source, component, operation,
 * and a normalized message/stack. Returns a `::`-delimited string.
 */
export function computeFingerprint(event: DiagnosticEvent): string {
  const parts = [
    event.category,
    event.errorName ?? '',
    event.component?.name ?? event.source ?? '',
    event.operation ?? event.form?.operation ?? '',
    normalizeStack(event.stack) || normalizeMessage(event.message),
  ];
  return parts.join('::');
}
