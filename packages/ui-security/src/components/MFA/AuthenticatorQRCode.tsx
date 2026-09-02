/**
 * AuthenticatorQRCode Component
 *
 * Displays a real, scannable QR code for TOTP authenticator app setup.
 * The QR encodes a standard `otpauth://totp/...` URI and is rendered by the
 * shared @waysnx/ui-media QRCode component (backed by the `qrcode` library),
 * so there is a single, real QR implementation across the kit.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';
import { QRCode } from '@waysnx/ui-media';

export interface AuthenticatorQRCodeProps {
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
  /**
   * Optional class name applied to the root element
   */
  className?: string;
}

/**
 * Build a standard otpauth:// TOTP URI for authenticator apps.
 */
function buildOtpauthUri(secret: string, accountName: string, issuer: string): string {
  const label = encodeURIComponent(`${issuer}:${accountName}`);
  const params = new URLSearchParams({ secret, issuer });
  return `otpauth://totp/${label}?${params.toString()}`;
}

/**
 * AuthenticatorQRCode - Display a scannable TOTP setup QR code plus a
 * manual-entry fallback.
 */
export const AuthenticatorQRCode: React.FC<AuthenticatorQRCodeProps> = ({
  secret,
  accountName,
  issuer = 'MyApp',
  size = 200,
  onCopySecret,
  isLoading = false,
  instructions = 'Scan this code with your authenticator app',
  className,
}) => {
  const otpauthUri = buildOtpauthUri(secret, accountName, issuer);

  return (
    <div className={`wx-authenticator-qr ${className || ''}`} style={{ textAlign: 'center' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>Authenticator Setup</h3>

      <p style={{ fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)', marginBottom: 16 }}>
        {instructions}
      </p>

      {/* Real, scannable QR code */}
      <div
        style={{
          padding: 16,
          background: 'var(--wx-color-background-alt, #f3f3f5)',
          borderRadius: 8,
          marginBottom: 16,
          minHeight: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isLoading ? (
          <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>Generating QR code…</span>
        ) : (
          <QRCode value={otpauthUri} size={size} errorCorrection="M" showDownload={false} />
        )}
      </div>

      {/* Manual entry fallback */}
      <div
        style={{
          padding: 12,
          background: 'var(--wx-color-info-bg, #eff6ff)',
          borderRadius: 8,
          marginBottom: 16,
          textAlign: 'left',
        }}
      >
        <p style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 8 }}>
          Can&apos;t scan? Enter this code manually:
        </p>
        <div
          style={{
            padding: 12,
            background: 'var(--wx-color-background, #ffffff)',
            borderRadius: 8,
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            wordBreak: 'break-all',
            marginBottom: 8,
          }}
        >
          {secret}
        </div>
        <Button variant="outline" onClick={onCopySecret}>
          Copy Secret
        </Button>
      </div>

      {/* Security notice */}
      <div
        style={{
          padding: 12,
          background: 'var(--wx-color-warning-bg, #fffbeb)',
          borderRadius: 8,
          borderLeft: '4px solid var(--wx-color-warning, #f59e0b)',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: '0.875rem' }}>
          Keep this secret safe. Anyone with access to this code can access your account.
        </span>
      </div>
    </div>
  );
};

AuthenticatorQRCode.displayName = 'AuthenticatorQRCode';

export default AuthenticatorQRCode;
