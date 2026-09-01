/**
 * @file engines/SearchEngine.ts
 * Instant search and highlighting for visualization nodes.
 */

import type { VisNode, SearchResult, SearchState } from '../types';

export class SearchEngine {
  /**
   * Search nodes by query string.
   * Checks label, subtitle, and top-level string values in node.data.
   */
  search(nodes: VisNode[], query: string): SearchState {
    if (!query.trim()) {
      return { query, results: [], activeIndex: -1 };
    }

    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    for (const node of nodes) {
      let score = 0;
      let matchedField = '';

      if (node.label.toLowerCase().includes(q)) {
        score = node.label.toLowerCase() === q ? 100 : 80;
        matchedField = 'label';
      } else if (node.subtitle?.toLowerCase().includes(q)) {
        score = 60;
        matchedField = 'subtitle';
      } else if (node.data) {
        for (const [key, value] of Object.entries(node.data)) {
          if (typeof value === 'string' && value.toLowerCase().includes(q)) {
            score = 40;
            matchedField = key;
            break;
          }
        }
      }

      if (score > 0) {
        results.push({ nodeId: node.id, matchedField, score });
      }
    }

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    return {
      query,
      results,
      activeIndex: results.length > 0 ? 0 : -1,
    };
  }

  /**
   * Get the node id for the currently active search result.
   */
  getActiveNodeId(state: SearchState): string | null {
    if (state.activeIndex < 0 || state.activeIndex >= state.results.length) {
      return null;
    }
    return state.results[state.activeIndex].nodeId;
  }

  /**
   * Navigate to the next search result.
   */
  next(state: SearchState): SearchState {
    if (state.results.length === 0) return state;
    return {
      ...state,
      activeIndex: (state.activeIndex + 1) % state.results.length,
    };
  }

  /**
   * Navigate to the previous search result.
   */
  prev(state: SearchState): SearchState {
    if (state.results.length === 0) return state;
    return {
      ...state,
      activeIndex:
        (state.activeIndex - 1 + state.results.length) % state.results.length,
    };
  }

  /**
   * Apply search highlights to nodes (returns new array with highlighted flags set).
   */
  applyHighlights(nodes: VisNode[], state: SearchState): VisNode[] {
    const matchedIds = new Set(state.results.map((r) => r.nodeId));
    const activeId = this.getActiveNodeId(state);

    return nodes.map((n) => ({
      ...n,
      highlighted: matchedIds.has(n.id),
      selected: n.id === activeId ? true : n.selected,
    }));
  }
}
