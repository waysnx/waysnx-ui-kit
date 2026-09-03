/**
 * GitHubLoginButton Component
 * 
 * GitHub OAuth login button.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';

export interface GitHubLoginButtonProps {
  /**
   * GitHub OAuth Client ID
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
 * GitHubLoginButton - GitHub OAuth login button
 */
export const GitHubLoginButton: React.FC<GitHubLoginButtonProps> = ({
  clientId,
  onSuccess,
  onError,
  variant = 'outline',
  isLoading = false,
}) => {
  const handleClick = async () => {
    if (!clientId) {
      onError?.(new Error('GitHub Client ID is required'));
      return;
    }

    // In production, integrate with actual GitHub OAuth
    try {
      const response = {
        success: true,
        provider: 'github',
        token: 'mock-token',
      };
      onSuccess?.(response);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('GitHub login failed');
      onError?.(err);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      disabled={isLoading || !clientId}
     
     
    >
       Continue with GitHub
    </Button>
  );
};

GitHubLoginButton.displayName = 'GitHubLoginButton';

export default GitHubLoginButton;
