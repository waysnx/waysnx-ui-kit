/**
 * @file components/SearchBox/SearchBox.tsx
 * Search input for instant node search and navigation within the visualization.
 */

import React, { useCallback, useRef } from 'react';
import type { SearchState } from '../../types';
import { useTranslation } from '@waysnx/ui-i18n';

export interface SearchBoxProps {
  searchState: SearchState;
  onSearch: (query: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onClear: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchBox({
  searchState,
  onSearch,
  onNext,
  onPrev,
  onClear,
  placeholder,
  className = '',
}: SearchBoxProps) {
  const { t } = useTranslation();
  const resolvedPlaceholder = placeholder ?? t('visualization.search.placeholder');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    [onSearch]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.shiftKey ? onPrev() : onNext();
      }
      if (e.key === 'Escape') {
        onClear();
        inputRef.current?.blur();
      }
    },
    [onNext, onPrev, onClear]
  );

  const hasResults = searchState.results.length > 0;
  const activeIdx = searchState.activeIndex + 1;
  const total = searchState.results.length;

  return (
    <div
      className={`wx-vis-searchbox ${className}`}
      role="search"
      aria-label={t('visualization.search.ariaLabel')}
    >
      {/* Search icon */}
      <svg
        className="wx-vis-searchbox__icon"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>

      <input
        ref={inputRef}
        className="wx-vis-searchbox__input"
        type="search"
        value={searchState.query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={resolvedPlaceholder}
        aria-label={resolvedPlaceholder}
        autoComplete="off"
        spellCheck={false}
      />

      {/* Results count */}
      {searchState.query && (
        <span
          className="wx-vis-searchbox__count"
          aria-live="polite"
          aria-atomic="true"
        >
          {hasResults
            ? t('visualization.search.resultCount', { current: activeIdx, total })
            : t('visualization.search.noResults')}
        </span>
      )}

      {/* Prev / Next */}
      {hasResults && (
        <div className="wx-vis-searchbox__nav" role="group" aria-label="Navigate results">
          <button
            className="wx-vis-searchbox__nav-btn"
            onClick={onPrev}
            aria-label={t('visualization.search.prev')}
            type="button"
            title={t('visualization.search.prev')}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>
          </button>
          <button
            className="wx-vis-searchbox__nav-btn"
            onClick={onNext}
            aria-label={t('visualization.search.next')}
            type="button"
            title={t('visualization.search.next')}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
            </svg>
          </button>
        </div>
      )}

      {/* Clear */}
      {searchState.query && (
        <button
          className="wx-vis-searchbox__clear"
          onClick={onClear}
          aria-label={t('visualization.search.clear')}
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBox;
