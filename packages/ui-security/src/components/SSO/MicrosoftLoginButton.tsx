/**
 * MicrosoftLoginButton Component
 * 
 * Microsoft/Azure AD OAuth login button.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';

export interface MicrosoftLoginButtonProps {
  /**
   * Microsoft OAuth Client ID
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
 * MicrosoftLoginButton - Microsoft OAuth login button
 */
export const MicrosoftLoginButton: React.FC<MicrosoftLoginButtonProps> = ({
  clientId,
  onSuccess,
  onError,
  variant = 'outline',
  isLoading = false,
}) => {
  const handleClick = async () => {
    if (!clientId) {
      onError?.(new Error('Microsoft Client ID is required'));
      return;
    }

    // In production, integrate with actual Microsoft OAuth
    try {
      const response = {
        success: true,
        provider: 'microsoft',
        token: 'mock-token',
      };
      onSuccess?.(response);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Microsoft login failed');
      onError?.(err);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      disabled={isLoading || !clientId}
     
     
    >
      â“‚ï¸ Continue with Microsoft
    </Button>
  );
};

MicrosoftLoginButton.displayName = 'MicrosoftLoginButton';

export default MicrosoftLoginButton;
