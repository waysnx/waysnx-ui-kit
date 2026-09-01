import React, { SelectHTMLAttributes, useState, useRef, useEffect } from "react";
import "./Select.css";
import { getCachedOptions } from '../../utils/xrefCache';
import { useTranslation } from '@waysnx/ui-i18n';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'multiple' | 'onChange' | 'onError'> {
  label?: string;
  options?: SelectOption[];
  multiple?: boolean;
  showSelectAll?: boolean;
  searchable?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;

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

export function Select({
  label,
  options: propOptions,
  multiple,
  showSelectAll,
  searchable = false,
  value,
  onChange,
  fetchOptions,
  xrefUrl,
  xrefIdProp,
  xrefDisplayProp,
  onLoadStart,
  onLoadEnd,
  onError,
  error,
  testId,
  ...r
}: SelectProps) {
  const [options, setOptions] = useState<SelectOption[]>(propOptions || []);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const selectId = r.id || `wx-select-${Math.random().toString(36).slice(2)}`;

  // Fetch options dynamically if xref properties are provided
  useEffect(() => {
    if (fetchOptions && xrefUrl && xrefIdProp && xrefDisplayProp) {
      const loadOptions = async () => {
        try {
          setLoading(true);
          onLoadStart?.();
          const data = await getCachedOptions(xrefUrl, fetchOptions);
          const mappedOptions: SelectOption[] = (Array.isArray(data) ? data : (data as any).data || []).map((item: any) => ({
            value: item[xrefIdProp],
            label: item[xrefDisplayProp],
          }));
          setOptions(mappedOptions);
          onLoadEnd?.();
        } catch (err) {
          console.error('Failed to fetch options:', err);
          onError?.(err as Error);
        } finally {
          setLoading(false);
        }
      };
      loadOptions();
    } else if (propOptions) {
      setOptions(propOptions);
    }
  }, [fetchOptions, xrefUrl, xrefIdProp, xrefDisplayProp, propOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          if (multiple) {
            handleCheckboxChange(String(filteredOptions[focusedIndex].value));
          } else {
            handleSingleSelect(String(filteredOptions[focusedIndex].value));
          }
        }
        break;
      case 'Tab':
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
        break;
    }
  };

  const filteredOptions = searchTerm
    ? options.filter((o) => o.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  const handleSingleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleCheckboxChange = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v: string) => v !== optionValue)
      : [...selectedValues, optionValue];
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const handleSelectAll = () => {
    const allValues = options.map((o: SelectOption) => String(o.value));
    const newValues = selectedValues.length === options.length ? [] : allValues;
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return t('select.placeholder');
    if (selectedValues.length === options.length) return t('select.selectAll');
    return `${selectedValues.length} selected`;
  };

  const getSingleDisplayText = () => {
    if (!value) return t('select.placeholder');
    const found = options.find((o: SelectOption) => String(o.value) === String(value));
    return found ? found.label : t('select.placeholder');
  };

  // Single select -- custom dropdown (non-searchable)
  if (!multiple && !searchable) {
    return (
      <div className={`wx-select-wrapper${error ? ' wx-select-error' : ''}`} ref={wrapperRef} data-testid={testId}>
        {label && <label htmlFor={selectId}>{label}</label>}
        <div
          ref={triggerRef}
          id={selectId}
          className={`wx-select-multi ${loading ? 'wx-select-loading' : ''} ${r.disabled ? 'wx-select-disabled' : ''}`}
          onClick={() => !loading && !r.disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${selectId}-listbox`}
          tabIndex={r.disabled ? -1 : 0}
        >
          <span>{loading ? t('general.loading') : getSingleDisplayText()}</span>
          <span className="wx-select-arrow" aria-hidden="true" />
        </div>
        {isOpen && !loading && (
          <div className="wx-select-dropdown" id={`${selectId}-listbox`} role="listbox">
            {options.length === 0 && (
              <div className="wx-select-no-options">{t('select.noOptions')}</div>
            )}
            {options.map((option: SelectOption, index: number) => (
              <div
                key={option.value}
                className={`wx-select-option ${String(option.value) === String(value) ? 'wx-select-option--selected' : ''} ${index === focusedIndex ? 'wx-select-option--focused' : ''}`}
                onClick={() => handleSingleSelect(String(option.value))}
                role="option"
                aria-selected={String(option.value) === String(value)}
              >
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        )}
        {error && <div className="wx-select-error-text" role="alert">{error}</div>}
      </div>
    );
  }

  // Single select -- searchable custom dropdown
  if (!multiple && searchable) {
    return (
      <div className={`wx-select-wrapper${error ? ' wx-select-error' : ''}`} ref={wrapperRef} data-testid={testId}>
        {label && <label htmlFor={selectId}>{label}</label>}
        <div
          ref={triggerRef}
          id={selectId}
          className={`wx-select-multi ${loading ? 'wx-select-loading' : ''}`}
          onClick={() => !loading && !r.disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${selectId}-listbox`}
          tabIndex={r.disabled ? -1 : 0}
        >
          <span>{loading ? t('general.loading') : getSingleDisplayText()}</span>
          <span className="wx-select-arrow" aria-hidden="true" />
        </div>
        {isOpen && !loading && (
          <div className="wx-select-dropdown" id={`${selectId}-listbox`} role="listbox">
            <div className="wx-select-search">
              <input
                ref={searchRef}
                type="text"
                className="wx-select-search-input"
                placeholder={t('select.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                aria-label={t('select.search')}
              />
            </div>
            {filteredOptions.length === 0 && (
              <div className="wx-select-no-options">No matches found</div>
            )}
            {filteredOptions.map((option: SelectOption, index: number) => (
              <div
                key={option.value}
                className={`wx-select-option ${String(option.value) === String(value) ? 'wx-select-option--selected' : ''} ${index === focusedIndex ? 'wx-select-option--focused' : ''}`}
                onClick={() => handleSingleSelect(String(option.value))}
                role="option"
                aria-selected={String(option.value) === String(value)}
              >
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        )}
        {error && <div className="wx-select-error-text" role="alert">{error}</div>}
      </div>
    );
  }

  // Multi select
  return (
    <div className={`wx-select-wrapper${error ? ' wx-select-error' : ''}`} ref={wrapperRef} data-testid={testId}>
      {label && <label htmlFor={selectId}>{label}</label>}
      <div
        ref={triggerRef}
        id={selectId}
        className={`wx-select-multi ${loading ? 'wx-select-loading' : ''}`}
        onClick={() => !loading && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${selectId}-listbox`}
        tabIndex={r.disabled ? -1 : 0}
      >
        <span>{loading ? t('general.loading') : getDisplayText()}</span>
        <span className="wx-select-arrow" aria-hidden="true" />
      </div>
      {isOpen && !loading && (
        <div className="wx-select-dropdown" id={`${selectId}-listbox`} role="listbox" aria-multiselectable="true">
          {searchable && (
            <div className="wx-select-search">
              <input
                ref={searchRef}
                type="text"
                className="wx-select-search-input"
                placeholder={t('select.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                aria-label={t('select.search')}
              />
            </div>
          )}
          {showSelectAll && !searchTerm && filteredOptions.length > 0 && (
            <label className="wx-select-option wx-select-all-option">
              <input
                type="checkbox"
                checked={selectedValues.length === options.length}
                onChange={handleSelectAll}
                aria-label="Select all options"
              />
              <span>{t('select.selectAll')}</span>
            </label>
          )}
          {filteredOptions.length === 0 && (
            <div className="wx-select-no-options">{t('select.noOptions')}</div>
          )}
          {filteredOptions.map((option: SelectOption, index: number) => (
            <label key={option.value} className={`wx-select-option ${index === focusedIndex ? 'wx-select-option--focused' : ''}`}>
              <input
                type="checkbox"
                checked={selectedValues.includes(String(option.value))}
                onChange={() => handleCheckboxChange(String(option.value))}
                aria-label={option.label}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
      {error && <div className="wx-select-error-text" role="alert">{error}</div>}
    </div>
  );
}
