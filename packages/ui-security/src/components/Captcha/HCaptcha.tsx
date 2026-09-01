/**
 * HCaptcha Component
 * 
 * hCaptcha CAPTCHA integration.
 */

import React, { useRef, useEffect } from 'react';


export interface HCaptchaProps {
  /**
   * Sitekey from hCaptcha
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
 * HCaptcha - hCaptcha integration
 */
export const HCaptcha: React.FC<HCaptchaProps> = ({
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
      setError('hCaptcha siteKey is required');
      return;
    }

    // Load hCaptcha script
    if (!window.hcaptcha) {
      const script = document.createElement('script');
      script.src = 'https://js.hcaptcha.com/1/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        setIsLoaded(true);
      };

      script.onerror = () => {
        setError('Failed to load hCaptcha');
      };
    } else {
      setIsLoaded(true);
    }
  }, [siteKey]);

  useEffect(() => {
    if (isLoaded && window.hcaptcha && containerRef.current && siteKey) {
      try {
        window.hcaptcha.render(containerRef.current, {
          sitekey: siteKey,
          theme: theme,
          size: size,
          callback: onVerify,
        });
      } catch (err) {
        setError('Failed to render hCaptcha');
      }
    }
  }, [isLoaded, siteKey, theme, size, onVerify]);

  if (error) {
    return (
      <div
        padding="md"
        backgroundColor="danger"
        borderRadius="md"
      >
        <span fontSize="sm" color="white">
          {error}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      display="flex"
      justifyContent="center"
      padding="md"
    />
  );
};

HCaptcha.displayName = 'HCaptcha';

export default HCaptcha;

declare global {
  interface Window {
  [key: string]: any;
    hcaptcha?: {
      render: (container: HTMLElement, options: any) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}
