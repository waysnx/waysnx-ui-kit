import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import { warn } from '../../dev';
import { useTranslation } from '@waysnx/ui-i18n';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  showTimeSelect?: boolean;
  id?: string;
  className?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  testId?: string;
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder,
  error,
  hint,
  disabled = false,
  minDate,
  maxDate,
  dateFormat = 'MM/dd/yyyy',
  showTimeSelect = false,
  id,
  className,
  ariaLabel,
  ariaDescribedBy,
  testId,
}: DatePickerProps) {
  const { t } = useTranslation();
  const generatedId = id || `wx-datepicker-${Math.random().toString(36).slice(2)}`;
  
  // Build aria-describedby with error and hint
  const descriptionIds = [];
  if (error) descriptionIds.push(`${generatedId}-error`);
  if (hint && !error) descriptionIds.push(`${generatedId}-hint`);
  if (ariaDescribedBy) descriptionIds.push(ariaDescribedBy);
  const finalAriaDescribedBy = descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined;

  return (
    <div className="wx-datepicker-wrapper" data-testid={testId}>
      {label && <label htmlFor={generatedId} className="wx-datepicker-label">{label}</label>}
      
      <div className="wx-datepicker-input-wrapper">
        <ReactDatePicker
          id={generatedId}
          selected={value}
          onChange={onChange}
          placeholderText={placeholder || t('datePicker.selectDate')}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          dateFormat={dateFormat}
          showTimeSelect={showTimeSelect}
          className={`wx-datepicker-input ${error ? 'wx-datepicker-input-error' : ''} ${className || ''}`}
          popperPlacement="bottom-start"
          wrapperClassName="wx-datepicker-react-wrapper"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          {...{
            'aria-label': ariaLabel || label,
            'aria-invalid': !!error,
            'aria-describedby': finalAriaDescribedBy,
          } as any}
        />
        <svg className="wx-datepicker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>

      {hint && !error && <div className="wx-datepicker-hint" id={`${generatedId}-hint`}>{hint}</div>}
      {error && <div className="wx-datepicker-error-text" id={`${generatedId}-error`} role="alert">{error}</div>}
    </div>
  );
}
