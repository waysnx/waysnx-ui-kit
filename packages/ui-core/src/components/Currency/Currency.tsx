import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import './Currency.css';
import { warn } from '../../dev';

export interface CurrencyProps extends Omit<NumericFormatProps, 'onChange' | 'onBlur'> {
  label?: string;
  value?: number | string;
  onChange?: (value: number | null, event?: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  
  // Currency-specific props (matches Angular)
  currencySymbol?: string;
  currencySymbolPosition?: 'start' | 'end';
  precision?: number;
  thousandSeparator?: string;
  decimalSeparator?: string;
  
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  testId?: string;
}

export function Currency({
  label,
  value,
  onChange,
  onBlur,
  currencySymbol = '$',
  currencySymbolPosition = 'start',
  precision = 2,
  thousandSeparator = ',',
  decimalSeparator = '.',
  error,
  hint,
  disabled = false,
  required = false,
  id,
  ariaLabel,
  ariaDescribedBy,
  placeholder = '0.00',
  testId,
  ...props
}: CurrencyProps) {
  warn(Boolean(label || props['aria-label'] || ariaLabel), 'Currency needs label');
  
  const generatedId = id || `wx-currency-${Math.random().toString(36).slice(2)}`;
  
  // Build aria-describedby with error and hint
  const descriptionIds = [];
  if (error) descriptionIds.push(`${generatedId}-error`);
  if (hint && !error) descriptionIds.push(`${generatedId}-hint`);
  if (ariaDescribedBy) descriptionIds.push(ariaDescribedBy);
  const finalAriaDescribedBy = descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined;

  return (
    <div className="wx-currency-wrapper" data-testid={testId}>
      {label && (
        <label htmlFor={generatedId} className="wx-currency-label">
          {label}
          {required && <span className="wx-required" aria-label="required">*</span>}
        </label>
      )}
      
      <NumericFormat
        id={generatedId}
        value={value}
        onValueChange={(values, sourceInfo) => {
          const syntheticEvent = {
            target: { value: values.value },
            currentTarget: { value: values.value }
          } as React.ChangeEvent<HTMLInputElement>;
          onChange?.(values.floatValue ?? null, syntheticEvent);
        }}
        onBlur={onBlur}
        prefix={currencySymbolPosition === 'start' ? currencySymbol : undefined}
        suffix={currencySymbolPosition === 'end' ? currencySymbol : undefined}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        decimalScale={precision}
        fixedDecimalScale
        allowNegative={false}
        disabled={disabled}
        placeholder={placeholder}
        className={`wx-currency-input ${error ? 'wx-currency-input-error' : ''}`}
        aria-label={ariaLabel || label}
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={finalAriaDescribedBy}
        {...props}
      />
      
      {hint && !error && <div className="wx-currency-hint" id={`${generatedId}-hint`}>{hint}</div>}
      {error && (
        <div className="wx-currency-error" id={`${generatedId}-error`} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
