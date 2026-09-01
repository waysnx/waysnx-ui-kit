import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateRangePicker.css';
import { warn } from '../../dev';
import { useTranslation } from '@waysnx/ui-i18n';

export interface DateRangePickerProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (dates: [Date | null, Date | null]) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  id?: string;
  className?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  testId?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  label,
  placeholder,
  error,
  hint,
  disabled = false,
  minDate,
  maxDate,
  dateFormat = 'MM/dd/yyyy',
  id,
  className,
  ariaLabel,
  ariaDescribedBy,
  testId,
}: DateRangePickerProps) {
  const { t } = useTranslation();
  warn(Boolean(label || ariaLabel), 'DateRangePicker needs label');

  const generatedId = id || `wx-daterangepicker-${Math.random().toString(36).slice(2)}`;
  
  // Build aria-describedby with error and hint
  const descriptionIds = [];
  if (error) descriptionIds.push(`${generatedId}-error`);
  if (hint && !error) descriptionIds.push(`${generatedId}-hint`);
  if (ariaDescribedBy) descriptionIds.push(ariaDescribedBy);
  const finalAriaDescribedBy = descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined;

  return (
    <div className="wx-daterangepicker-wrapper" data-testid={testId}>
      {label && <label htmlFor={generatedId} className="wx-daterangepicker-label">{label}</label>}
      
      <div className="wx-daterangepicker-input-wrapper">
        <ReactDatePicker
          id={generatedId}
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          placeholderText={placeholder || t('datePicker.selectDate')}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          dateFormat={dateFormat}
          className={`wx-daterangepicker-input ${error ? 'wx-daterangepicker-input-error' : ''} ${className || ''}`}
          popperPlacement="bottom-start"
          wrapperClassName="wx-daterangepicker-react-wrapper"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          {...{
            'aria-label': ariaLabel || label,
            'aria-invalid': !!error,
            'aria-describedby': finalAriaDescribedBy,
          } as any}
        />
        <svg className="wx-daterangepicker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>

      {hint && !error && <div className="wx-daterangepicker-hint" id={`${generatedId}-hint`}>{hint}</div>}
      {error && <div className="wx-daterangepicker-error-text" id={`${generatedId}-error`} role="alert">{error}</div>}
    </div>
  );
}
