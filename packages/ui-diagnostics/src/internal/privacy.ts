import type { DiagnosticEvent, DiagnosticPrivacyConfig } from '../types';
import { byteLength, runSafely, safeStringify } from './utils';

/**
 * Privacy / redaction pipeline stage. Follows data-minimization by default:
 * a curated set of sensitive field names is always redacted, in addition to any
 * application-configured fields.
 */

const DEFAULT_SENSITIVE_FIELDS = [
  'password',
  'passwd',
  'pwd',
  'token',
  'accesstoken',
  'refreshtoken',
  'authorization',
  'auth',
  'cookie',
  'session',
  'secret',
  'apikey',
  'api_key',
  'creditcard',
  'cardnumber',
  'cvv',
  'cvc',
  'ssn',
  'securityanswer',
  'pin',
];

const REDACTED = '[REDACTED]';
const DEFAULT_MAX_PAYLOAD_BYTES = 64 * 1024; // 64 KB

function buildSensitiveSet(extra?: string[]): Set<string> {
  const set = new Set<string>(DEFAULT_SENSITIVE_FIELDS);
  if (extra) {
    for (const field of extra) {
      if (typeof field === 'string') set.add(field.toLowerCase());
    }
  }
  return set;
}

function isSensitiveKey(key: string, sensitive: Set<string>): boolean {
  const normalized = key.toLowerCase().replace(/[\s_-]/g, '');
  if (sensitive.has(key.toLowerCase())) return true;
  // Substring match against normalized sensitive tokens.
  for (const token of sensitive) {
    const normToken = token.replace(/[\s_-]/g, '');
    if (normToken.length >= 3 && normalized.includes(normToken)) return true;
  }
  return false;
}

/** Recursively redact sensitive keys within an arbitrary metadata object. */
function redactValue(
  value: unknown,
  sensitive: Set<string>,
  seen: WeakSet<object>,
  depth: number,
): unknown {
  if (depth > 8) return '[MaxDepth]';
  if (value === null || typeof value !== 'object') return value;

  if (seen.has(value as object)) return '[Circular]';
  seen.add(value as object);

  if (Array.isArray(value)) {
    return value.map((item) => redactValue(item, sensitive, seen, depth + 1));
  }

  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    if (isSensitiveKey(key, sensitive)) {
      result[key] = REDACTED;
    } else {
      result[key] = redactValue(val, sensitive, seen, depth + 1);
    }
  }
  return result;
}

/**
 * Apply redaction, an optional application sanitizer, and payload-size limits to
 * an event's metadata. Always returns a new event object; never throws.
 */
export function applyPrivacy(
  event: DiagnosticEvent,
  config: DiagnosticPrivacyConfig = {},
): DiagnosticEvent {
  const sensitive = buildSensitiveSet(config.redactFields);
  let metadata = event.metadata;

  if (metadata && typeof metadata === 'object') {
    metadata = redactValue(metadata, sensitive, new WeakSet(), 0) as Record<
      string,
      unknown
    >;

    if (typeof config.sanitize === 'function') {
      runSafely(() => {
        const sanitized = config.sanitize!(metadata as Record<string, unknown>);
        if (sanitized && typeof sanitized === 'object') {
          metadata = sanitized;
        }
      });
    }
  }

  const next: DiagnosticEvent = { ...event, metadata };
  return enforcePayloadLimit(next, config.maxPayloadBytes ?? DEFAULT_MAX_PAYLOAD_BYTES);
}

/**
 * Enforce a maximum serialized size. Oversized metadata is dropped (with a
 * marker) and, if still too large, the stack is truncated.
 */
function enforcePayloadLimit(
  event: DiagnosticEvent,
  maxBytes: number,
): DiagnosticEvent {
  if (maxBytes <= 0) return event;

  let serialized = safeStringify(event);
  if (byteLength(serialized) <= maxBytes) return event;

  const trimmed: DiagnosticEvent = {
    ...event,
    metadata: { _truncated: true, _reason: 'payload-size-limit' },
  };

  serialized = safeStringify(trimmed);
  if (byteLength(serialized) <= maxBytes) return trimmed;

  if (trimmed.stack) {
    trimmed.stack = trimmed.stack.slice(0, 2000) + '\n[...stack truncated]';
  }
  return trimmed;
}
