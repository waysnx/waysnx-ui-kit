/**
 * SecureUploader Component
 * 
 * Secure file upload with validation, size limits, and type restrictions.
 */

import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface SecureUploaderProps {
  [key: string]: any;
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
        padding="lg"
        borderRadius="md"
        border="2px dashed"
        borderColor={isDragging ? 'primary' : 'border'}
        backgroundColor={isDragging ? 'primary-light' : 'background-alt'}
        textAlign="center"
        cursor="pointer"
        transition="all 0.2s"
        style={{ height }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={allowedTypes?.join(',')}
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />

        <div marginBottom="md">
          <span fontSize="lg" fontWeight="bold">
            Drop files here
          </span>
          <span fontSize="sm" color="muted" marginTop="xs">
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
        <span fontSize="sm" color="muted" marginTop="sm">
          {helperText}
        </span>
      )}

      {/* File Size Limit */}
      {maxSize && (
        <span fontSize="sm" color="muted" marginTop="sm">
          Maximum file size: {formatFileSize(maxSize)}
        </span>
      )}

      {/* Allowed Types */}
      {allowedTypes && allowedTypes.length > 0 && (
        <span fontSize="sm" color="muted" marginTop="sm">
          Allowed types: {allowedTypes.join(', ')}
        </span>
      )}

      {/* Error Message */}
      {error && (
        <div
          padding="md"
          backgroundColor="danger-light"
          borderRadius="md"
          marginTop="md"
          role="alert"
        >
          <span fontSize="sm" color="danger">
            {error}
          </span>
        </div>
      )}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div marginTop="md">
          <span fontSize="sm" fontWeight="bold" marginBottom="sm">
            Selected {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''}:
          </span>
          <Stack gap="sm">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                padding="sm"
                backgroundColor="background-alt"
                borderRadius="md"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <div>
                  <span fontSize="sm" fontWeight="bold">
                    {file.name}
                  </span>
                  <span fontSize="xs" color="muted">
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
