import React, { useState, useEffect } from 'react';
import './Radio.css';
import { getCachedOptions } from '../../utils/xrefCache';
import { useTranslation } from '@waysnx/ui-i18n';

export interface RadioOption {
  label: string;
  value: string | number;
}

export interface RadioProps {
  label?: string;
  name: string;
  options?: RadioOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  columns?: number;
  ariaDescribedBy?: string;
  
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

export function Radio({
  label,
  name,
  options: propOptions,
  value,
  onChange,
  disabled = false,
  columns,
  ariaDescribedBy,
  fetchOptions,
  xrefUrl,
  xrefIdProp,
  xrefDisplayProp,
  onLoadStart,
  onLoadEnd,
  onError,
  error,
  testId,
}: RadioProps) {
  const { t } = useTranslation();
  const [options, setOptions] = useState<RadioOption[]>(propOptions || []);
  const [loading, setLoading] = useState(false);

  // Fetch options dynamically if xref properties are provided AND no static options
  useEffect(() => {
    if (fetchOptions && xrefUrl && xrefIdProp && xrefDisplayProp && (!propOptions || propOptions.length === 0)) {
      const loadOptions = async () => {
        try {
          setLoading(true);
          onLoadStart?.();
          
          const data = await getCachedOptions(xrefUrl, fetchOptions);
          const mappedOptions: RadioOption[] = (Array.isArray(data) ? data : (data as any).data || []).map((item: any) => ({
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

  const handleChange = (optionValue: string | number) => {
    if (!disabled) {
      onChange?.(optionValue);
    }
  };

  return (
    <fieldset className={`wx-radio-group${error ? ' wx-radio-group-error' : ''}`} data-testid={testId} style={columns ? { display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, flexDirection: undefined } : undefined}>
      {label && (
        <legend className="wx-radio-group-label" style={columns ? { gridColumn: '1 / -1' } : undefined}>
          {label}
        </legend>
      )}
      
      {loading && <div className="wx-radio-loading">{t('select.loadingOptions')}</div>}
      
      {!loading && options.length === 0 && (
        <div className="wx-radio-no-options">{t('select.noOptions')}</div>
      )}
      
      {!loading && options.map((option) => (
        <label key={option.value} className={`wx-radio-wrapper ${disabled ? 'wx-radio-disabled' : ''}`}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => handleChange(option.value)}
            disabled={disabled}
            className="wx-radio"
            aria-describedby={ariaDescribedBy}
          />
          <span className="wx-radio-label">{option.label}</span>
        </label>
      ))}
      {error && <div className="wx-radio-error-text" role="alert">{error}</div>}
    </fieldset>
  );
}
