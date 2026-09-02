/**
 * GoogleLoginButton Component
 * 
 * Google OAuth login button.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';

export interface GoogleLoginButtonProps {
  /**
   * Google OAuth Client ID
   */
  clientId?: string;
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
 * GoogleLoginButton - Google OAuth login button
 */
export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  clientId,
  onSuccess,
  onError,
  variant = 'outline',
  isLoading = false,
}) => {
  const handleClick = async () => {
    if (!clientId) {
      onError?.(new Error('Google Client ID is required'));
      return;
    }

    // In production, integrate with actual Google OAuth
    // This is a placeholder
    try {
      const response = {
        success: true,
        provider: 'google',
        token: 'mock-token',
      };
      onSuccess?.(response);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Google login failed');
      onError?.(err);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      disabled={isLoading || !clientId}
     
     
    >
      ðŸ” Continue with Google
    </Button>
  );
};

GoogleLoginButton.displayName = 'GoogleLoginButton';

export default GoogleLoginButton;
