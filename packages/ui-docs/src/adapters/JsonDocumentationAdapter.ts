/**
 * JSON Documentation Adapter
 * 
 * Loads documentation from JSON files and performs in-memory search.
 * Suitable for static sites and pre-generated documentation.
 * 
 * Supports WaysNX Documentation Artifacts v1:
 * - libraries.json: Array<Library>
 * - components.json: Array<Component>
 * - search-index.json: SearchIndex
 * - relationships.json: Array<Relationship>
 * - {component-id}.schema.json: ComponentSchema
 * - {component-id}.md: Component markdown
 * - {component-id}.demo.json: DemoCategory[]
 * 
 * Expected JSON file structure for artifacts:
 * - components/{ComponentName}.json
 * - components/{ComponentName}.schema.json
 * - components/{ComponentName}.demo.json
 * - components/{ComponentName}.md (or loaded via loader)
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
import type { SearchOptions } from './DocumentationAdapter';
import { BaseDocumentationAdapter } from './DocumentationAdapter';

export interface JsonAdapterConfig {
  baseUrl?: string;
  libraries?: Library[];
  components?: Component[];
  searchIndex?: SearchIndex;
  relationships?: Relationship[];
  schemaLoader?: (componentId: string) => Promise<ComponentSchema | null>;
  markdownLoader?: (componentId: string) => Promise<string | null>;
  demoLoader?: (componentId: string) => Promise<DemoCategory[] | null>;
}

export class JsonDocumentationAdapter extends BaseDocumentationAdapter {
  private libraries: Map<string, Library> = new Map();
  private components: Map<string, Component> = new Map();
  private componentsBySlug: Map<string, Map<string, Component>> = new Map();
  private searchIndex: SearchIndex | null = null;
  private relationships: Relationship[] = [];
  private baseUrl: string;
  private schemaLoader: (componentId: string) => Promise<ComponentSchema | null>;
  private markdownLoader: (componentId: string) => Promise<string | null>;
  private demoLoader: (componentId: string) => Promise<DemoCategory[] | null>;
  private schemaCache: Map<string, ComponentSchema | null> = new Map();
  private markdownCache: Map<string, string | null> = new Map();
  private demoCache: Map<string, DemoCategory[] | null> = new Map();

  constructor(config: JsonAdapterConfig = {}) {
    super();
    this.baseUrl = config.baseUrl || '';

    // Set up loaders with defaults
    this.schemaLoader = config.schemaLoader || this.defaultSchemaLoader.bind(this);
    this.markdownLoader = config.markdownLoader || this.defaultMarkdownLoader.bind(this);
    this.demoLoader = config.demoLoader || this.defaultDemoLoader.bind(this);

    if (config.libraries) {
      this.loadLibraries(config.libraries);
    }

    if (config.components) {
      this.loadComponents(config.components);
    }

    if (config.searchIndex) {
      this.searchIndex = config.searchIndex;
    }

    if (config.relationships) {
      this.relationships = config.relationships;
    }
  }

  private loadLibraries(libraries: Library[]): void {
    libraries.forEach((lib) => {
      this.libraries.set(lib.id, lib);
    });
  }

  private loadComponents(components: Component[]): void {
    components.forEach((comp) => {
      this.components.set(comp.id, comp);

      // Index by slug for easy lookup
      if (!this.componentsBySlug.has(comp.id)) {
        this.componentsBySlug.set(comp.id, new Map());
      }
      this.componentsBySlug.get(comp.id)?.set(comp.slug, comp);
    });
  }

  // Default loaders for artifacts
  private async defaultSchemaLoader(componentId: string): Promise<ComponentSchema | null> {
    try {
      const [libraryId, slug] = componentId.split(':');
      const url = `${this.baseUrl}/${libraryId}/components/${slug}.schema.json`;
      const response = await fetch(url);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  }

  private async defaultMarkdownLoader(componentId: string): Promise<string | null> {
    try {
      const [libraryId, slug] = componentId.split(':');
      const url = `${this.baseUrl}/${libraryId}/components/${slug}.md`;
      const response = await fetch(url);
      if (!response.ok) return null;
      return await response.text();
    } catch {
      return null;
    }
  }

  private async defaultDemoLoader(componentId: string): Promise<DemoCategory[] | null> {
    try {
      const [libraryId, slug] = componentId.split(':');
      const url = `${this.baseUrl}/${libraryId}/components/${slug}.demo.json`;
      const response = await fetch(url);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  }

  async getLibraries(): Promise<Library[]> {
    return Array.from(this.libraries.values());
  }

  async getLibrary(id: string): Promise<Library | null> {
    return this.libraries.get(id) || null;
  }

  async getComponent(id: string): Promise<Component | null> {
    return this.components.get(id) || null;
  }

  async getComponentBySlug(libraryId: string, slug: string): Promise<Component | null> {
    const libraryComponents = this.componentsBySlug.get(libraryId);
    if (!libraryComponents) {
      return null;
    }
    return libraryComponents.get(slug) || null;
  }

  async search(query: string, options?: SearchOptions): Promise<SearchResult[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const normalizedQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search components
    this.components.forEach((component) => {
      if (options?.libraryId && component.id !== options.libraryId) {
        // Filter by library if specified
        const lib = this.libraries.get(component.id);
        if (!lib || !lib.components.find((c) => c.id === component.id)) {
          return;
        }
      }

      if (options?.type && options.type !== 'component') {
        return;
      }

      let relevance = 0;

      // Exact name match
      if (component.name.toLowerCase() === normalizedQuery) {
        relevance = 100;
      }
      // Name contains query
      else if (component.name.toLowerCase().includes(normalizedQuery)) {
        relevance = 80;
      }
      // Description contains query
      else if (component.description.toLowerCase().includes(normalizedQuery)) {
        relevance = 50;
      }
      // Tags or keywords
      else if (
        component.tags?.some((t) => t.toLowerCase().includes(normalizedQuery)) ||
        component.keywords?.some((k) => k.toLowerCase().includes(normalizedQuery))
      ) {
        relevance = 60;
      }
      // Category matches
      else if (component.category.toLowerCase().includes(normalizedQuery)) {
        relevance = 40;
      }

      if (relevance > 0) {
        results.push({
          id: component.id,
          type: 'component',
          title: component.name,
          description: component.description,
          url: `/components/${component.slug}`,
          relevance,
        });
      }
    });

    // Search libraries
    this.libraries.forEach((library) => {
      if (options?.type && options.type !== 'library') {
        return;
      }

      let relevance = 0;

      if (library.name.toLowerCase() === normalizedQuery) {
        relevance = 100;
      } else if (library.name.toLowerCase().includes(normalizedQuery)) {
        relevance = 80;
      } else if (library.description.toLowerCase().includes(normalizedQuery)) {
        relevance = 50;
      } else if (library.categories?.some((c) => c.toLowerCase().includes(normalizedQuery))) {
        relevance = 60;
      }

      if (relevance > 0) {
        results.push({
          id: library.id,
          type: 'library',
          title: library.name,
          description: library.description,
          libraryId: library.id,
          url: `/libraries/${library.id}`,
          relevance,
        });
      }
    });

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);

    // Apply limit
    const limit = options?.limit || 20;
    return results.slice(0, limit);
  }

  async getTokens(libraryId: string): Promise<DesignToken[]> {
    const library = await this.getLibrary(libraryId);
    return library?.tokens || [];
  }

  async getRelationships(componentId?: string): Promise<Relationship[]> {
    if (componentId) {
      return this.relationships.filter(
        (r) => r.source === componentId || r.target === componentId
      );
    }
    return this.relationships;
  }

  async getSearchIndex(): Promise<SearchIndex | null> {
    return this.searchIndex;
  }

  // New artifact methods
  async getComponentSchema(componentId: string): Promise<ComponentSchema | null> {
    if (this.schemaCache.has(componentId)) {
      return this.schemaCache.get(componentId) || null;
    }

    const schema = await this.schemaLoader(componentId);
    this.schemaCache.set(componentId, schema);
    return schema;
  }

  async getComponentMarkdown(componentId: string): Promise<string | null> {
    if (this.markdownCache.has(componentId)) {
      return this.markdownCache.get(componentId) || null;
    }

    const markdown = await this.markdownLoader(componentId);
    this.markdownCache.set(componentId, markdown);
    return markdown;
  }

  async getComponentDemos(componentId: string): Promise<DemoCategory[] | null> {
    if (this.demoCache.has(componentId)) {
      return this.demoCache.get(componentId) || null;
    }

    const demos = await this.demoLoader(componentId);
    this.demoCache.set(componentId, demos);
    return demos;
  }

  async getMergedDocumentation(componentId: string): Promise<MergedDocumentation | null> {
    const component = await this.getComponent(componentId);
    if (!component) return null;

    const [schema, markdown, demos] = await Promise.all([
      this.getComponentSchema(componentId),
      this.getComponentMarkdown(componentId),
      this.getComponentDemos(componentId),
    ]);

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

  /**
   * Load additional data after initialization
   */
  async loadData(
    url: string,
    type: 'libraries' | 'components' | 'search' | 'relationships'
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}${url}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${type}: ${response.statusText}`);
      }

      const data = await response.json();

      switch (type) {
        case 'libraries':
          this.loadLibraries(data);
          break;
        case 'components':
          this.loadComponents(data);
          break;
        case 'search':
          this.searchIndex = data;
          break;
        case 'relationships':
          this.relationships = data;
          break;
      }
    } catch (error) {
      console.error(`Error loading ${type}:`, error);
      throw error;
    }
  }

  /**
   * Clear all caches (useful when data changes)
   */
  clearCaches(): void {
    this.schemaCache.clear();
    this.markdownCache.clear();
    this.demoCache.clear();
  }
}
