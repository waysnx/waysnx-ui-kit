/**
 * SecurityKeyButton Component
 * 
 * Button to authenticate using hardware security key (FIDO2/WebAuthn).
 */

import React, { useState } from 'react';
import { Button } from '@waysnx/ui-core';

export interface SecurityKeyButtonProps {
  /**
   * Button label
   */
  label?: string;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Callback when authentication succeeds
   */
  onAuthSuccess?: (result: any) => void;
  /**
   * Callback when authentication fails
   */
  onAuthError?: (error: Error) => void;
  /**
   * Whether button is disabled
   */
  disabled?: boolean;
  /**
   * Custom loading message
   */
  loadingLabel?: string;
  /**
   * Challenge from server (required for WebAuthn)
   */
  challenge?: string;
}

/**
 * SecurityKeyButton - Authenticate using FIDO2/WebAuthn security key
 */
export const SecurityKeyButton: React.FC<SecurityKeyButtonProps> = ({
  label = 'Insert Security Key',
  variant = 'primary',
  size = 'md',
  onAuthSuccess,
  onAuthError,
  disabled = false,
  loadingLabel = 'Waiting for security key...',
  challenge,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = React.useState(true);
  const [message, setMessage] = React.useState<string>('');

  React.useEffect(() => {
    // Check if WebAuthn is supported
    const isWebAuthnSupported = window.PublicKeyCredential !== undefined;
    setIsSupported(isWebAuthnSupported);
  }, []);

  const handleSecurityKeyAuth = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // Check WebAuthn support
      if (!window.PublicKeyCredential) {
        throw new Error('Security key authentication is not supported on this device');
      }

      if (!challenge) {
        throw new Error('Server challenge is required');
      }

      // In production, this would implement full WebAuthn get() flow
      // For now, show placeholder
      setMessage('Please touch your security key...');

      // Simulate security key interaction
      await new Promise(resolve => setTimeout(resolve, 2000));

      const result = {
        success: true,
        type: 'security-key',
        timestamp: new Date(),
      };

      onAuthSuccess?.(result);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Security key authentication failed');
      console.error('Security key auth error:', err);
      setMessage('');
      onAuthError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleSecurityKeyAuth}
        variant={variant}
        disabled={disabled || isLoading || !isSupported}
       
        title={!isSupported ? 'Security key authentication not supported' : undefined}
      >
        ðŸ” {isLoading ? loadingLabel : label}
      </Button>

      {message && (
        <span fontSize="sm" color="info" marginTop="sm" textAlign="center">
          {message}
        </span>
      )}
    </div>
  );
};

SecurityKeyButton.displayName = 'SecurityKeyButton';

export default SecurityKeyButton;
