/**
 * Auth0LoginButton Component
 * 
 * Auth0 SSO login button.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';

export interface Auth0LoginButtonProps {
  [key: string]: any;
  /**
   * Auth0 Client ID
   */
  clientId?: string;
  /**
   * Auth0 domain
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
 * Auth0LoginButton - Auth0 SSO login button
 */
export const Auth0LoginButton: React.FC<Auth0LoginButtonProps> = ({
  clientId,
  domain,
  onSuccess,
  onError,
  variant = 'outline',
  isLoading = false,
}) => {
  const handleClick = async () => {
    if (!clientId || !domain) {
      onError?.(new Error('Auth0 Client ID and domain are required'));
      return;
    }

    // In production, integrate with Auth0 SDK
    try {
      const response = {
        success: true,
        provider: 'auth0',
        token: 'mock-token',
      };
      onSuccess?.(response);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Auth0 login failed');
      onError?.(err);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      disabled={isLoading || !clientId || !domain}
     
     
    >
      🔑 Continue with Auth0
    </Button>
  );
};

Auth0LoginButton.displayName = 'Auth0LoginButton';

export default Auth0LoginButton;
