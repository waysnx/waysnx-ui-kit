import type { DiagnosticEvent, DiagnosticReporter } from '../types';
import { EXPECTED_CATEGORIES } from '../types';

export interface ConsoleReporterOptions {
  /** Optional label prefix for grouped console output. */
  label?: string;
  /**
   * Minimum severity to log. Defaults to logging everything. Ordering:
   * debug < info < warning < error < fatal.
   */
  level?: DiagnosticEvent['severity'];
}

const SEVERITY_ORDER: Record<DiagnosticEvent['severity'], number> = {
  debug: 10,
  info: 20,
  warning: 30,
  error: 40,
  fatal: 50,
};

/**
 * Development-friendly reporter that logs structured events to the console.
 * Never throws; safe to use as a default in development.
 */
export function createConsoleReporter(
  options: ConsoleReporterOptions = {},
): DiagnosticReporter {
  const label = options.label ?? 'ui-diagnostics';
  const minLevel = SEVERITY_ORDER[options.level ?? 'debug'];

  return {
    report(event: DiagnosticEvent): void {
      try {
        if (typeof console === 'undefined') return;
        if (SEVERITY_ORDER[event.severity] < minLevel) return;

        const expected = (EXPECTED_CATEGORIES as readonly string[]).includes(
          event.category,
        );
        const method =
          event.severity === 'fatal' || event.severity === 'error'
            ? console.error
            : event.severity === 'warning'
              ? console.warn
              : console.info;

        const tag = `[${label}] ${event.category}${expected ? ' (expected)' : ''}`;

        if (typeof console.groupCollapsed === 'function') {
          console.groupCollapsed(`${tag}: ${event.message}`);
          method?.call(console, event);
          if (event.stack) console.log(event.stack);
          console.groupEnd?.();
        } else {
          method?.call(console, tag, event);
        }
      } catch {
        /* reporting must never crash the host application */
      }
    },
  };
}
