import { useCallback } from 'react';
import type { DiagnosticContext } from '../types';
import { useDiagnostics } from './DiagnosticsContext';

/**
 * Convenience hook returning a stable capture callback bound to the diagnostics
 * instance from context. No-ops safely when no provider is present.
 */
export function useCaptureError(): (
  error: unknown,
  context?: DiagnosticContext,
) => void {
  const diagnostics = useDiagnostics();
  return useCallback(
    (error: unknown, context?: DiagnosticContext) => {
      diagnostics?.captureError(error, context);
    },
    [diagnostics],
  );
}
