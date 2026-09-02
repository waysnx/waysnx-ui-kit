/**
 * TurnstileCaptcha Component
 * 
 * Cloudflare Turnstile CAPTCHA integration.
 */

import React, { useRef, useEffect } from 'react';

export interface TurnstileCaptchaProps {
  /**
   * Sitekey from Cloudflare Turnstile
   */
  siteKey?: string;
  /**
   * Callback when verification succeeds
   */
  onVerify?: (token: string) => void;
  /**
   * Theme (light or dark)
   */
  theme?: 'light' | 'dark';
  /**
   * Size (normal or compact)
   */
  size?: 'normal' | 'compact';
}

/**
 * TurnstileCaptcha - Cloudflare Turnstile integration
 */
export const TurnstileCaptcha: React.FC<TurnstileCaptchaProps> = ({
  siteKey,
  onVerify,
  theme = 'light',
  size = 'normal',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<string>('');

  useEffect(() => {
    if (!siteKey) {
      setError('Cloudflare Turnstile siteKey is required');
      return;
    }

    // Load Cloudflare Turnstile script
    if (!window.turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        setIsLoaded(true);
      };

      script.onerror = () => {
        setError('Failed to load Cloudflare Turnstile');
      };
    } else {
      setIsLoaded(true);
    }
  }, [siteKey]);

  useEffect(() => {
    if (isLoaded && window.turnstile && containerRef.current && siteKey) {
      try {
        window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: theme,
          size: size,
          callback: onVerify,
        });
      } catch (err) {
        setError('Failed to render Turnstile');
      }
    }
  }, [isLoaded, siteKey, theme, size, onVerify]);

  if (error) {
    return (
      <div
        style={{
          padding: '1rem',
          backgroundColor: 'var(--color-danger, #f8d7da)',
          borderRadius: '0.375rem',
        }}
      >
        <span style={{ fontSize: '0.875rem', color: 'white' }}>
          {error}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
      }}
    />
  );
};

TurnstileCaptcha.displayName = 'TurnstileCaptcha';

export default TurnstileCaptcha;

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: any) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}
