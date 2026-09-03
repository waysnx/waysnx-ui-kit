/**
 * SecureClipboardButton Component
 * 
 * Button to securely copy sensitive content to clipboard with auto-clearing.
 */

import React, { useState, useCallback } from 'react';
import { Button } from '@waysnx/ui-core';

export interface SecureClipboardButtonProps {
  /**
   * Text or function that returns text to copy
   */
  content: string | (() => string);
  /**
   * Button label
   */
  label?: string;
  /**
   * Label shown after successful copy
   */
  successLabel?: string;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Auto-clear clipboard after ms
   * @default 0 (disabled)
   */
  autoClearMs?: number;
  /**
   * Whether button is disabled
   */
  disabled?: boolean;
  /**
   * Callback on successful copy
   */
  onCopySuccess?: () => void;
  /**
   * Callback on copy error
   */
  onCopyError?: (error: Error) => void;
}

/**
 * SecureClipboardButton - Copy sensitive content to clipboard securely
 * 
 * Features:
 * - Uses Clipboard API for secure copying
 * - Auto-clear clipboard after configured delay
 * - Fallback to legacy approach if Clipboard API unavailable
 * - Feedback on success
 * - Error handling
 */
export const SecureClipboardButton: React.FC<SecureClipboardButtonProps> = ({
  content,
  label = 'Copy',
  successLabel = 'Copied',
  variant = 'primary',
  size = 'md',
  autoClearMs = 0,
  disabled = false,
  onCopySuccess,
  onCopyError,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = useCallback(async () => {
    setIsLoading(true);

    try {
      const textToCopy = typeof content === 'function' ? content() : content;

      // Try Clipboard API first (secure, async)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback: create temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);

        try {
          textarea.select();
          const success = document.execCommand('copy');
          if (!success) {
            throw new Error('Copy command failed');
          }
        } finally {
          document.body.removeChild(textarea);
        }
      }

      // Show success state
      setShowSuccess(true);
      onCopySuccess?.();

      // Auto-clear clipboard if configured
      if (autoClearMs > 0) {
        setTimeout(() => {
          // Clear by writing empty string
          if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText('');
          }
        }, autoClearMs);
      }

      // Reset success indicator
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Copy to clipboard failed');
      console.error('Clipboard error:', err);
      onCopyError?.(err);
    } finally {
      setIsLoading(false);
    }
  }, [content, autoClearMs, onCopySuccess, onCopyError]);

  return (
    <Button
      onClick={handleCopy}
      variant={variant}
      disabled={disabled || isLoading}
    >
      {showSuccess ? successLabel : label}
    </Button>
  );
};

SecureClipboardButton.displayName = 'SecureClipboardButton';

export default SecureClipboardButton;
