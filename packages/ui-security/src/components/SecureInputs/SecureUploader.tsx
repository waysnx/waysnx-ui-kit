/**
 * SecureUploader Component
 * 
 * Secure file upload with validation, size limits, and type restrictions.
 */

import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface SecureUploaderProps {
  /**
   * Allowed file types (MIME types)
   */
  allowedTypes?: string[];
  /**
   * Maximum file size in bytes
   */
  maxSize?: number;
  /**
   * Whether to allow multiple files
   */
  multiple?: boolean;
  /**
   * Label text
   */
  label?: string;
  /**
   * Callback when files are selected
   */
  onFilesSelected?: (files: File[]) => Promise<void>;
  /**
   * Callback for upload errors
   */
  onError?: (error: string) => void;
  /**
   * Whether upload is in progress
   */
  isLoading?: boolean;
  /**
   * Drag and drop area height
   */
  height?: string;
  /**
   * Custom help text
   */
  helperText?: string;
}

/**
 * SecureUploader - File upload with security validation
 */
export const SecureUploader: React.FC<SecureUploaderProps> = ({
  allowedTypes,
  maxSize = 10 * 1024 * 1024, // 10MB default
  multiple = false,
  label = 'Upload File',
  onFilesSelected,
  onError,
  isLoading = false,
  height = '200px',
  helperText,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');

  const validateFiles = useCallback(
    (files: File[]): boolean => {
      setError('');

      if (!multiple && files.length > 1) {
        const err = 'Only one file is allowed';
        setError(err);
        onError?.(err);
        return false;
      }

      for (const file of files) {
        // Check file type
        if (allowedTypes && !allowedTypes.includes(file.type)) {
          const err = `File type ${file.type} is not allowed`;
          setError(err);
          onError?.(err);
          return false;
        }

        // Check file size
        if (file.size > maxSize) {
          const sizeMB = (maxSize / (1024 * 1024)).toFixed(2);
          const err = `File size exceeds ${sizeMB}MB limit`;
          setError(err);
          onError?.(err);
          return false;
        }
      }

      return true;
    },
    [allowedTypes, maxSize, multiple, onError]
  );

  const handleFileSelect = useCallback(
    async (files: FileList | null) => {
      if (!files) return;

      const fileArray = Array.from(files);
      if (!validateFiles(fileArray)) return;

      setSelectedFiles(fileArray);

      try {
        await onFilesSelected?.(fileArray);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Upload failed';
        setError(errorMsg);
        onError?.(errorMsg);
      }
    },
    [validateFiles, onFilesSelected, onError]
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          {label}
        </label>
      )}

      {/* Drag and Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          padding: 16,
          borderRadius: 8,
          border: `2px dashed ${isDragging ? 'var(--wx-color-primary, #030213)' : 'var(--wx-color-border, #ccc)'}`,
          background: isDragging ? 'var(--wx-color-primary-light, #e9ebef)' : 'var(--wx-color-background-alt, #f3f3f5)',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={allowedTypes?.join(',')}
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />

        <div style={{ marginBottom: 12 }}>
          <span style={{ display: 'block', fontSize: '1.125rem', fontWeight: 700 }}>
            Drop files here
          </span>
          <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)', marginTop: 4 }}>
            or click to browse
          </span>
        </div>

        <Button
          onClick={handleClick}
          variant="primary"
          disabled={isLoading}
        >
          Select File{multiple ? 's' : ''}
        </Button>
      </div>

      {/* Helper Text */}
      {helperText && (
        <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)', marginTop: 8 }}>
          {helperText}
        </span>
      )}

      {/* File Size Limit */}
      {maxSize && (
        <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)', marginTop: 8 }}>
          Maximum file size: {formatFileSize(maxSize)}
        </span>
      )}

      {/* Allowed Types */}
      {allowedTypes && allowedTypes.length > 0 && (
        <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)', marginTop: 8 }}>
          Allowed types: {allowedTypes.join(', ')}
        </span>
      )}

      {/* Error Message */}
      {error && (
        <div
          style={{
            padding: 12,
            background: 'var(--wx-color-danger-light, #fde8ec)',
            borderRadius: 8,
            marginTop: 12,
          }}
          role="alert"
        >
          <span style={{ fontSize: '0.875rem', color: 'var(--wx-color-danger, #d4183d)' }}>
            {error}
          </span>
        </div>
      )}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: 8 }}>
            Selected {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''}:
          </span>
          <Stack gap="sm">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                style={{
                  padding: 8,
                  background: 'var(--wx-color-background-alt, #f3f3f5)',
                  borderRadius: 8,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700 }}>
                    {file.name}
                  </span>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--wx-color-text-muted, #717182)' }}>
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </div>
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
};

SecureUploader.displayName = 'SecureUploader';

export default SecureUploader;
