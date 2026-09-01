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
  /** Sandbox restrictions e.g. "allow-scripts allow-same-origin" */
  sandbox?: string;
  /** Hint text below the iframe */
  hint?: string;
  /** CSS class name */
  className?: string;
  testId?: string;
}

export function IFrame({
  src,
  title,
  label,
  width = '100%',
  height = 400,
  allowFullscreen = false,
  sandbox,
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
