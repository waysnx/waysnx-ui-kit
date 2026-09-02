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
        padding="lg"
        backgroundColor="warning"
        borderRadius="md"
        textAlign="center"
      >
        <span fontSize="sm" color="white">
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
