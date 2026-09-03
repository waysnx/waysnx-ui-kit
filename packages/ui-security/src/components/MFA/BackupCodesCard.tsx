/**
 * BackupCodesCard Component
 * 
 * Display and manage backup codes for account recovery.
 */

import React, { useState } from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';
import { Badge } from '@waysnx/ui-feedback';

export interface BackupCodesCardProps {
  /**
   * Backup codes array
   */
  codes: string[];
  /**
   * Whether codes are initially revealed
   */
  initiallyRevealed?: boolean;
  /**
   * Callback to download codes
   */
  onDownload?: () => void;
  /**
   * Callback to print codes
   */
  onPrint?: () => void;
  /**
   * Callback to copy all codes
   */
  onCopyAll?: () => void;
  /**
   * Whether backup codes have been saved/confirmed
   */
  isConfirmed?: boolean;
  /**
   * Callback when user confirms they saved codes
   */
  onConfirm?: () => void;
}

/**
 * BackupCodesCard - Display backup codes for account recovery
 */
export const BackupCodesCard: React.FC<BackupCodesCardProps> = ({
  codes,
  initiallyRevealed = false,
  onDownload,
  onPrint,
  onCopyAll,
  isConfirmed = false,
  onConfirm,
}) => {
  const [isRevealed, setIsRevealed] = useState(initiallyRevealed);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
  };

  const handleCopyAll = () => {
    const allCodes = codes.join('\n');
    navigator.clipboard.writeText(allCodes).then(() => {
      onCopyAll?.();
    });
  };

  const handleDownload = () => {
    const content = `Backup Codes for Account Recovery
Generated: ${new Date().toLocaleString()}

${codes.join('\n')}

Store these codes in a safe place. Each code can be used once if you lose access to your authentication device.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-codes-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onDownload?.();
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Backup Codes</title>
            <style>
              body { font-family: monospace; padding: 2rem; }
              h1 { margin-bottom: 1rem; }
              .codes { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
              .code { border: 1px solid #ccc; padding: 0.5rem; }
            </style>
          </head>
          <body>
            <h1>Backup Codes for Account Recovery</h1>
            <p>Generated: ${new Date().toLocaleString()}</p>
            <div class="codes">
              ${codes.map(code => `<div class="code">${code}</div>`).join('')}
            </div>
            <p style="margin-top: 2rem; font-size: 0.9rem;">Store these codes in a safe place. Each code can be used once if you lose access to your authentication device.</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }

    onPrint?.();
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>
            Backup Codes
          </h3>
          {isConfirmed && <Badge color="success">✓ Saved</Badge>}
        </div>

        <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)' }}>
          Store these codes in a secure location. You can use each code once to access your
          account if you lose access to your authentication device.
        </span>
      </div>

      {/* Codes Display */}
      <div
        style={{
          padding: 16,
          background: 'var(--wx-color-background-alt, #f3f3f5)',
          borderRadius: 8,
          marginBottom: 16,
          maxHeight: isRevealed ? 'auto' : '200px',
          overflow: isRevealed ? 'visible' : 'hidden',
          position: 'relative',
        }}
      >
        <Stack gap="sm">
          {codes.map((code, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 8,
                background: 'var(--wx-color-background, #ffffff)',
                borderRadius: 8,
                fontFamily: 'monospace',
              }}
            >
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
                  {isRevealed ? code : '••••••'}
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={() => handleCopyCode(code, index)}
                disabled={!isRevealed}
              >
                {copiedIndex === index ? '✓' : 'Copy'}
              </Button>
            </div>
          ))}
        </Stack>

        {/* Reveal Overlay */}
        {!isRevealed && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}
          >
            <Button
              variant="primary"
              onClick={() => setIsRevealed(true)}
            >
              Reveal Codes
            </Button>
          </div>
        )}
      </div>

      {/* Warning */}
      <div
        style={{
          padding: 12,
          background: 'var(--wx-color-warning, #f59e0b)',
          borderRadius: 8,
          marginBottom: 16,
          borderLeft: '4px solid var(--wx-color-warning, #f59e0b)',
        }}
      >
        <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: 4 }}>
          ⚠ Security Warning
        </span>
        <span style={{ display: 'block', fontSize: '0.875rem' }}>
          Anyone who has access to these codes can access your account. Store them
          securely (password manager, safe deposit box, etc).
        </span>
      </div>

      {/* Action Buttons */}
      <div style={{ marginBottom: 16 }}>
        <Stack gap="md">
          <Button
            variant="outline"
            onClick={handleCopyAll}
            disabled={!isRevealed}
          >
            Copy All Codes
          </Button>

          <Stack gap="md" direction="horizontal">
            <Button
              variant="outline"
              onClick={handleDownload}
              disabled={!isRevealed}
            >
              Download
            </Button>
            <Button
              variant="outline"
              onClick={handlePrint}
              disabled={!isRevealed}
            >
              Print
            </Button>
          </Stack>
        </Stack>
      </div>

      {/* Confirmation */}
      {isRevealed && !isConfirmed && (
        <Button
          variant="primary"
          onClick={onConfirm}
        >
          ✓ I&apos;ve Saved My Backup Codes
        </Button>
      )}

      {isConfirmed && (
        <div
          style={{
            padding: 12,
            background: 'var(--wx-color-success, #16a34a)',
            borderRadius: 8,
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
            ✓ Backup codes saved successfully
          </span>
        </div>
      )}
    </div>
  );
};

BackupCodesCard.displayName = 'BackupCodesCard';

export default BackupCodesCard;
