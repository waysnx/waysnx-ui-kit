import React, { useState, useRef, useEffect } from 'react';
import './FileUpload.css';
import { warn } from '../../dev';
import { useTranslation } from '@waysnx/ui-i18n';

export interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  onChange?: (files: File[] | string[]) => void;
  onError?: (error: string) => void;
  hint?: string;
  error?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  format?: 'blob' | 'binary'; // blob returns File objects, binary returns base64 strings
  showPreview?: boolean; // Show image preview for image files
  autoUpload?: boolean; // If false, shows Upload button; if true, auto-uploads on selection
  browseButtonText?: string; // Custom text for browse button
  uploadedFiles?: Array<{ name: string; url: string }>; // Already uploaded files from server
  onUpload?: (files: File[]) => void; // Called when Upload button is clicked (manual mode)
  onDelete?: (file: { name: string; url: string }) => void; // Called when uploaded file is deleted
  uploadStatus?: 'idle' | 'uploading' | 'success' | 'error'; // External upload status
  uploadProgress?: number; // Upload progress percentage (0-100)
  showLastModified?: boolean; // Show last modified date for files
  ariaLabel?: string;
  ariaDescribedBy?: string;
  testId?: string;
}

export function FileUpload({
  label,
  accept,
  multiple = false,
  maxSize,
  onChange,
  onError,
  hint,
  error,
  disabled = false,
  id,
  className,
  format = 'blob',
  showPreview = false,
  autoUpload = true,
  browseButtonText,
  uploadedFiles = [],
  onUpload,
  onDelete,
  uploadStatus: externalUploadStatus,
  uploadProgress,
  showLastModified = false,
  ariaLabel,
  ariaDescribedBy,
  testId,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [internalUploadStatus, setInternalUploadStatus] = useState<'idle' | 'ready' | 'uploaded'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = id || `wx-fileupload-${Math.random().toString(36).slice(2)}`;
  const { t } = useTranslation();

  // Use external status if provided, otherwise use internal status
  const uploadStatus = externalUploadStatus || (internalUploadStatus === 'uploaded' ? 'success' : internalUploadStatus === 'ready' ? 'idle' : 'idle');
  
  // Build aria-describedby with error and hint
  const descriptionIds = [];
  if (error) descriptionIds.push(`${generatedId}-error`);
  if (hint && !error) descriptionIds.push(`${generatedId}-hint`);
  if (ariaDescribedBy) descriptionIds.push(ariaDescribedBy);
  const finalAriaDescribedBy = descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined;

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const convertFilesToBinary = async (files: File[]): Promise<string[]> => {
    const promises = files.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(promises);
  };

  const createPreviewUrls = (files: File[]): string[] => {
    return files.map(file => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      }
      return '';
    });
  };

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`;
    }

    if (accept) {
      const acceptedTypes = accept.split(',').map(t => t.trim());
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const mimeType = file.type;

      const isValid = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type.toLowerCase();
        }
        if (type.endsWith('/*')) {
          return mimeType.startsWith(type.replace('/*', ''));
        }
        return mimeType === type;
      });

      if (!isValid) {
        return `File "${file.name}" type not accepted`;
      }
    }

    return null;
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    let errorMessage = '';

    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        errorMessage = validationError;
        break;
      }
      validFiles.push(file);
    }

    if (errorMessage) {
      onError?.(errorMessage);
      return;
    }

    const newFiles = multiple ? [...selectedFiles, ...validFiles] : validFiles;
    setSelectedFiles(newFiles);

    // Create preview URLs if showPreview is enabled
    if (showPreview) {
      const oldUrls = previewUrls;
      const newUrls = createPreviewUrls(newFiles);
      setPreviewUrls(newUrls);
      // Cleanup old URLs
      oldUrls.forEach(url => url && URL.revokeObjectURL(url));
    }

    // Auto-upload mode: trigger onChange immediately
    if (autoUpload) {
      if (format === 'binary') {
        const binaryFiles = await convertFilesToBinary(newFiles);
        onChange?.(binaryFiles);
      } else {
        onChange?.(newFiles);
      }
      setInternalUploadStatus('uploaded');
    } else {
      // Manual upload mode: just mark as ready
      setInternalUploadStatus('ready');
    }
  };

  const handleUploadClick = async () => {
    if (selectedFiles.length === 0) return;

    setInternalUploadStatus('uploaded');
    onUpload?.(selectedFiles);

    if (format === 'binary') {
      const binaryFiles = await convertFilesToBinary(selectedFiles);
      onChange?.(binaryFiles);
    } else {
      onChange?.(selectedFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    
    // Update preview URLs
    if (showPreview) {
      const oldUrl = previewUrls[index];
      if (oldUrl) URL.revokeObjectURL(oldUrl);
      const newUrls = previewUrls.filter((_, i) => i !== index);
      setPreviewUrls(newUrls);
    }

    // Reset status if no files left
    if (newFiles.length === 0) {
      setInternalUploadStatus('idle');
    }

    // If auto-upload, trigger onChange
    if (autoUpload) {
      onChange?.(newFiles);
    }
  };

  const removeUploadedFile = (file: { name: string; url: string }) => {
    onDelete?.(file);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getUploadStatusText = () => {
    if (uploadStatus === 'uploading') return t('fileUpload.uploading');
    if (uploadStatus === 'success') return t('fileUpload.uploaded');
    if (uploadStatus === 'error') return t('fileUpload.uploadFailed');
    if (!autoUpload && internalUploadStatus === 'ready') return t('fileUpload.readyToUpload');
    return '';
  };

  const getUploadStatusClass = () => {
    if (uploadStatus === 'uploading') return 'wx-fileupload-item-status-uploading';
    if (uploadStatus === 'success') return 'wx-fileupload-item-status-success';
    if (uploadStatus === 'error') return 'wx-fileupload-item-status-error';
    return '';
  };

  return (
    <div className={`wx-fileupload-wrapper ${className || ''}`} data-testid={testId}>
      {label && <label htmlFor={generatedId} className="wx-fileupload-label">{label}</label>}

      {/* Uploaded Files from Server */}
      {uploadedFiles.length > 0 && (
        <div className="wx-fileupload-uploaded-section" role="region" aria-label={t('fileUpload.uploadedFilesRegion')}>
          <div className="wx-fileupload-uploaded-label">{t('fileUpload.uploadedFiles')}</div>
          <div className="wx-fileupload-uploaded-list">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="wx-fileupload-uploaded-item">
                {showPreview && file.url && (file.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) && (
                  <div className="wx-fileupload-uploaded-preview">
                    <img src={file.url} alt={file.name} />
                  </div>
                )}
                <div className="wx-fileupload-uploaded-info">
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="wx-fileupload-uploaded-link">
                    {file.name}
                  </a>
                </div>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => removeUploadedFile(file)}
                    className="wx-fileupload-item-remove"
                    aria-label={`Delete file ${file.name}`}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drop Zone */}
      <div
        className={`wx-fileupload-dropzone ${isDragging ? 'wx-fileupload-dropzone-dragging' : ''} ${
          error ? 'wx-fileupload-dropzone-error' : ''
        } ${disabled ? 'wx-fileupload-dropzone-disabled' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel || label || 'File upload area'}
        aria-invalid={!!error}
        aria-describedby={finalAriaDescribedBy}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <input
          ref={inputRef}
          id={generatedId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="wx-fileupload-input"
          aria-hidden="true"
        />

        <svg className="wx-fileupload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>

        <div className="wx-fileupload-text">
          <span className="wx-fileupload-text-primary">{`${t('fileUpload.dropHere')} ${browseButtonText || t('fileUpload.browse')}`}</span>
          {accept && <span className="wx-fileupload-text-secondary">{t('fileUpload.accepted')} {accept}</span>}
          {maxSize && <span className="wx-fileupload-text-secondary">{t('fileUpload.maxSize')} {formatFileSize(maxSize)}</span>}
        </div>
      </div>

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div className="wx-fileupload-list" role="region" aria-label="Selected files">
          {selectedFiles.map((file, index) => (
            <div key={index} className="wx-fileupload-item">
              {showPreview && previewUrls[index] && (
                <div className="wx-fileupload-preview">
                  <img src={previewUrls[index]} alt={file.name} />
                </div>
              )}
              <div className="wx-fileupload-item-info">
                <span className="wx-fileupload-item-name">{file.name}</span>
                <div className="wx-fileupload-item-meta">
                  <span className="wx-fileupload-item-size">{formatFileSize(file.size)}</span>
                  {showLastModified && (
                    <span className="wx-fileupload-item-date">{formatDate(file.lastModified)}</span>
                  )}
                </div>
                {getUploadStatusText() && (
                  <span className={`wx-fileupload-item-status ${getUploadStatusClass()}`} role="status" aria-live="polite">
                    {getUploadStatusText()}
                    {uploadStatus === 'uploading' && uploadProgress !== undefined && (
                      <span className="wx-fileupload-progress-text"> ({uploadProgress}%)</span>
                    )}
                  </span>
                )}
                {uploadStatus === 'uploading' && uploadProgress !== undefined && (
                  <div className="wx-fileupload-progress-bar" role="progressbar" aria-valuenow={uploadProgress} aria-valuemin={0} aria-valuemax={100} aria-label={`Upload progress: ${uploadProgress}%`}>
                    <div 
                      className="wx-fileupload-progress-fill" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
              {!disabled && uploadStatus !== 'uploading' && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="wx-fileupload-item-remove"
                  aria-label={`Remove file ${file.name}`}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Manual Upload Button */}
      {!autoUpload && selectedFiles.length > 0 && internalUploadStatus === 'ready' && uploadStatus !== 'uploading' && (
        <div className="wx-fileupload-actions">
          <button
            type="button"
            onClick={handleUploadClick}
            className="wx-fileupload-upload-btn"
            disabled={disabled}
            aria-label={t('fileUpload.upload')}
          >
            {t('fileUpload.upload')}
          </button>
        </div>
      )}

      {hint && !error && <div className="wx-fileupload-hint" id={`${generatedId}-hint`}>{hint}</div>}
      {error && <div className="wx-fileupload-error-text" id={`${generatedId}-error`} role="alert">{error}</div>}
    </div>
  );
}
