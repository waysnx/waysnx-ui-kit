import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TimePicker.css';
import { warn } from '../../dev';
import { useTranslation } from '@waysnx/ui-i18n';

export interface TimePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  timeIntervals?: number;
  timeFormat?: string;
  id?: string;
  className?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  testId?: string;
}

export function TimePicker({
  value,
  onChange,
  label,
  placeholder,
  error,
  hint,
  disabled = false,
  timeIntervals = 15,
  timeFormat = 'h:mm aa',
  id,
  className,
  ariaLabel,
  ariaDescribedBy,
  testId,
}: TimePickerProps) {
  const { t } = useTranslation();
  warn(Boolean(label || ariaLabel), 'TimePicker needs label');

  const reactId = React.useId();
  const generatedId = id || `wx-timepicker-${reactId}`;
  
  // Build aria-describedby with error and hint
  const descriptionIds = [];
  if (error) descriptionIds.push(`${generatedId}-error`);
  if (hint && !error) descriptionIds.push(`${generatedId}-hint`);
  if (ariaDescribedBy) descriptionIds.push(ariaDescribedBy);
  const finalAriaDescribedBy = descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined;

  return (
    <div className="wx-timepicker-wrapper" data-testid={testId}>
      {label && <label htmlFor={generatedId} className="wx-timepicker-label">{label}</label>}
      
      <div className="wx-timepicker-input-wrapper">
        <ReactDatePicker
          id={generatedId}
          selected={value}
          onChange={onChange}
          placeholderText={placeholder || t('datePicker.selectTime')}
          disabled={disabled}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={timeIntervals}
          timeCaption="Time"
          dateFormat={timeFormat}
          className={`wx-timepicker-input ${error ? 'wx-timepicker-input-error' : ''} ${className || ''}`}
          popperPlacement="bottom-start"
          wrapperClassName="wx-timepicker-react-wrapper"
          {...{
            'aria-label': ariaLabel || label,
            'aria-invalid': !!error,
            'aria-describedby': finalAriaDescribedBy,
          } as any}
        />
        <svg className="wx-timepicker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>

      {hint && !error && <div className="wx-timepicker-hint" id={`${generatedId}-hint`}>{hint}</div>}
      {error && <div className="wx-timepicker-error-text" id={`${generatedId}-error`} role="alert">{error}</div>}
    </div>
  );
}
