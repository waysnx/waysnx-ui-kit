/**
 * @file components/SearchNavigation/SearchNavigation.tsx
 * SearchNavigation component for site-wide search and navigation
 */

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
  useMemo,
} from 'react';
import { useTranslation } from '@waysnx/ui-i18n';
import './search-navigation.css';

/**
 * Search result item
 */
export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category?: string;
  icon?: React.ReactNode;
  url?: string;
  metadata?: Record<string, any>;
}

/**
 * Search category
 */
export interface SearchCategory {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

/**
 * SearchNavigation component props
 */
export interface SearchNavigationProps {
  /**
   * Callback to perform search
   */
  onSearch: (query: string) => Promise<SearchResult[]>;

  /**
   * Callback when result is selected
   */
  onSelect: (result: SearchResult) => void;

  /**
   * Search input placeholder
   */
  placeholder?: string;

  /**
   * Available search categories
   */
  categories?: SearchCategory[];

  /**
   * Max results to display
   */
  maxResults?: number;

  /**
   * Debounce delay in ms
   */
  debounceMs?: number;

  /**
   * Show search history
   */
  showHistory?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: React.CSSProperties;

  /**
   * Loading state
   */
  isLoading?: boolean;

  /**
   * Search icon
   */
  searchIcon?: React.ReactNode;

  /**
   * Clear search button visible
   */
  showClear?: boolean;

  /**
   * Auto-focus on mount
   */
  autoFocus?: boolean;

  /**
   * Accessible label
   */
  ariaLabel?: string;

  /**
   * Number of recent searches to show
   */
  recentCount?: number;

