import React, { useEffect, useMemo, useRef } from 'react';
import type { Diagnostics, DiagnosticsConfig } from '../types';
import { createDiagnostics } from '../core';
import { DiagnosticsContext } from './DiagnosticsContext';

export interface DiagnosticsProviderProps {
  children: React.ReactNode;
  /** A pre-built diagnostics instance. Takes precedence over `config`. */
  diagnostics?: Diagnostics;
  /** Config used to create an instance when one is not supplied. */
  config?: DiagnosticsConfig;
  /**
   * Install global JS error / unhandled-rejection handlers on mount and remove
   * them on unmount. Defaults to false so tests and micro-frontends stay in
   * control.
   */
  installGlobalHandlers?: boolean;
}

/**
 * Provides a diagnostics instance to the React tree. Either pass an existing
 * `diagnostics` instance or a `config` from which one is created (once).
 */
export function DiagnosticsProvider({
  children,
  diagnostics,
  config,
  installGlobalHandlers = false,
}: DiagnosticsProviderProps): React.ReactElement {
  // Create at most once when relying on config; a supplied instance wins.
  const createdRef = useRef<Diagnostics | null>(null);

  const instance = useMemo<Diagnostics>(() => {
    if (diagnostics) return diagnostics;
    if (!createdRef.current) {
      createdRef.current = createDiagnostics(config ?? {});
    }
    return createdRef.current;
    // Recreate only if a different explicit instance is passed.
  }, [diagnostics, config]);

  useEffect(() => {
    if (!installGlobalHandlers) return;
    instance.installGlobalHandlers();
    return () => {
      instance.removeGlobalHandlers();
    };
  }, [instance, installGlobalHandlers]);

  return (
    <DiagnosticsContext.Provider value={instance}>
      {children}
    </DiagnosticsContext.Provider>
  );
}
