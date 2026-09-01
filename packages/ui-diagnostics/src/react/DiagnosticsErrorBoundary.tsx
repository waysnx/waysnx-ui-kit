import React from 'react';
import type { Diagnostics, DiagnosticCategory } from '../types';
import { DiagnosticsContext } from './DiagnosticsContext';

export interface DiagnosticsErrorBoundaryProps {
  children: React.ReactNode;
  /** Logical component name attached to captured render errors. */
  component?: string;
  /**
   * Category used for captured render errors. Defaults to COMPONENT. Use RENDER
   * or FORM where more specific.
   */
  category?: DiagnosticCategory;
  /**
   * Fallback UI. Either a static node or a render function receiving the error
   * and a reset callback. The library does not impose a default fallback UX.
   */
  fallback?:
    | React.ReactNode
    | ((error: Error, reset: () => void) => React.ReactNode);
  /** Set false to skip reporting (e.g. in specific environments). */
  report?: boolean;
  /** Optional callback invoked after an error is caught. */
  onError?: (error: Error, info: { componentStack: string }) => void;
  /**
   * Diagnostics instance override. When omitted, the boundary reads the nearest
   * DiagnosticsProvider from context.
   */
  diagnostics?: Diagnostics;
}

interface DiagnosticsErrorBoundaryState {
  error: Error | null;
}

/**
 * Reusable diagnostic error boundary. Captures render/lifecycle errors, reports
 * them through the configured diagnostics instance, preserves normal React
 * error-boundary behavior, and supports application-supplied fallback UI.
 */
export class DiagnosticsErrorBoundary extends React.Component<
  DiagnosticsErrorBoundaryProps,
  DiagnosticsErrorBoundaryState
> {
  static contextType = DiagnosticsContext;
  declare context: React.ContextType<typeof DiagnosticsContext>;

  state: DiagnosticsErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): DiagnosticsErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }): void {
    const { component, category = 'COMPONENT', report = true, onError } = this.props;

    if (report !== false) {
      // Prefer an explicit instance, else the one from context.
      const diagnostics = this.props.diagnostics ?? this.context ?? null;
      try {
        diagnostics?.captureError(error, {
          category,
          source: component,
          component: component ? { name: component } : undefined,
          metadata: { componentStack: info?.componentStack },
        });
      } catch {
        /* never let reporting break the boundary */
      }
    }

    if (typeof onError === 'function') {
      try {
        onError(error, info);
      } catch {
        /* ignore */
      }
    }
  }

  reset = (): void => {
    this.setState({ error: null });
  };

  render(): React.ReactNode {
    const { error } = this.state;
    if (error) {
      const { fallback } = this.props;
      if (typeof fallback === 'function') {
        return (fallback as (e: Error, reset: () => void) => React.ReactNode)(
          error,
          this.reset,
        );
      }
      return fallback ?? null;
    }
    return this.props.children;
  }
}
