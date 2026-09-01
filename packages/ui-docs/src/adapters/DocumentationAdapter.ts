/**
 * Documentation Adapter Interface
 * 
 * Defines the contract for documentation data sources.
 * Implementations can connect to various sources:
 * - JSON files
 * - REST APIs
 * - GraphQL endpoints
 * - MCPs (Model Context Protocol)
 * - Git repositories
 * - Databases
 * 
 * The rendering engine never accesses files or APIs directly -
 * all data flows through adapters, enabling flexible and extensible architecture.
 * 
 * Supports WaysNX Documentation Artifacts v1:
 * - component.json
 * - component.schema.json
 * - component.md
 * - component.demo.generated.json
 */

import type {
  Library,
  Component,
  SearchResult,
  Relationship,
  DesignToken,
  SearchIndex,
  ComponentSchema,
  DemoCategory,
  MergedDocumentation,
} from '../types/documentation';

export interface DocumentationAdapter {
  /**
   * Get all available libraries
   */
  getLibraries(): Promise<Library[]>;

  /**
   * Get a specific library by ID
   */
  getLibrary(id: string): Promise<Library | null>;

  /**
   * Get a specific component by ID
   */
  getComponent(id: string): Promise<Component | null>;

  /**
   * Get a component by library ID and component slug
   */
  getComponentBySlug(libraryId: string, slug: string): Promise<Component | null>;

  /**
   * Search documentation
   * Supports component names, categories, keywords, and content search
   */
  search(query: string, options?: SearchOptions): Promise<SearchResult[]>;

  /**
   * Get design tokens for a library
   */
  getTokens(libraryId: string): Promise<DesignToken[]>;

  /**
   * Get relationships between components
   */
  getRelationships(componentId?: string): Promise<Relationship[]>;

  /**
   * Get search index metadata (for static search implementations)
   */
  getSearchIndex(): Promise<SearchIndex | null>;

  // ========================================================================
  // New Artifact Support - v1
  // ========================================================================

  /**
   * Get component schema (component.schema.json)
   * Describes the component's prop structure and types
   */
  getComponentSchema?(componentId: string): Promise<ComponentSchema | null>;

  /**
   * Get component markdown (component.md)
   * Long-form documentation, examples, best practices, etc.
   */
  getComponentMarkdown?(componentId: string): Promise<string | null>;

  /**
   * Get component demos (component.demo.generated.json)
   * Categorized, generated examples with metadata
   */
  getComponentDemos?(componentId: string): Promise<DemoCategory[] | null>;

  /**
   * Get merged documentation
   * Combines component.json, schema, markdown, and demos into one model
   * Adapters can implement this for optimization
   */
  getMergedDocumentation?(componentId: string): Promise<MergedDocumentation | null>;
}

export interface SearchOptions {
  libraryId?: string;
  type?: 'component' | 'library' | 'token' | 'page';
  limit?: number;
  offset?: number;
}

/**
 * Base adapter class for common functionality
 */
export abstract class BaseDocumentationAdapter implements DocumentationAdapter {
  abstract getLibraries(): Promise<Library[]>;
  abstract getLibrary(id: string): Promise<Library | null>;
  abstract getComponent(id: string): Promise<Component | null>;
  abstract getComponentBySlug(libraryId: string, slug: string): Promise<Component | null>;
  abstract search(query: string, options?: SearchOptions): Promise<SearchResult[]>;

  async getTokens(libraryId: string): Promise<DesignToken[]> {
    const library = await this.getLibrary(libraryId);
    return library?.tokens || [];
  }

  async getRelationships(_componentId?: string): Promise<Relationship[]> {
    return [];
  }

  async getSearchIndex(): Promise<SearchIndex | null> {
    return null;
  }

  // New artifact methods with defaults
  async getComponentSchema?(componentId: string): Promise<ComponentSchema | null> {
    // Override in subclass
    return null;
  }

  async getComponentMarkdown?(componentId: string): Promise<string | null> {
    // Override in subclass
    return null;
  }

  async getComponentDemos?(componentId: string): Promise<DemoCategory[] | null> {
    // Override in subclass
    return null;
  }

  async getMergedDocumentation?(
    componentId: string
  ): Promise<MergedDocumentation | null> {
    // Default implementation: merge available artifacts
    const [component, schema, markdown, demos] = await Promise.all([
      this.getComponent(componentId),
      this.getComponentSchema?.(componentId),
      this.getComponentMarkdown?.(componentId),
      this.getComponentDemos?.(componentId),
    ]);

    if (!component) return null;

    return {
      component,
      schema: schema || undefined,
      markdown: markdown || undefined,
      demos: demos || undefined,
      relationships: await this.getRelationships(componentId),
      loadedArtifacts: {
        component: true,
        schema: !!schema,
        markdown: !!markdown,
        demos: !!demos,
      },
    };
  }
}

