import type {
  Diagnostics,
  DiagnosticContext,
  DiagnosticEvent,
  DiagnosticReporter,
  DiagnosticsConfig,
  DiagnosticSeverity,
} from './types';
import { EXPECTED_CATEGORIES } from './types';
import { classifyError } from './internal/classifier';
import { collectRouteContext, collectRuntimeContext } from './internal/enrichment';
import { computeFingerprint } from './internal/fingerprint';
import { applyPrivacy } from './internal/privacy';
import { Throttle } from './internal/throttle';
import {
  generateId,
  normalizeError,
  nowIso,
  runSafely,
} from './internal/utils';
import { createConsoleReporter } from './reporters/consoleReporter';
import { createNoopReporter } from './reporters/utilityReporters';

const UI_KIT_PACKAGE = '@waysnx/ui-diagnostics';

/** Default severity per category: expected errors are info/warning, not errors. */
function defaultSeverity(category: DiagnosticEvent['category']): DiagnosticSeverity {
  if ((EXPECTED_CATEGORIES as readonly string[]).includes(category)) {
    if (category === 'AUTHENTICATION' || category === 'AUTHORIZATION') return 'warning';
    return 'info';
  }
  return 'error';
}

/**
 * Create a diagnostics instance. Framework-agnostic; safe to construct on the
 * server (no global handlers are installed until installGlobalHandlers is run).
 */
export function createDiagnostics(config: DiagnosticsConfig = {}): Diagnostics {
  const enabled = config.enabled !== false;

  let reporter: DiagnosticReporter =
    config.reporter ??
    (isDevelopment(config) ? createConsoleReporter() : createNoopReporter());

  const throttle = new Throttle(config.sampling, config.dedupe);

  // Mutable instance-level context merged into every event.
  const baseContext: Partial<DiagnosticContext> = {};
  let correlationId: string | undefined;

  // Guards against recursive reporting loops.
  let reporting = false;

  // Global handler references, kept so they can be removed later.
  let onErrorHandler: ((event: ErrorEvent) => void) | undefined;
  let onRejectionHandler: ((event: PromiseRejectionEvent) => void) | undefined;
  let handlersInstalled = false;

  function buildEvent(
    error: unknown,
    context: DiagnosticContext,
    partial?: Partial<DiagnosticEvent>,
  ): DiagnosticEvent {
    const merged: DiagnosticContext = { ...baseContext, ...context };
    const normalized = normalizeError(error);

    // Application override first, then built-in classification.
    let category = merged.category;
    if (!category && typeof config.classify === 'function') {
      runSafely(() => {
        const override = config.classify!(error, merged);
        if (override) category = override;
      });
    }
    if (!category) category = classifyError(error, merged);

    const severity = merged.severity ?? partial?.severity ?? defaultSeverity(category);

    const event: DiagnosticEvent = {
      id: generateId(),
      timestamp: nowIso(),
      category,
      severity,
      message: partial?.message ?? normalized.message,
      errorName: partial?.errorName ?? normalized.name,
      stack: partial?.stack ?? normalized.stack,
      source: merged.source ?? partial?.source,
      operation: merged.operation ?? partial?.operation,
      application: config.application,
      uiKit: config.uiKit ?? { package: UI_KIT_PACKAGE },
      component: merged.component ?? partial?.component,
      form: merged.form ?? partial?.form,
      route: merged.route ?? collectRouteContext(),
      runtime: collectRuntimeContext(),
      correlationId: merged.correlationId ?? correlationId,
      sessionId: config.sessionId,
      metadata: merged.metadata ?? partial?.metadata,
    };

    event.fingerprint = computeFingerprint(event);
    return event;
  }

  function emit(event: DiagnosticEvent): void {
    if (!enabled) return;
    if (reporting) return; // prevent recursive diagnostic failures

    runSafely(() => {
      // Sampling + dedupe based on the stable fingerprint.
      const fingerprint = event.fingerprint ?? computeFingerprint(event);
      if (!throttle.shouldReport(fingerprint)) return;

      // Privacy/redaction and payload limits run before beforeReport, so
      // applications cannot accidentally re-expose redacted defaults.
      let finalEvent = applyPrivacy(event, config.privacy);

      if (typeof config.beforeReport === 'function') {
        let result: DiagnosticEvent | null = finalEvent;
        let suppressed = false;
        runSafely(() => {
          const out = config.beforeReport!(finalEvent);
          if (out === null) {
            suppressed = true;
          } else if (out) {
            result = out;
          }
        });
        if (suppressed) return;
        finalEvent = result;
      }

      reporting = true;
      try {
        void Promise.resolve(reporter.report(finalEvent)).catch(() => {
          /* reporter failures must never crash the application */
        });
      } finally {
        reporting = false;
      }
    });
  }

  const instance: Diagnostics = {
    captureError(error: unknown, context: DiagnosticContext = {}): void {
      if (!enabled) return;
      runSafely(() => emit(buildEvent(error, context)));
    },

    captureEvent(event: Partial<DiagnosticEvent> & { message: string }): void {
      if (!enabled) return;
      runSafely(() => {
        const context: DiagnosticContext = {
          category: event.category,
          severity: event.severity,
          source: event.source,
          operation: event.operation,
          component: event.component,
          form: event.form,
          metadata: event.metadata,
        };
        emit(buildEvent(new Error(event.message), context, event));
      });
    },

    setContext(context: Partial<DiagnosticContext>): void {
      Object.assign(baseContext, context);
    },

    setCorrelationId(id: string | undefined): void {
      correlationId = id;
    },

    installGlobalHandlers(): void {
      if (handlersInstalled) return; // avoid duplicate handlers
      if (typeof window === 'undefined') return;

      const capture = config.capture ?? {};

      if (capture.globalErrors !== false) {
        onErrorHandler = (event: ErrorEvent) => {
          runSafely(() => {
            const err =
              event.error ?? new Error(event.message || 'Uncaught error');
            instance.captureError(err, {
              category: 'UI_RUNTIME',
              source: event.filename,
            });
          });
        };
        window.addEventListener('error', onErrorHandler);
      }

      if (capture.unhandledRejections !== false) {
        onRejectionHandler = (event: PromiseRejectionEvent) => {
          runSafely(() => {
            instance.captureError(event.reason ?? new Error('Unhandled rejection'), {
              category: 'UNHANDLED_REJECTION',
            });
          });
        };
        window.addEventListener('unhandledrejection', onRejectionHandler);
      }

      handlersInstalled = true;
    },

    removeGlobalHandlers(): void {
      if (typeof window === 'undefined') return;
      if (onErrorHandler) {
        window.removeEventListener('error', onErrorHandler);
        onErrorHandler = undefined;
      }
      if (onRejectionHandler) {
        window.removeEventListener('unhandledrejection', onRejectionHandler);
        onRejectionHandler = undefined;
      }
      handlersInstalled = false;
    },

    setReporter(next: DiagnosticReporter): void {
      if (next) reporter = next;
    },

    async flush(): Promise<void> {
      await Promise.resolve(reporter.flush?.()).catch(() => undefined);
    },

    async shutdown(): Promise<void> {
      instance.removeGlobalHandlers();
      await Promise.resolve(reporter.shutdown?.()).catch(() => undefined);
    },
  };

  return instance;
}

function isDevelopment(config: DiagnosticsConfig): boolean {
  const env = config.environment ?? config.application?.environment;
  if (env) return env === 'development' || env === 'dev' || env === 'local';
  try {
    const nodeEnv =
      typeof process !== 'undefined' ? process.env?.NODE_ENV : undefined;
    return nodeEnv !== 'production';
  } catch {
    return false;
  }
}
