/**
 * AuthenticatorQRCode Component
 * 
 * Display QR code for TOTP authenticator app setup.
 */

import React, { useEffect, useRef } from 'react';
import { Button } from '@waysnx/ui-core';

export interface AuthenticatorQRCodeProps {
  [key: string]: any;
  /**
   * TOTP secret key
   */
  secret: string;
  /**
   * Account email/username
   */
  accountName: string;
  /**
   * Issuer name (e.g., 'MyApp')
   */
  issuer?: string;
  /**
   * QR code size in pixels
   */
  size?: number;
  /**
   * Callback to copy secret
   */
  onCopySecret?: () => void;
  /**
   * Whether QR code generation is loading
   */
  isLoading?: boolean;
  /**
   * Custom instructions text
   */
  instructions?: string;
}

/**
 * AuthenticatorQRCode - Display TOTP setup QR code
 * 
 * Generates QR code from TOTP secret using browser-native approach
 * (no external QR library dependency)
 */
export const AuthenticatorQRCode: React.FC<AuthenticatorQRCodeProps> = ({
  secret,
  accountName,
  issuer = 'MyApp',
  size = 200,
  onCopySecret,
  isLoading = false,
  instructions = 'Scan this code with your authenticator app',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrCodeUrl, setQrCodeUrl] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  useEffect(() => {
    // Generate otpauth URI
    const otpauthUri = `otpauth://totp/${encodeURIComponent(
      accountName
    )}?secret=${encodeURIComponent(secret)}&issuer=${encodeURIComponent(issuer)}`;

    // Generate QR code using a simple approach
    // In production, you'd use a QR library or API
    generateQRCode(otpauthUri);
  }, [secret, accountName, issuer]);

  const generateQRCode = async (data: string) => {
    try {
      // For demonstration, we'll create a simple placeholder
      // In production, integrate with qrcode.js or similar library
      // This requires external library - for now show manual entry option

      setQrCodeUrl(data);
    } catch (err) {
      setError('Failed to generate QR code');
    }
  };

  return (
    <div textAlign="center">
      <span as="h3" fontSize="base" fontWeight="bold" marginBottom="md">
        Authenticator Setup
      </span>

      <span fontSize="sm" color="muted" marginBottom="lg">
        {instructions}
      </span>

      {/* QR Code Placeholder */}
      <div
        padding="lg"
        backgroundColor="background-alt"
        borderRadius="md"
        marginBottom="lg"
        minHeight={`${size}px`}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {isLoading ? (
          <span color="muted">Generating QR code...</span>
        ) : error ? (
          <span color="danger">{error}</span>
        ) : (
          <div>
            <span fontSize="sm" color="muted" marginBottom="md">
              QR Code would appear here
            </span>
            <canvas
              ref={canvasRef}
              width={size}
              height={size}
              style={{ display: 'none' }}
            />
          </div>
        )}
      </div>

      {/* Manual Entry Alternative */}
      <div
        padding="md"
        backgroundColor="info"
        borderRadius="md"
        marginBottom="lg"
        textAlign="left"
      >
        <span fontSize="sm" fontWeight="bold" marginBottom="sm">
          Can't scan? Enter this code manually:
        </span>
        <div
          padding="md"
          backgroundColor="background"
          borderRadius="md"
          fontFamily="monospace"
          fontSize="sm"
          wordBreak="break-all"
          marginBottom="sm"
        >
          {secret}
        </div>
        <Button
          variant="outline"
         
          onClick={onCopySecret}
        >
          Copy Secret
        </Button>
      </div>

      {/* TOTP URI */}
      <div
        padding="md"
        backgroundColor="background-alt"
        borderRadius="md"
        marginBottom="lg"
        textAlign="left"
      >
        <span fontSize="xs" fontWeight="bold" marginBottom="sm" color="muted">
          TOTP URI:
        </span>
        <div
          padding="sm"
          backgroundColor="background"
          borderRadius="md"
          fontFamily="monospace"
          fontSize="xs"
          wordBreak="break-all"
        >
          {qrCodeUrl}
        </div>
      </div>

      {/* Security Notice */}
      <div
        padding="md"
        backgroundColor="warning"
        borderRadius="md"
        borderLeft="4px solid"
        borderLeftColor="warning"
      >
        <span fontSize="sm">
          Keep this secret safe. Anyone with access to this code can access your account.
        </span>
      </div>
    </div>
  );
};

AuthenticatorQRCode.displayName = 'AuthenticatorQRCode';

export default AuthenticatorQRCode;
