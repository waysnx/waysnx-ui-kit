/**
 * OktaLoginButton Component
 * 
 * Okta SSO login button.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';

export interface OktaLoginButtonProps {
  /**
   * Okta Client ID
   */
  clientId?: string;
  /**
   * Okta domain
   */
  domain?: string;
  /**
   * Callback on successful login
   */
  onSuccess?: (response: any) => void;
  /**
   * Callback on login error
   */
  onError?: (error: Error) => void;
  /**
   * Button variant
   */
  variant?: 'primary' | 'outline' | 'ghost';
  /**
   * Show loading state
   */
  isLoading?: boolean;
}

/**
 * OktaLoginButton - Okta SSO login button
 */
export const OktaLoginButton: React.FC<OktaLoginButtonProps> = ({
  clientId,
  domain,
  onSuccess,
  onError,
  variant = 'outline',
  isLoading = false,
}) => {
  const handleClick = async () => {
    if (!clientId || !domain) {
      onError?.(new Error('Okta Client ID and domain are required'));
      return;
    }

    // In production, integrate with Okta SDK
    try {
      const response = {
        success: true,
        provider: 'okta',
        token: 'mock-token',
      };
      onSuccess?.(response);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Okta login failed');
      onError?.(err);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      disabled={isLoading || !clientId || !domain}
     
     
    >
      ðŸ” Continue with Okta
    </Button>
  );
};

OktaLoginButton.displayName = 'OktaLoginButton';

export default OktaLoginButton;
