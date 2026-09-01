import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './Autocomplete.css';
import { warn } from '../../dev';
import { getCachedOptions } from '../../utils/xrefCache';
import { useTranslation } from '@waysnx/ui-i18n';

export interface AutocompleteOption {
  label: string;
  value: string;
}

export interface AutocompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'onSelect' | 'onError'> {
  options?: AutocompleteOption[];
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: AutocompleteOption | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  noOptionsText?: string;
  minChars?: number;
  id?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  
  // Dynamic options fetching (x-xref pattern)
  fetchOptions?: (url: string) => Promise<any[]>;
  xrefUrl?: string;
  xrefIdProp?: string;
  xrefDisplayProp?: string;
  
  // Loading and error states
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: (error: Error) => void;
  testId?: string;
}

export function Autocomplete({
  options: propOptions,
  value = '',
  onChange,
  onSelect,
  placeholder,
  label,
  error,
  hint,
  disabled = false,
  noOptionsText,
  minChars = 0,
  id,
  ariaLabel,
  ariaDescribedBy,
  fetchOptions,
  xrefUrl,
  xrefIdProp,
  xrefDisplayProp,
  onLoadStart,
  onLoadEnd,
  onError,
  testId,
  ...rest
}: AutocompleteProps) {
  warn(Boolean(label || rest['aria-label'] || ariaLabel), 'Autocomplete needs label');

  const { t } = useTranslation();
  const [options, setOptions] = useState<AutocompleteOption[]>(propOptions || []);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const generatedId = id || `wx-autocomplete-${Math.random().toString(36).slice(2)}`;
  const listboxId = `${generatedId}-listbox`;
  
  // Build aria-describedby with error and hint
  const descriptionIds = [];
  if (error) descriptionIds.push(`${generatedId}-error`);
  if (hint && !error) descriptionIds.push(`${generatedId}-hint`);
  if (ariaDescribedBy) descriptionIds.push(ariaDescribedBy);
  const finalAriaDescribedBy = descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined;

  // Fetch options dynamically if xref properties are provided AND no static options
  useEffect(() => {
    if (fetchOptions && xrefUrl && xrefIdProp && xrefDisplayProp && (!propOptions || propOptions.length === 0)) {
      const loadOptions = async () => {
        try {
          setLoading(true);
          onLoadStart?.();
          
          const data = await getCachedOptions(xrefUrl, fetchOptions);
          const mappedOptions: AutocompleteOption[] = (Array.isArray(data) ? data : (data as any).data || []).map((item: any) => ({
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

  const filteredOptions = inputValue.length >= minChars
    ? options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];

  const showDropdown = isOpen && !disabled && !loading && inputValue.length >= minChars;
  const hasOptions = filteredOptions.length > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
    onChange?.(newValue);
  };

  const handleSelect = (option: AutocompleteOption) => {
    setInputValue(option.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onChange?.(option.label);
    onSelect?.(option);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      highlightedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="wx-autocomplete-wrapper" ref={wrapperRef} data-testid={testId}>
      {label && <label htmlFor={generatedId} className="wx-autocomplete-label">{label}</label>}
      
      <input
        ref={inputRef}
        id={generatedId}
        type="text"
        className={`wx-autocomplete-input ${error ? 'wx-autocomplete-input-error' : ''} ${loading ? 'wx-autocomplete-input-loading' : ''}`}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder={loading ? t('general.loading') : placeholder}
        disabled={disabled || loading}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showDropdown}
        aria-controls={listboxId}
        aria-activedescendant={
          highlightedIndex >= 0 ? `${generatedId}-option-${highlightedIndex}` : undefined
        }
        aria-label={ariaLabel || label}
        aria-invalid={!!error}
        aria-describedby={finalAriaDescribedBy}
        {...rest}
      />

      {showDropdown && (
        <ul
          ref={listRef}
          id={listboxId}
          className="wx-autocomplete-dropdown"
          role="listbox"
          style={{ listStyleType: 'none', paddingLeft: 0 }}
        >
          {hasOptions ? (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                id={`${generatedId}-option-${index}`}
                className={`wx-autocomplete-option ${
                  index === highlightedIndex ? 'wx-autocomplete-option-highlighted' : ''
                }`}
                role="option"
                aria-selected={index === highlightedIndex}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="wx-autocomplete-no-options">{noOptionsText || t('select.noOptions')}</li>
          )}
        </ul>
      )}

      {hint && !error && <div className="wx-autocomplete-hint" id={`${generatedId}-hint`}>{hint}</div>}
      {error && <div className="wx-autocomplete-error-text" id={`${generatedId}-error`} role="alert">{error}</div>}
    </div>
  );
}