  /**
   * Group results by category
   */
  groupByCategory?: boolean;
}

/**
 * SearchNavigation Component
 *
 * Site-wide search with real-time results, categories, and history.
 *
 * @example
 * ```tsx
 * <SearchNavigation
 *   onSearch={handleSearch}
 *   onSelect={handleSelect}
 *   categories={searchCategories}
 * />
 * ```
 */
export const SearchNavigation = forwardRef<HTMLDivElement, SearchNavigationProps>(
  (
    {
      onSearch,
      onSelect,
      placeholder = 'Search...',
      categories,
      maxResults = 10,
      debounceMs = 300,
      showHistory = true,
      className = '',
      style,
      searchIcon = '🔍',
      showClear = true,
      autoFocus = false,
      ariaLabel = 'Search',
      recentCount = 5,
      groupByCategory = true,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    // Load recent searches
    useEffect(() => {
      try {
        const stored = localStorage.getItem('searchNavigationRecent');
        if (stored) {
          const recent = JSON.parse(stored) as SearchResult[];
          setRecentSearches(recent.slice(0, recentCount));
        }
      } catch {
        // Ignore localStorage errors
      }
    }, [recentCount]);

    // Auto-focus on mount
    useEffect(() => {
      if (autoFocus) {
        inputRef.current?.focus();
      }
    }, [autoFocus]);

    // Filter results by selected category
    const filteredResults = useMemo(() => {
      if (!selectedCategory) return results;
      return results.filter((r) => r.category === selectedCategory);
    }, [results, selectedCategory]);

    // Group results by category
    const groupedResults = useMemo(() => {
      if (!groupByCategory) return { 'all': filteredResults };

      const groups: Record<string, SearchResult[]> = {};
      filteredResults.forEach((result) => {
        const category = result.category || 'other';
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(result);
      });
      return groups;
    }, [filteredResults, groupByCategory]);

    // Flatten grouped results for navigation
    const flatResults = useMemo(() => {
      return Object.values(groupedResults).flat();
    }, [groupedResults]);

    // Handle search with debounce
    const handleSearch = useCallback(
      async (searchQuery: string) => {
        setQuery(searchQuery);
        setSelectedIndex(0);

        if (!searchQuery.trim()) {
          setResults([]);
          return;
        }

        // Clear previous timeout
        if (debounceTimeoutRef.current !== undefined) {
          clearTimeout(debounceTimeoutRef.current);
          debounceTimeoutRef.current = undefined;
        }

        // Set debounced search
        debounceTimeoutRef.current = setTimeout(async () => {
          setIsSearching(true);
          try {
            const searchResults = await onSearch(searchQuery);
            setResults(searchResults.slice(0, maxResults));
          } catch (error) {
            console.error('Search error:', error);
            setResults([]);
          } finally {
            setIsSearching(false);
          }
        }, debounceMs);
      },
      [onSearch, maxResults, debounceMs]
    );

    // Handle result selection
    const handleSelectResult = useCallback(
      (result: SearchResult) => {
        onSelect(result);

        // Save to recent
        const newRecent = [
          result,
          ...recentSearches.filter((r) => r.id !== result.id),
        ].slice(0, recentCount);
        setRecentSearches(newRecent);
        try {
          localStorage.setItem('searchNavigationRecent', JSON.stringify(newRecent));
        } catch {
          // Ignore localStorage errors
        }

        // Clear search
        setQuery('');
        setResults([]);
        setShowResults(false);
      },
      [recentSearches, recentCount, onSelect]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex((i) => (i + 1) % flatResults.length);
            break;
          case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex((i) => (i - 1 + flatResults.length) % flatResults.length);
            break;
          case 'Enter':
            e.preventDefault();
            if (flatResults[selectedIndex]) {
              handleSelectResult(flatResults[selectedIndex]);
            }
            break;
          case 'Escape':
            e.preventDefault();
            setShowResults(false);
            setQuery('');
            break;
          default:
            break;
        }
      },
      [flatResults, selectedIndex, handleSelectResult]
    );

    // Handle outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setShowResults(false);
        }
      };

      if (showResults) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [showResults]);

    // Focus selected item
    useEffect(() => {
      if (showResults && listRef.current && flatResults.length > 0) {
        const items = listRef.current.querySelectorAll('[role="option"]');
        const selectedItem = items[selectedIndex] as HTMLElement;
        if (selectedItem && typeof (selectedItem as any).scrollIntoView === 'function') {
          (selectedItem as any).scrollIntoView({ block: 'nearest' });
        }
      }
    }, [selectedIndex, showResults, flatResults]);

    const displayResults =
      showResults && query.trim() && (flatResults.length > 0 || isSearching);
    const displayRecent = showResults && !query.trim() && recentSearches.length > 0 && showHistory;

    return (
      <div
        ref={ref || containerRef}
        className={`search-navigation nav-component ${className}`}
        style={style}
      >
        {/* Search Input */}
        <div className="search-navigation__input-wrapper">
          {searchIcon && <span className="search-navigation__icon">{searchIcon}</span>}
          <input
            ref={inputRef}
            type="text"
            className="search-navigation__input"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              handleSearch(e.target.value);
              setShowResults(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (query || recentSearches.length > 0) {
                setShowResults(true);
              }
            }}
            aria-label={ariaLabel}
            role="combobox"
            aria-expanded={displayResults || displayRecent}
            aria-autocomplete="list"
            aria-controls="search-results"
          />
          {showClear && query && (
            <button
              className="search-navigation__clear"
              onClick={() => {
                setQuery('');
                setResults([]);
                setShowResults(false);
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              title="Clear"
            >
              ✕
            </button>
          )}
          {isSearching && (
            <span className="search-navigation__loading" aria-label="Loading" title="Loading">
              ⟳
            </span>
          )}
        </div>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="search-navigation__categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`search-navigation__category ${
                  selectedCategory === cat.id ? 'search-navigation__category--active' : ''
                }`}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
                }
                title={cat.label}
              >
                {cat.icon && <span className="search-navigation__category-icon">{cat.icon}</span>}
                <span className="search-navigation__category-label">{cat.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Results Dropdown */}
        {displayResults && (
          <div className="search-navigation__results-container">
            {isSearching ? (
              <div className="search-navigation__loading-state">
                <span className="search-navigation__spinner" />
                <span>{t('navigation.search')}...</span>
              </div>
            ) : flatResults.length > 0 ? (
              <ul
                id="search-results"
                ref={listRef}
                className="search-navigation__results"
                role="listbox"
              >
                {groupByCategory && Object.entries(groupedResults).map(([category, items]) => (
                  <li key={category} className="search-navigation__group">
                    {category !== 'all' && items.length > 0 && (
                      <div className="search-navigation__group-header">{category}</div>
                    )}
                    {items.map((result) => (
                      <div
                        key={result.id}
                        className={`search-navigation__item ${
                          flatResults.indexOf(result) === selectedIndex
                            ? 'search-navigation__item--selected'
                            : ''
                        }`}
                        role="option"
                        aria-selected={flatResults.indexOf(result) === selectedIndex}
                        onClick={() => handleSelectResult(result)}
                        onMouseEnter={() => setSelectedIndex(flatResults.indexOf(result))}
                      >
                        {result.icon && (
                          <span className="search-navigation__result-icon">{result.icon}</span>
                        )}
                        <div className="search-navigation__result-content">
                          <div className="search-navigation__result-title">{result.title}</div>
                          {result.description && (
                            <div className="search-navigation__result-description">
                              {result.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="search-navigation__empty">
                <p>{t('navigation.noResults')}</p>
              </div>
            )}
          </div>
        )}

        {/* Recent Searches */}
        {displayRecent && (
          <div className="search-navigation__results-container">
            <div className="search-navigation__recent-header">Recent Searches</div>
            <ul className="search-navigation__recent" role="listbox">
              {recentSearches.map((result) => (
                <li
                  key={result.id}
                  className={`search-navigation__recent-item ${
                    recentSearches.indexOf(result) === selectedIndex
                      ? 'search-navigation__recent-item--selected'
                      : ''
                  }`}
                  role="option"
                  aria-selected={recentSearches.indexOf(result) === selectedIndex}
                  onClick={() => handleSelectResult(result)}
                  onMouseEnter={() => setSelectedIndex(recentSearches.indexOf(result))}
                >
                  <span className="search-navigation__recent-icon">🕐</span>
                  <span className="search-navigation__recent-title">{result.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

SearchNavigation.displayName = 'SearchNavigation';

export default SearchNavigation;
