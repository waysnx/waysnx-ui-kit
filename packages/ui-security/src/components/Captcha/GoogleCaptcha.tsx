/**
 * GoogleCaptcha Component
 * 
 * Google reCAPTCHA integration component.
 */

import React, { useRef, useEffect } from 'react';


export interface GoogleCaptchaProps {
  /**
   * Sitekey from Google reCAPTCHA
   */
  siteKey?: string;
  /**
   * Callback when verification succeeds
   */
  onVerify?: (token: string) => void;
  /**
   * Callback on verification failure
   */
  onError?: (error: Error) => void;
  /**
   * Theme (light or dark)
   */
  theme?: 'light' | 'dark';
  /**
   * Size (normal, compact, invisible)
   */
  size?: 'normal' | 'compact' | 'invisible';
}

/**
 * GoogleCaptcha - Google reCAPTCHA v3 integration
 */
export const GoogleCaptcha: React.FC<GoogleCaptchaProps> = ({
  siteKey,
  onVerify,
  onError,
  theme = 'light',
  size = 'normal',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<string>('');

  useEffect(() => {
    if (!siteKey) {
      setError('Google reCAPTCHA siteKey is required');
      return;
    }

    // Load Google reCAPTCHA script
    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        setIsLoaded(true);
      };

      script.onerror = () => {
        const err = new Error('Failed to load Google reCAPTCHA');
        setError(err.message);
        onError?.(err);
      };
    } else {
      setIsLoaded(true);
    }
  }, [siteKey, onError]);

  useEffect(() => {
    if (isLoaded && window.grecaptcha && containerRef.current && siteKey) {
      try {
        window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          theme: theme,
          size: size,
          callback: onVerify,
          'error-callback': onError,
        });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to render reCAPTCHA');
        setError(error.message);
        onError?.(error);
      }
    }
  }, [isLoaded, siteKey, theme, size, onVerify, onError]);

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

GoogleCaptcha.displayName = 'GoogleCaptcha';

export default GoogleCaptcha;

// Extend window interface for grecaptcha
declare global {
  interface Window {
  [key: string]: any;
    grecaptcha?: {
      render: (container: HTMLElement, options: any) => void;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}
