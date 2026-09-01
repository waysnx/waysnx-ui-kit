/**
 * @file hooks/useSearch.ts
 * Search and filter state for visualization nodes.
 */

import { useState, useCallback, useMemo } from 'react';
import type { VisNode, SearchState } from '../types';
import { SearchEngine } from '../engines/SearchEngine';

export interface UseSearchReturn {
  searchState: SearchState;
  setQuery: (query: string) => void;
  nextResult: () => void;
  prevResult: () => void;
  clearSearch: () => void;
  highlightedNodes: VisNode[];
  activeNodeId: string | null;
}

const engine = new SearchEngine();

export function useSearch(nodes: VisNode[]): UseSearchReturn {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    results: [],
    activeIndex: -1,
  });

  const setQuery = useCallback(
    (query: string) => {
      setSearchState(engine.search(nodes, query));
    },
    [nodes]
  );

  const nextResult = useCallback(() => {
    setSearchState((prev) => engine.next(prev));
  }, []);

  const prevResult = useCallback(() => {
    setSearchState((prev) => engine.prev(prev));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchState({ query: '', results: [], activeIndex: -1 });
  }, []);

  const highlightedNodes = useMemo(
    () => engine.applyHighlights(nodes, searchState),
    [nodes, searchState]
  );

  const activeNodeId = useMemo(
    () => engine.getActiveNodeId(searchState),
    [searchState]
  );

  return {
    searchState,
    setQuery,
    nextResult,
    prevResult,
    clearSearch,
    highlightedNodes,
    activeNodeId,
  };
}
