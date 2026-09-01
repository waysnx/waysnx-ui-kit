/**
 * Small, dependency-free helpers used across the diagnostics pipeline.
 * Everything here must be browser-safe and must never throw on malformed input.
 */

/** Generate a browser-safe UUID v4-ish identifier without external deps. */
export function generateId(): string {
  // Prefer the platform crypto UUID when available.
  const cryptoObj =
    typeof globalThis !== 'undefined'
      ? (globalThis.crypto as Crypto | undefined)
      : undefined;

  if (cryptoObj && typeof cryptoObj.randomUUID === 'function') {
    try {
      return cryptoObj.randomUUID();
    } catch {
      /* fall through to manual generation */
    }
  }

  if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
    const bytes = new Uint8Array(16);
    cryptoObj.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex: string[] = [];
    for (let i = 0; i < 16; i++) hex.push(bytes[i].toString(16).padStart(2, '0'));
    return (
      hex.slice(0, 4).join('') +
      '-' +
      hex.slice(4, 6).join('') +
      '-' +
      hex.slice(6, 8).join('') +
      '-' +
      hex.slice(8, 10).join('') +
      '-' +
      hex.slice(10, 16).join('')
    );
  }

  // Last-resort, non-cryptographic fallback.
  const rand = () => Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0');
  return `${rand()}${rand()}-${rand()}-4${rand().slice(1)}-${rand()}-${rand()}${rand()}${rand()}`;
}

/** ISO timestamp; guarded against exotic host environments. */
export function nowIso(): string {
  try {
    return new Date().toISOString();
  } catch {
    return String(Date.now());
  }
}

/** Normalize an unknown thrown value into name/message/stack. */
export function normalizeError(error: unknown): {
  name?: string;
  message: string;
  stack?: string;
} {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message || error.name || 'Error',
      stack: typeof error.stack === 'string' ? error.stack : undefined,
    };
  }

  if (typeof error === 'string') {
    return { message: error };
  }

  if (error && typeof error === 'object') {
    const anyErr = error as Record<string, unknown>;
    const message =
      typeof anyErr.message === 'string' ? anyErr.message : safeStringify(error);
    const name = typeof anyErr.name === 'string' ? anyErr.name : undefined;
    const stack = typeof anyErr.stack === 'string' ? anyErr.stack : undefined;
    return { name, message, stack };
  }

  return { message: safeStringify(error) };
}

/** JSON.stringify that never throws (handles cycles and BigInt). */
export function safeStringify(value: unknown): string {
  try {
    const seen = new WeakSet();
    return JSON.stringify(value, (_key, val) => {
      if (typeof val === 'bigint') return val.toString();
      if (typeof val === 'function') return '[Function]';
      if (val && typeof val === 'object') {
        if (seen.has(val as object)) return '[Circular]';
        seen.add(val as object);
      }
      return val;
    });
  } catch {
    try {
      return String(value);
    } catch {
      return '[Unserializable]';
    }
  }
}

/** Byte length of a string using UTF-8 when possible. */
export function byteLength(value: string): number {
  try {
    if (typeof TextEncoder !== 'undefined') {
      return new TextEncoder().encode(value).length;
    }
  } catch {
    /* fall through */
  }
  // Rough fallback.
  return value.length;
}

/** Run a callback, swallowing any error. Used to keep diagnostics non-fatal. */
export function runSafely(fn: () => void): void {
  try {
    fn();
  } catch {
    /* diagnostics must never crash the host application */
  }
}
