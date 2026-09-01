/**
 * Hook for documentation search with debouncing and caching
 */

import { useState, useCallback, useEffect } from 'react';
import { useDocumentation } from '../context/DocumentationContext';
import type { SearchResult } from '../types/documentation';

export interface UseDocumentationSearchOptions {
  debounceMs?: number;
  minChars?: number;
}

export interface UseDocumentationSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
  error: Error | null;
  clearSearch: () => void;
}

export function useDocumentationSearch(
  options: UseDocumentationSearchOptions = {}
): UseDocumentationSearchReturn {
  const { debounceMs = 300, minChars = 2 } = options;
  const { search: contextSearch } = useDocumentation();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length < minChars) {
        setResults([]);
        return;
      }

      try {
        setIsSearching(true);
        setError(null);
        const searchResults = await contextSearch(query);
        setResults(searchResults);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, minChars, contextSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    error,
    clearSearch,
  };
}
