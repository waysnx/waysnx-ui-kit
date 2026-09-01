/**
 * Documentation Context
 * 
 * Manages state and data for the documentation system.
 * Provides access to:
 * - Libraries and components
 * - Search functionality
 * - Loading and error states
 * - Caching
 */

import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import type {
  Library,
  Component,
  SearchResult,
  Relationship,
  DesignToken,
} from '../types/documentation';
import type { DocumentationAdapter, SearchOptions } from '../adapters/DocumentationAdapter';

export interface DocumentationContextValue {
  // State
  isLoading: boolean;
  error: Error | null;

  // Data access
  libraries: Library[];
  currentLibrary: Library | null;
  currentComponent: Component | null;

  // Actions
  loadLibraries(): Promise<void>;
  loadLibrary(id: string): Promise<Library | null>;
  loadComponent(id: string): Promise<Component | null>;
  loadComponentBySlug(libraryId: string, slug: string): Promise<Component | null>;
  search(query: string, options?: SearchOptions): Promise<SearchResult[]>;
  getTokens(libraryId: string): Promise<DesignToken[]>;
  getRelationships(componentId?: string): Promise<Relationship[]>;

  // Utils
  setCurrentLibrary(library: Library | null): void;
  setCurrentComponent(component: Component | null): void;
  clearError(): void;
}

export const DocumentationContext = createContext<DocumentationContextValue | undefined>(undefined);

export interface DocumentationProviderProps {
  adapter: DocumentationAdapter;
  children: ReactNode;
  enableCaching?: boolean;
}

/**
 * Documentation Provider
 * 
 * Wraps your application with documentation capabilities.
 * Manages data loading, caching, and error handling.
 */
export function DocumentationProvider({
  adapter,
  children,
  enableCaching = true,
}: DocumentationProviderProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [currentLibrary, setCurrentLibrary] = useState<Library | null>(null);
  const [currentComponent, setCurrentComponent] = useState<Component | null>(null);

  // Simple cache
  const cache = React.useRef<Map<string, unknown>>(new Map());

  const getCached = useCallback((key: string) => {
    return enableCaching ? cache.current.get(key) : null;
  }, [enableCaching]);

  const setCached = useCallback((key: string, value: unknown) => {
    if (enableCaching) {
      cache.current.set(key, value);
    }
  }, [enableCaching]);

  const loadLibraries = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const cached = getCached('libraries') as Library[] | undefined;
      if (cached) {
        setLibraries(cached);
        return;
      }

      const data = await adapter.getLibraries();
      setLibraries(data);
      setCached('libraries', data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      console.error('Failed to load libraries:', error);
    } finally {
      setIsLoading(false);
    }
  }, [adapter, getCached, setCached]);

  const loadLibrary = useCallback(
    async (id: string): Promise<Library | null> => {
      try {
        setIsLoading(true);
        setError(null);

        const cached = getCached(`library:${id}`) as Library | undefined;
        if (cached) {
          return cached;
        }

        const library = await adapter.getLibrary(id);
        if (library) {
          setCached(`library:${id}`, library);
        }
        return library;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error(`Failed to load library ${id}:`, error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [adapter, getCached, setCached]
  );

  const loadComponent = useCallback(
    async (id: string): Promise<Component | null> => {
      try {
        setIsLoading(true);
        setError(null);

        const cached = getCached(`component:${id}`) as Component | undefined;
        if (cached) {
          return cached;
        }

        const component = await adapter.getComponent(id);
        if (component) {
          setCached(`component:${id}`, component);
        }
        return component;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error(`Failed to load component ${id}:`, error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [adapter, getCached, setCached]
  );

  const loadComponentBySlug = useCallback(
    async (libraryId: string, slug: string): Promise<Component | null> => {
      try {
        setIsLoading(true);
        setError(null);

        const cacheKey = `component:${libraryId}:${slug}`;
        const cached = getCached(cacheKey) as Component | undefined;
        if (cached) {
          return cached;
        }

        const component = await adapter.getComponentBySlug(libraryId, slug);
        if (component) {
          setCached(cacheKey, component);
        }
        return component;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error(`Failed to load component ${libraryId}/${slug}:`, error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [adapter, getCached, setCached]
  );

  const search = useCallback(
    async (query: string, options?: SearchOptions): Promise<SearchResult[]> => {
      try {
        setError(null);
        return await adapter.search(query, options);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error('Search failed:', error);
        return [];
      }
    },
    [adapter]
  );

  const getTokens = useCallback(
    async (libraryId: string): Promise<DesignToken[]> => {
      try {
        setError(null);

        const cacheKey = `tokens:${libraryId}`;
        const cached = getCached(cacheKey) as DesignToken[] | undefined;
        if (cached) {
          return cached;
        }

        const tokens = await adapter.getTokens(libraryId);
        setCached(cacheKey, tokens);
        return tokens;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error(`Failed to load tokens for ${libraryId}:`, error);
        return [];
      }
    },
    [adapter, getCached, setCached]
  );

  const getRelationships = useCallback(
    async (componentId?: string): Promise<Relationship[]> => {
      try {
        setError(null);

        const cacheKey = componentId ? `relationships:${componentId}` : 'relationships';
        const cached = getCached(cacheKey) as Relationship[] | undefined;
        if (cached) {
          return cached;
        }

        const relationships = await adapter.getRelationships(componentId);
        setCached(cacheKey, relationships);
        return relationships;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error('Failed to load relationships:', error);
        return [];
      }
    },
    [adapter, getCached, setCached]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: DocumentationContextValue = {
    isLoading,
    error,
    libraries,
    currentLibrary,
    currentComponent,
    loadLibraries,
    loadLibrary,
    loadComponent,
    loadComponentBySlug,
    search,
    getTokens,
    getRelationships,
    setCurrentLibrary,
    setCurrentComponent,
    clearError,
  };

  return (
    <DocumentationContext.Provider value={value}>
      {children}
    </DocumentationContext.Provider>
  );
}

/**
 * Hook to access documentation context
 * 
 * Usage:
 * ```tsx
 * const { libraries, search } = useDocumentation();
 * ```
 */
export function useDocumentation(): DocumentationContextValue {
  const context = useContext(DocumentationContext);
  if (!context) {
    throw new Error('useDocumentation must be used within a DocumentationProvider');
  }
  return context;
}
