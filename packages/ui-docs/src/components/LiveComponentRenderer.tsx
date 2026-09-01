/**
 * LiveComponentRenderer
 * 
 * Dynamically renders a component from the registry with provided props.
 * Handles missing components gracefully with fallback UI.
 */

import React, { useCallback, useState } from 'react';
import { useRegistry } from '../registry/RegistryProvider';
import { LiveComponentRendererProps } from '../types';

/**
 * Error Boundary for gracefully handling component render errors
 */
class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('Component render error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          border: '2px solid var(--wx-color-error)',
          background: 'var(--wx-color-error-light)',
          borderRadius: 'var(--wx-radius-md)',
          padding: '1rem',
        }}>
          <h4 style={{ fontWeight: 600, color: 'var(--wx-color-error)', marginBottom: '0.5rem', margin: '0 0 8px' }}>
            ❌ Component Render Error
          </h4>
          <pre style={{
            background: 'rgba(0,0,0,0.05)',
            padding: '8px',
            borderRadius: 'var(--wx-radius-sm)',
            fontSize: 'var(--wx-font-size-xs)',
            color: 'var(--wx-color-error)',
            overflowX: 'auto',
            margin: 0,
            fontFamily: 'monospace',
          }}>
            {this.state.error?.message}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * LiveComponentRenderer - Render a registered component with props
 */
export const LiveComponentRenderer: React.FC<LiveComponentRendererProps> = ({
  packageName,
  exportName,
  props = {},
  fallback = null,
  errorBoundary = true,
}) => {
  const registry = useRegistry();
  const [renderError, setRenderError] = useState<Error | null>(null);

  const Component = useCallback(() => {
    try {
      const ResolvedComponent = registry.resolve(packageName, exportName);
      return <ResolvedComponent {...props} />;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setRenderError(err);
      throw err;
    }
  }, [registry, packageName, exportName, props]);

  const content = errorBoundary ? (
    <ComponentErrorBoundary fallback={fallback}>
      <Component />
    </ComponentErrorBoundary>
  ) : (
    <Component />
  );

  if (renderError && !errorBoundary) {
    return fallback || null;
  }

  return content;
};
