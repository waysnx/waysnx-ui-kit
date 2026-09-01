/**
 * @waysnx/ui-diagnostics/react — React integration entry point.
 *
 * Re-exports the framework-agnostic core plus React-specific bindings.
 */

export * from './index';

export { DiagnosticsProvider } from './react/DiagnosticsProvider';
export type { DiagnosticsProviderProps } from './react/DiagnosticsProvider';
export { DiagnosticsErrorBoundary } from './react/DiagnosticsErrorBoundary';
export type { DiagnosticsErrorBoundaryProps } from './react/DiagnosticsErrorBoundary';
export { DiagnosticsContext, useDiagnostics } from './react/DiagnosticsContext';
export { useCaptureError } from './react/useCaptureError';
