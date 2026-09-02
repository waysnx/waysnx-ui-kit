import React, { TextareaHTMLAttributes, useId } from 'react';
import './Textarea.css';
import { warn } from '../../dev';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  testId?: string;
}

export function Textarea({ label, error, hint, id, ariaLabel, ariaDescribedBy, testId, ...r }: TextareaProps) {
  warn(Boolean(label || r['aria-label'] || ariaLabel), 'Textarea needs label');
  const reactId = useId();
  const t = id || `wx-textarea-${reactId}`;
  const charCount = typeof r.value === 'string' ? r.value.length : 0;
  const showCharCount = r.maxLength !== undefined;
  
  // Build aria-describedby with error, hint, and char count
  const descriptionIds = [];
  if (error) descriptionIds.push(`${t}-error`);
  if (hint && !error) descriptionIds.push(`${t}-hint`);
  if (showCharCount) descriptionIds.push(`${t}-charcount`);
  if (ariaDescribedBy) descriptionIds.push(ariaDescribedBy);
  const finalAriaDescribedBy = descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined;

  return (
    <div className="wx-textarea-wrapper" data-testid={testId}>
      {label && (
        <label htmlFor={t}>
          {label}
          {r.required && <span className="wx-required" aria-label="required">*</span>}
        </label>
      )}
      <textarea
        id={t}
        className={`wx-textarea ${error ? 'wx-textarea-error' : ''}`}
        aria-label={ariaLabel || label}
        aria-invalid={!!error}
        aria-required={r.required}
        aria-describedby={finalAriaDescribedBy}
        {...r}
      />
      {showCharCount && (
        <div className="wx-textarea-hint" id={`${t}-charcount`}>{charCount}/{r.maxLength} characters</div>
      )}
      {hint && !showCharCount && !error && <div className="wx-textarea-hint" id={`${t}-hint`}>{hint}</div>}
      {error && (
        <div className="wx-textarea-error-text" id={`${t}-error`} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
