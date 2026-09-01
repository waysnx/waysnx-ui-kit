/**
 * Core documentation types for the @waysnx/ui-docs library
 * All documentation is represented as structured metadata
 * 
 * Supports WaysNX Documentation Artifacts v1:
 * - component.json
 * - component.schema.json
 * - component.md
 * - component.demo.generated.json
 */

export interface Library {
  id: string;
  name: string;
  description: string;
  version: string;
  displayName?: string;
  repository?: string;
  homepage?: string;
  license?: string;
  categories: string[];
  components: Component[];
  metadata?: Record<string, unknown>;
  tokens?: DesignToken[];
}

export interface Component {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon?: string;
  isDeprecated?: boolean;
  deprecationMessage?: string;
  installation?: {
    package: string;
    command: string;
  };
  imports?: ImportExample[];
  props?: ComponentProp[];
  examples?: CodeExample[];
  markdown?: string;
  relatedComponents?: string[];
  accessibility?: AccessibilityInfo;
  metadata?: Record<string, unknown>;
  tags?: string[];
  keywords?: string[];
  
  // New artifact support v1
  status?: 'stable' | 'beta' | 'experimental' | 'deprecated';
  version?: string;
  displayName?: string;
  library?: string;
  
  // Schema support
  schema?: ComponentSchema;
  
  // Demo support
  demos?: DemoCategory[];
  
  // Business/enterprise context
  businessDomains?: string[];
  enterpriseModules?: string[];
  useCases?: UseCase[];
  
  // Additional metadata
  cssClasses?: string[];
  designTokens?: Record<string, Record<string, unknown>>;
  wcagLevel?: 'A' | 'AA' | 'AAA';
  ariaRoles?: string[];
  screenReaderSupport?: boolean;
  keyboardSupport?: boolean | string[];
  focusManagement?: boolean;
  
  // Source tracking
  sourceFile?: string;
  sourceHash?: string;
  generatedAt?: string;
  generatorVersion?: string;
}

export interface ComponentProp {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: unknown;
  enum?: Array<string | number | boolean>;
  deprecated?: boolean;
}

export interface ImportExample {
  title?: string;
  description?: string;
  code: string;
  language?: string;
}

export interface CodeExample {
  title: string;
  description?: string;
  code: string;
  language?: string;
  preview?: boolean;
}

export interface AccessibilityInfo {
  wcagLevel?: 'A' | 'AA' | 'AAA';
  ariaRoles?: string[];
  keyboardSupport?: string[];
  screenReaderSupport?: boolean;
  notes?: string[];
}

export interface DesignToken {
  id: string;
  name: string;
  category: string;
  value: string;
  description?: string;
  deprecated?: boolean;
}

export interface SearchIndex {
  version: string;
  lastUpdated: string;
  entries: SearchEntry[];
}

export interface SearchEntry {
  id: string;
  type: 'component' | 'library' | 'token' | 'page';
  title: string;
  description?: string;
  keywords?: string[];
  category?: string;
  libraryId?: string;
  content?: string;
}

export interface SearchResult {
  id: string;
  type: SearchEntry['type'];
  title: string;
  description?: string;
  libraryId?: string;
  url: string;
  relevance: number;
}

export interface Relationship {
  source: string;
  target: string;
  type: 'dependsOn' | 'relatedTo' | 'extends' | 'implements';
  description?: string;
}

export interface DocumentationMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  lastUpdated?: string;
  version?: string;
}

// ============================================================================
// New Artifact Support - v1
// ============================================================================

/**
 * Component Schema (component.schema.json)
 * Describes the structure and types of component props
 */
export interface ComponentSchema {
  $schema?: string;
  type?: string;
  title?: string;
  description?: string;
  properties?: Record<string, SchemaProperty>;
  required?: string[];
  additionalProperties?: boolean;
  examples?: Record<string, unknown>[];
}

export interface SchemaProperty {
  type?: string | string[];
  title?: string;
  description?: string;
  default?: unknown;
  enum?: unknown[];
  const?: unknown;
  items?: SchemaProperty;
  properties?: Record<string, SchemaProperty>;
  required?: string[];
  $ref?: string;
  oneOf?: SchemaProperty[];
  anyOf?: SchemaProperty[];
  allOf?: SchemaProperty[];
}

/**
 * Demo Categories and Examples (component.demo.generated.json)
 * Categorized, generated examples with metadata
 */
export interface DemoCategory {
  id: string;
  name: string;
  description?: string;
  order?: number;
  examples: DemoExample[];
}

export interface DemoExample {
  id: string;
  name: string;
  title?: string;
  description?: string;
  category?: string;
  code?: string;
  language?: string;
  preview?: boolean;
  
  // Props to render with the component
  props?: Record<string, unknown>;
  
  // Metadata about the example
  source?: 'generated' | 'storybook' | 'metadata' | 'override';
  confidence?: number; // 0-100, how confident is the generation
  keywords?: string[];
  
  // Related information
  relatedExamples?: string[];
}

/**
 * Use Case Descriptor
 */
export interface UseCase {
  id?: string;
  title: string;
  description: string;
  businessDomain?: string;
  enterpriseModule?: string;
  examplePrompt?: string;
  reasoning?: string;
}

/**
 * Complete Merged Documentation Model
 * Combines all artifacts into a single comprehensive object
 */
export interface MergedDocumentation {
  component: Component;
  schema?: ComponentSchema;
  markdown?: string;
  demos?: DemoCategory[];
  relationships?: Relationship[];
  
  // Metadata about what was loaded
  loadedArtifacts: {
    component: boolean;
    schema: boolean;
    markdown: boolean;
    demos: boolean;
  };
  
  // Search index data
  searchIndex?: SearchIndex;
}

/**
 * Component Registry for dynamic rendering
 * Allows registration and resolution of components by package and export name
 */
export interface ComponentRegistration {
  packageName: string;
  exportName: string;
  component: React.ComponentType<any>;
  metadata?: Record<string, unknown>;
}

export interface ComponentRegistryOptions {
  fallbackComponent?: React.ComponentType<{ 
    componentName: string; 
    packageName: string; 
    exportName: string;
  }>;
  onMissing?: (packageName: string, exportName: string) => void;
}

/**
 * Live Renderer Props
 * For rendering components with props dynamically
 */
export interface LiveComponentRendererProps {
  packageName: string;
  exportName: string;
  props?: Record<string, unknown>;
  fallback?: React.ReactNode;
  errorBoundary?: boolean;
}

/**
 * Demo Viewer Props
 * For rendering demo categories and examples
 */
export interface DocumentationDemoViewerProps {
  demos?: DemoCategory[];
  selectedExample?: string;
  onExampleSelect?: (exampleId: string) => void;
  renderLiveComponent?: boolean;
  categoryTabs?: boolean;
  showMetadata?: boolean;
}
