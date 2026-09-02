import React, { useState, useEffect } from 'react';
import './Checkbox.css';
import { getCachedOptions } from '../../utils/xrefCache';
import { useTranslation } from '@waysnx/ui-i18n';

export interface CheckboxOption {
  label: string;
  value: string | number;
}

export interface CheckboxProps {
  // Single checkbox mode
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean | (string | number)[]) => void;
  disabled?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  
  // Checkbox group mode
  options?: CheckboxOption[];
  value?: (string | number)[];
  name?: string;
  columns?: number;
  groupLabel?: string;
  
  // Dynamic options fetching (x-xref pattern)
  fetchOptions?: (url: string) => Promise<any[]>;
  xrefUrl?: string;
  xrefIdProp?: string;
  xrefDisplayProp?: string;
  
  // Validation error
  error?: string;

  // Loading and error states
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: (error: Error) => void;
  testId?: string;
}

export function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  options: propOptions,
  value = [],
  name,
  columns,
  groupLabel,
  fetchOptions,
  xrefUrl,
  xrefIdProp,
  xrefDisplayProp,
  onLoadStart,
  onLoadEnd,
  onError,
  error,
  testId,
}: CheckboxProps) {
  const { t } = useTranslation();
  const [options, setOptions] = useState<CheckboxOption[]>(propOptions || []);
  const [loading, setLoading] = useState(false);

  // Fetch options dynamically if xref properties are provided AND no static options
  useEffect(() => {
    if (fetchOptions && xrefUrl && xrefIdProp && xrefDisplayProp && (!propOptions || propOptions.length === 0)) {
      const loadOptions = async () => {
        try {
          setLoading(true);
          onLoadStart?.();
          
          const data = await getCachedOptions(xrefUrl, fetchOptions);
          const mappedOptions: CheckboxOption[] = (Array.isArray(data) ? data : (data as any).data || []).map((item: any) => ({
            value: item[xrefIdProp],
            label: item[xrefDisplayProp]
          }));
          
          setOptions(mappedOptions);
          onLoadEnd?.();
        } catch (error) {
          console.error('Failed to fetch options:', error);
          onError?.(error as Error);
        } finally {
          setLoading(false);
        }
      };
      
      loadOptions();
    } else if (propOptions) {
      setOptions(propOptions);
    }
  }, [fetchOptions, xrefUrl, xrefIdProp, xrefDisplayProp, propOptions]);

  // Single checkbox mode
  if (!options || options.length === 0) {
    return (
      <div data-testid={testId}>
        <label className={`wx-checkbox-wrapper ${disabled ? 'wx-checkbox-disabled' : ''}`}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => !disabled && onChange?.(e.target.checked)}
            disabled={disabled}
            className="wx-checkbox"
            aria-label={ariaLabel || label}
            aria-describedby={ariaDescribedBy}
          />
          <span className="wx-checkbox-label">{label}</span>
        </label>
        {error && <div className="wx-checkbox-error-text" role="alert">{error}</div>}
      </div>
    );
  }

  // Checkbox group mode
  const handleCheckboxChange = (optionValue: string | number) => {
    if (disabled) return;
    
    const newValues = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    
    onChange?.(newValues as (string | number)[]);
  };

  return (
    <fieldset className={`wx-checkbox-group${error ? ' wx-checkbox-group-error' : ''}`} data-testid={testId} style={columns ? { display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, flexDirection: undefined } : undefined}>
      {(label || groupLabel) && (
        <legend className="wx-checkbox-group-label" style={columns ? { gridColumn: '1 / -1' } : undefined}>
          {label || groupLabel}
        </legend>
      )}
      
      {loading && <div className="wx-checkbox-loading">{t('select.loadingOptions')}</div>}
      
      {!loading && options.length === 0 && (
        <div className="wx-checkbox-no-options">{t('select.noOptions')}</div>
      )}
      
      {!loading && options.map((option) => (
        <label key={option.value} className={`wx-checkbox-wrapper ${disabled ? 'wx-checkbox-disabled' : ''}`}>
          <input
            type="checkbox"
            name={name}
            value={option.value}
            checked={value.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
            disabled={disabled}
            className="wx-checkbox"
            aria-describedby={ariaDescribedBy}
          />
          <span className="wx-checkbox-label">{option.label}</span>
        </label>
      ))}
      {error && <div className="wx-checkbox-error-text" role="alert">{error}</div>}
    </fieldset>
  );
}
