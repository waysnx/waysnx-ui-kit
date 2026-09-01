import type { DiagnosticEvent, DiagnosticReporter } from '../types';

/** A reporter that does nothing. Useful as a safe default and in tests. */
export function createNoopReporter(): DiagnosticReporter {
  return {
    report(): void {
      /* intentionally empty */
    },
  };
}

/**
 * A reporter that records events in memory. Intended for tests and debugging;
 * not for production use.
 */
export interface MemoryReporter extends DiagnosticReporter {
  readonly events: ReadonlyArray<DiagnosticEvent>;
  clear(): void;
}

export function createMemoryReporter(): MemoryReporter {
  const events: DiagnosticEvent[] = [];
  return {
    events,
    report(event: DiagnosticEvent): void {
      events.push(event);
    },
    clear(): void {
      events.length = 0;
    },
  };
}

/**
 * Fan out each event to multiple reporters. A failing reporter never prevents
 * the others from receiving the event.
 */
export function composeReporters(
  ...reporters: DiagnosticReporter[]
): DiagnosticReporter {
  const active = reporters.filter(Boolean);
  return {
    report(event: DiagnosticEvent): void {
      for (const reporter of active) {
        try {
          void reporter.report(event);
        } catch {
          /* isolate reporter failures */
        }
      }
    },
    async flush(): Promise<void> {
      await Promise.all(
        active.map(async (r) => {
          try {
            await r.flush?.();
          } catch {
            /* ignore */
          }
        }),
      );
    },
    async shutdown(): Promise<void> {
      await Promise.all(
        active.map(async (r) => {
          try {
            await r.shutdown?.();
          } catch {
            /* ignore */
          }
        }),
      );
    },
  };
}
