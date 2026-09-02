import React from 'react';
import { warn } from '../../dev';
import './IFrame.css';

export interface IFrameProps {
  /** URL to embed — must be https:// */
  src: string;
  /** Accessibility title (required) */
  title: string;
  /** Optional label above the iframe */
  label?: string;
  /** Width of the iframe (default: 100%) */
  width?: string | number;
  /** Height of the iframe (default: 400px) */
  height?: string | number;
  /** Allow fullscreen */
  allowFullscreen?: boolean;
  /**
   * Sandbox restrictions applied to the embedded content.
   *
   * Defaults to a restrictive policy (`DEFAULT_SANDBOX`) so the component is
   * secure-by-default, matching its documented contract of isolating
   * third-party content. Pass a custom space-separated token string to widen
   * or narrow the policy, or an empty string (`""`) to apply the most
   * restrictive sandbox (all permissions denied).
   *
   * Note: intentionally does NOT combine `allow-scripts` with
   * `allow-same-origin` by default, since together they let framed content
   * remove its own sandbox.
   */
  sandbox?: string;
  /** Hint text below the iframe */
  hint?: string;
  /** CSS class name */
  className?: string;
  testId?: string;
}

/**
 * Secure-by-default sandbox policy.
 *
 * Supports the documented use cases (embedded video, maps, forms, third-party
 * widgets) while keeping the frame isolated. `allow-same-origin` is deliberately
 * omitted because combining it with `allow-scripts` would let the framed
 * document script its way out of the sandbox.
 */
export const DEFAULT_SANDBOX = 'allow-scripts allow-popups allow-forms allow-presentation';

export function IFrame({
  src,
  title,
  label,
  width = '100%',
  height = 400,
  allowFullscreen = false,
  sandbox = DEFAULT_SANDBOX,
  hint,
  className,
  testId,
}: IFrameProps) {
  warn(src.startsWith('https://'), 'IFrame: src should use https:// for security');

  // Enforce https-only — do not render iframe for unsafe URLs
  const safeSrc = src.startsWith('https://') ? src : '';

  return (
    <div className={`wx-iframe-wrapper ${className || ''}`} data-testid={testId}>
      {label && <label className="wx-iframe-label">{label}</label>}
      <div className="wx-iframe-container">
        <iframe
          className="wx-iframe"
          src={safeSrc}
          title={title}
          width={width}
          height={height}
          allowFullScreen={allowFullscreen}
          sandbox={sandbox}
          loading="lazy"
          style={{ height: typeof height === 'number' ? `${height}px` : height }}
        />
      </div>
      {hint && <div className="wx-iframe-hint">{hint}</div>}
    </div>
  );
}
