import React, { InputHTMLAttributes, useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { IMaskInput } from 'react-imask';
import './Input.css';
import { warn } from '../../dev';
import { useTranslation } from '@waysnx/ui-i18n';
import {
  validateRequired,
  validateEmail,
  validatePattern,
  validateMinLength,
  validateMaxLength,
  validateMin,
  validateMax,
  runValidations
} from '../../utils/validation';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  showPasswordToggle?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  onValidation?: (isValid: boolean, error?: string) => void;
  errorMessage?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  
  // Masking props
  mask?: boolean | string;
  thousandSeparator?: string;
  decimalSeparator?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  testId?: string;
}

export function Input({ 
  label, 
  error: externalError, 
  hint, 
  id, 
  type, 
  showPasswordToggle, 
  value, 
  onChange,
  onBlur,
  required,
  pattern,
  minLength,
  maxLength,
  min,
  max,
  validateOnChange = false,
  validateOnBlur = true,
  onValidation,
  errorMessage,
  ariaLabel,
  ariaDescribedBy,
  mask,
  thousandSeparator = ',',
  decimalSeparator = '.',
  decimalScale = 2,
  allowNegative = true,
  testId,
  ...r 
}: InputProps) {
  warn(Boolean(label || r['aria-label'] || ariaLabel), 'Input needs label');
  const { t } = useTranslation();
  const i = id || `wx-input-${Math.random().toString(36).slice(2)}`;
  const [showPassword, setShowPassword] = useState(false);
  const [internalError, setInternalError] = useState<string>();
  const [touched, setTouched] = useState(false);

  const isPassword = type === 'password';
  const shouldShowPasswordToggle = showPasswordToggle !== false && isPassword;
  const displayError = externalError || (touched ? internalError : undefined);
  
  // Build aria-describedby with error and hint
  const descriptionIds = [];
  if (displayError) descriptionIds.push(`${i}-error`);
  if (hint && !displayError) descriptionIds.push(`${i}-hint`);
  if (ariaDescribedBy) descriptionIds.push(ariaDescribedBy);
  const finalAriaDescribedBy = descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined;

  const validate = (val: any) => {
    const validations = [];

    if (required) {
      validations.push(() => validateRequired(val, errorMessage || (typeof required === 'string' ? required : t('validation.required'))));
    }

    if (type === 'email') {
      validations.push(() => validateEmail(val as string, errorMessage || t('validation.email')));
    }

    if (pattern) {
      validations.push(() => validatePattern(val as string, pattern, errorMessage || t('validation.pattern')));
    }

    if (minLength) {
      validations.push(() => validateMinLength(val as string, Number(minLength), errorMessage || t('validation.minLength', { min: Number(minLength) })));
    }

    if (maxLength) {
      validations.push(() => validateMaxLength(val as string, Number(maxLength), errorMessage || t('validation.maxLength', { max: Number(maxLength) })));
    }

    if (min !== undefined) {
      validations.push(() => validateMin(val as number, Number(min), errorMessage || t('validation.min', { min: Number(min) })));
    }

    if (max !== undefined) {
      validations.push(() => validateMax(val as number, Number(max), errorMessage || t('validation.max', { max: Number(max) })));
    }

    const result = runValidations(validations);
    setInternalError(result.error);
    
    if (onValidation) {
      onValidation(result.isValid, result.error);
    }

    return result;
  };

  useEffect(() => {
    if (touched && validateOnChange) {
      validate(value);
    }
  }, [value, touched, validateOnChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateOnChange && touched) {
      validate(e.target.value);
    }
    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    if (validateOnBlur) {
      validate(e.target.value);
    }
    onBlur?.(e);
  };

  // Number masking
  if (type === 'number' && mask) {
    return (
      <div className="wx-input-wrapper" data-testid={testId}>
        {label && (
          <label htmlFor={i}>
            {label}
            {required && <span className="wx-required" aria-label="required">*</span>}
          </label>
        )}
        <NumericFormat
          id={i}
          className={`wx-input ${displayError ? 'wx-input-error' : ''}`}
          value={value}
          onValueChange={(values) => {
            const syntheticEvent = {
              target: { value: values.value },
              currentTarget: { value: values.value }
            } as React.ChangeEvent<HTMLInputElement>;
            
            if (validateOnChange && touched) {
              validate(values.value);
            }
            onChange?.(syntheticEvent);
          }}
          onBlur={(e) => {
            setTouched(true);
            if (validateOnBlur) {
              validate(e.target.value);
            }
            onBlur?.(e as any);
          }}
          thousandSeparator={thousandSeparator}
          decimalSeparator={decimalSeparator}
          decimalScale={decimalScale}
          allowNegative={allowNegative}
          aria-label={ariaLabel || label}
          aria-invalid={!!displayError}
          aria-required={required}
          aria-describedby={finalAriaDescribedBy}
          {...(r as any)}
        />
        {hint && !displayError && <div className="wx-input-hint" id={`${i}-hint`}>{hint}</div>}
        {displayError && (
          <div className="wx-input-error-text" id={`${i}-error`} role="alert">
            {displayError}
          </div>
        )}
      </div>
    );
  }

  // Phone masking with custom pattern
  if (type === 'tel' && typeof mask === 'string') {
    return (
      <div className="wx-input-wrapper" data-testid={testId}>
        {label && (
          <label htmlFor={i}>
            {label}
            {required && <span className="wx-required" aria-label="required">*</span>}
          </label>
        )}
        <IMaskInput
          id={i}
          className={`wx-input ${displayError ? 'wx-input-error' : ''}`}
          mask={mask}
          value={value as string}
          onAccept={(value) => {
            const syntheticEvent = {
              target: { value },
              currentTarget: { value }
            } as React.ChangeEvent<HTMLInputElement>;
            
            if (validateOnChange && touched) {
              validate(value);
            }
            onChange?.(syntheticEvent);
          }}
          onBlur={(e) => {
            setTouched(true);
            if (validateOnBlur) {
              validate(e.target.value);
            }
            onBlur?.(e as any);
          }}
          aria-label={ariaLabel || label}
          aria-invalid={!!displayError}
          aria-required={required}
          aria-describedby={finalAriaDescribedBy}
          {...(r as any)}
        />
        {hint && !displayError && <div className="wx-input-hint" id={`${i}-hint`}>{hint}</div>}
        {displayError && (
          <div className="wx-input-error-text" id={`${i}-error`} role="alert">
            {displayError}
          </div>
        )}
      </div>
    );
  }

  // Phone masking without pattern (basic validation)
  if (type === 'tel' && mask === true) {
    return (
      <div className="wx-input-wrapper" data-testid={testId}>
        {label && (
          <label htmlFor={i}>
            {label}
            {required && <span className="wx-required" aria-label="required">*</span>}
          </label>
        )}
        <div className="wx-input-container">
          <input
            id={i}
            className={`wx-input ${displayError ? 'wx-input-error' : ''}`}
            type="tel"
            value={value}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/[^0-9()+\-\s]/g, '');
              const syntheticEvent = {
                ...e,
                target: { ...e.target, value: cleaned },
                currentTarget: { ...e.currentTarget, value: cleaned }
              };
              handleChange(syntheticEvent);
            }}
            onBlur={handleBlur}
            required={required}
            aria-label={ariaLabel || label}
            aria-invalid={!!displayError}
            aria-required={required}
            aria-describedby={finalAriaDescribedBy}
            {...r}
          />
        </div>
        {hint && !displayError && <div className="wx-input-hint" id={`${i}-hint`}>{hint}</div>}
        {displayError && (
          <div className="wx-input-error-text" id={`${i}-error`} role="alert">
            {displayError}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="wx-input-wrapper" data-testid={testId}>
      {label && (
        <label htmlFor={i}>
          {label}
          {required && <span className="wx-required" aria-label="required">*</span>}
        </label>
      )}
      <div className="wx-input-container">
        <input
          id={i}
          className={`wx-input ${displayError ? 'wx-input-error' : ''}`}
          type={shouldShowPasswordToggle && showPassword ? 'text' : type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          required={required}
          pattern={pattern as string}
          minLength={minLength}
          maxLength={maxLength}
          min={min}
          max={max}
          aria-label={ariaLabel || label}
          aria-invalid={!!displayError}
          aria-required={required}
          aria-describedby={finalAriaDescribedBy}
          {...r}
        />
        {shouldShowPasswordToggle && (
          <button
            type="button"
            className="wx-input-icon"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? t('input.hidePassword') : t('input.showPassword')}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      {hint && !displayError && <div className="wx-input-hint" id={`${i}-hint`}>{hint}</div>}
      {displayError && (
        <div className="wx-input-error-text" id={`${i}-error`} role="alert">
          {displayError}
        </div>
      )}
    </div>
  );
}
