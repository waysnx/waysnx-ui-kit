/**
 * SecureDownloadButton Component
 * 
 * Button to securely download files with verification and cleanup.
 */

import React, { useState, useCallback } from 'react';
import { Button } from '@waysnx/ui-core';

export interface SecureDownloadButtonProps {
  /**
   * File URL or blob to download
   */
  fileUrl?: string | Blob;
  /**
   * File name for download
   */
  fileName: string;
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
   * Callback before download starts
   */
  onBeforeDownload?: () => Promise<Blob | string>;
  /**
   * Callback after download completes
   */
  onDownloadComplete?: () => void;
  /**
   * Callback for errors
   */
  onError?: (error: Error) => void;
  /**
   * Whether button is disabled
   */
  disabled?: boolean;
  /**
   * Custom loading message
   */
  loadingLabel?: string;
}

/**
 * SecureDownloadButton - Download files securely with cleanup
 * 
 * Features:
 * - Automatic blob URL cleanup
 * - Optional validation callback
 * - Error handling
 * - Memory-safe file handling
 */
export const SecureDownloadButton: React.FC<SecureDownloadButtonProps> = ({
  fileUrl,
  fileName,
  label = 'Download',
  variant = 'primary',
  size = 'md',
  onBeforeDownload,
  onDownloadComplete,
  onError,
  disabled = false,
  loadingLabel = 'Downloading...',
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!fileUrl && !onBeforeDownload) {
      onError?.(new Error('No file URL provided'));
      return;
    }

    setIsLoading(true);
    let blobUrl: string | null = null;

    try {
      // Get file data
      let file: Blob | string;
      if (onBeforeDownload) {
        file = await onBeforeDownload();
      } else {
        file = fileUrl!;
      }

      // Convert to blob if needed
      let blob: Blob;
      if (typeof file === 'string') {
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        blob = await response.blob();
      } else {
        blob = file;
      }

      // Create blob URL
      blobUrl = URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.style.display = 'none';

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Call completion callback
      onDownloadComplete?.();
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Download failed');
      console.error('Download error:', err);
      onError?.(err);
    } finally {
      // Cleanup blob URL after a delay to ensure download starts
      if (blobUrl) {
        setTimeout(() => {
          URL.revokeObjectURL(blobUrl!);
        }, 100);
      }

      setIsLoading(false);
    }
  }, [fileUrl, fileName, onBeforeDownload, onDownloadComplete, onError]);

  return (
    <Button
      onClick={handleDownload}
      variant={variant}
      disabled={disabled || isLoading || (!fileUrl && !onBeforeDownload)}
     
    >
      {isLoading ? loadingLabel : label}
    </Button>
  );
};

SecureDownloadButton.displayName = 'SecureDownloadButton';

export default SecureDownloadButton;
