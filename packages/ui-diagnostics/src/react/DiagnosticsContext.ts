import { createContext, useContext } from 'react';
import type { Diagnostics } from '../types';

/**
 * React context carrying the active diagnostics instance. Null when no provider
 * is present, which lets consumers degrade gracefully.
 */
export const DiagnosticsContext = createContext<Diagnostics | null>(null);

/**
 * Access the current diagnostics instance. Returns null when used outside a
 * DiagnosticsProvider so callers can no-op safely.
 */
export function useDiagnostics(): Diagnostics | null {
  return useContext(DiagnosticsContext);
}
