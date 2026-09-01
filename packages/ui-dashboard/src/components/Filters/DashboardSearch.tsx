/**
 * @file DashboardSearch.tsx
 * Dashboard search component
 */

import React, { useState, CSSProperties, useEffect, useRef } from "react";

/**
 * Dashboard search props
 */
interface DashboardSearchProps {
  /**
   * Search placeholder
   */
  placeholder?: string;

  /**
   * Debounce delay in ms
   */
  debounceDelay?: number;

  /**
   * Show suggestions
   */
  showSuggestions?: boolean;

  /**
   * Search suggestions
   */
  suggestions?: Array<{ label: string; value: any }>;

  /**
   * On search change handler
   */
  onChange?: (value: string) => void;

  /**
   * On search submit handler
   */
  onSubmit?: (value: string) => void;

  /**
   * On suggestion select handler
   */
  onSuggestionSelect?: (suggestion: any) => void;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional CSS styles
   */
  style?: CSSProperties;
}

/**
 * Dashboard Search Component
 *
 * Search input with debouncing, keyboard shortcuts, and suggestions.
 *
 * @example
 * ```tsx
 * <DashboardSearch
 *   placeholder="Search dashboards..."
 *   debounceDelay={300}
 *   onChange={(value) => handleSearch(value)}
 *   suggestions={suggestions}
 * />
 * ```
 */
export const DashboardSearch: React.FC<DashboardSearchProps> = ({
  placeholder = "Search...",
  debounceDelay = 300,
  showSuggestions = false,
  suggestions = [],
  onChange,
  onSubmit,
  onSuggestionSelect,
  className = "",
  style,
}) => {
  const [value, setValue] = useState("");
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onChange?.(value);
    }, debounceDelay);

    return () => {
      if (debounceTimer.current !== undefined) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [value, debounceDelay, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (showSuggestions && e.target.value) {
      setShowSuggestionList(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(value);
    setShowSuggestionList(false);
  };

  const handleSuggestionSelect = (suggestion: any) => {
    setValue(suggestion.label);
    onSuggestionSelect?.(suggestion);
    setShowSuggestionList(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle keyboard navigation in suggestions
    if (showSuggestionList && suggestions.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedSuggestionIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedSuggestionIndex((prev) =>
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (selectedSuggestionIndex >= 0) {
            handleSuggestionSelect(suggestions[selectedSuggestionIndex]);
          } else {
            onSubmit?.(value);
          }
          break;
        case "Escape":
          setShowSuggestionList(false);
          break;
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      onSubmit?.(value);
    }
  };

  const filteredSuggestions =
    showSuggestions && value
      ? suggestions.filter((s) =>
          s.label.toLowerCase().includes(value.toLowerCase())
        )
      : suggestions;

  return (
    <div className={`dashboard-search ${className}`} style={style}>
      <form className="dashboard-search-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="dashboard-search-input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => showSuggestions && value && setShowSuggestionList(true)}
          onBlur={() => setTimeout(() => setShowSuggestionList(false), 200)}
          role="searchbox"
          aria-label="Dashboard search"
        />
        <button
          type="submit"
          className="dashboard-search-button"
          aria-label="Search"
        >
          🔍
        </button>
      </form>

      {showSuggestionList && filteredSuggestions.length > 0 && (
        <div className="dashboard-search-suggestions" role="listbox">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={suggestion.value}
              className={`dashboard-search-suggestion ${
                index === selectedSuggestionIndex ? "selected" : ""
              }`}
              onClick={() => handleSuggestionSelect(suggestion)}
              onMouseEnter={() => setSelectedSuggestionIndex(index)}
              role="option"
              aria-selected={index === selectedSuggestionIndex}
            >
              {suggestion.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

DashboardSearch.displayName = "DashboardSearch";
