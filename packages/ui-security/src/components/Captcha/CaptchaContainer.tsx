/**
 * CaptchaContainer Component
 * 
 * Container to switch between different CAPTCHA providers.
 */

import React from 'react';

import { GoogleCaptcha } from './GoogleCaptcha';
import { TurnstileCaptcha } from './TurnstileCaptcha';
import { HCaptcha } from './HCaptcha';

export type CaptchaProvider = 'google' | 'turnstile' | 'hcaptcha';

export interface CaptchaContainerProps {
  /**
   * CAPTCHA provider to use
   */
  provider?: CaptchaProvider;
  /**
   * Site key for the provider
   */
  siteKey?: string;
  /**
   * Callback on verification
   */
  onVerify?: (token: string) => void;
  /**
   * Theme
   */
  theme?: 'light' | 'dark';
  /**
   * Size
   */
  size?: 'normal' | 'compact';
}

/**
 * CaptchaContainer - Container for switching CAPTCHA providers
 */
export const CaptchaContainer: React.FC<CaptchaContainerProps> = ({
  provider = 'google',
  siteKey,
  onVerify,
  theme = 'light',
  size = 'normal',
}) => {
  if (!siteKey) {
    return (
      <div
        style={{
          padding: 16,
          background: 'var(--wx-color-warning, #f59e0b)',
          borderRadius: 8,
          textAlign: 'center',
        }}
      >
        <span style={{ fontSize: '0.875rem', color: '#fff' }}>
          CAPTCHA siteKey is required
        </span>
      </div>
    );
  }

  return (
    <div>
      {provider === 'google' && (
        <GoogleCaptcha
          siteKey={siteKey}
          onVerify={onVerify}
          theme={theme}
          size={size === 'compact' ? 'compact' : 'normal'}
        />
      )}

      {provider === 'turnstile' && (
        <TurnstileCaptcha
          siteKey={siteKey}
          onVerify={onVerify}
          theme={theme}
          size={size === 'compact' ? 'compact' : 'normal'}
        />
      )}

      {provider === 'hcaptcha' && (
        <HCaptcha
          siteKey={siteKey}
          onVerify={onVerify}
          theme={theme}
          size={size === 'compact' ? 'compact' : 'normal'}
        />
      )}
    </div>
  );
};

CaptchaContainer.displayName = 'CaptchaContainer';

export default CaptchaContainer;
