import type { DiagnosticEvent, DiagnosticReporter } from '../types';
import { safeStringify } from '../internal/utils';

export interface HttpReporterOptions {
  /** Endpoint that receives diagnostic events (the Diagnostics API). */
  endpoint: string;
  /** Extra headers to attach to each request (e.g. auth, tenant). */
  headers?: Record<string, string>;
  /**
   * Max events per batch flush. Defaults to 20. Events are buffered and flushed
   * asynchronously so reporting never blocks the UI.
   */
  batchSize?: number;
  /** Debounce window (ms) before an automatic flush. Defaults to 2000. */
  flushIntervalMs?: number;
  /**
   * Prefer navigator.sendBeacon when available (useful on page unload).
   * Defaults to true.
   */
  useBeacon?: boolean;
  /** Optional hook invoked when a delivery attempt fails. Must not throw. */
  onError?: (error: unknown) => void;
}

/**
 * Standard HTTP reporter. Buffers events and delivers them asynchronously via
 * fetch (keepalive) or sendBeacon. All network work is best-effort: delivery
 * failures are swallowed and never propagate to the host application.
 *
 * The UI library performs: DiagnosticEvent -> HTTP Reporter -> POST endpoint.
 * The receiving API owns auth, validation, storage, retention, and review.
 */
export function createHttpReporter(
  options: HttpReporterOptions,
): DiagnosticReporter {
  const {
    endpoint,
    headers = {},
    batchSize = 20,
    flushIntervalMs = 2000,
    useBeacon = true,
    onError,
  } = options;

  let buffer: DiagnosticEvent[] = [];
  let timer: ReturnType<typeof setTimeout> | undefined;

  const reportError = (error: unknown) => {
    if (typeof onError === 'function') {
      try {
        onError(error);
      } catch {
        /* ignore */
      }
    }
  };

  const clearTimer = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  const send = async (events: DiagnosticEvent[]): Promise<void> => {
    if (events.length === 0) return;
    const payload = safeStringify({ events });

    // Prefer sendBeacon for resilience on unload; it is fire-and-forget.
    if (
      useBeacon &&
      typeof navigator !== 'undefined' &&
      typeof navigator.sendBeacon === 'function'
    ) {
      try {
        const blob = new Blob([payload], { type: 'application/json' });
        const ok = navigator.sendBeacon(endpoint, blob);
        if (ok) return;
      } catch {
        /* fall through to fetch */
      }
    }

    if (typeof fetch === 'function') {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...headers },
          body: payload,
          keepalive: true,
          credentials: 'same-origin',
        });
      } catch (error) {
        reportError(error);
      }
      return;
    }

    reportError(new Error('No transport available for diagnostics delivery'));
  };

  const flush = async (): Promise<void> => {
    clearTimer();
    if (buffer.length === 0) return;
    const events = buffer;
    buffer = [];
    await send(events);
  };

  const scheduleFlush = () => {
    if (timer !== undefined) return;
    timer = setTimeout(() => {
      void flush();
    }, flushIntervalMs);
    // Do not keep a Node process alive because of diagnostics.
    if (typeof timer === 'object' && timer && 'unref' in timer) {
      (timer as { unref?: () => void }).unref?.();
    }
  };

  return {
    report(event: DiagnosticEvent): void {
      try {
        buffer.push(event);
        if (buffer.length >= batchSize) {
          void flush();
        } else {
          scheduleFlush();
        }
      } catch (error) {
        reportError(error);
      }
    },
    flush,
    async shutdown(): Promise<void> {
      await flush();
    },
  };
}
