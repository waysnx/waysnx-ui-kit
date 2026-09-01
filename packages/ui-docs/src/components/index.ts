/**
 * Public component exports
 */

// Core rendering components
export { MarkdownRenderer } from './MarkdownRenderer';
export type { MarkdownRendererProps } from './MarkdownRenderer';

export { PropsTable } from './PropsTable';
export type { PropsTableProps } from './PropsTable';

export { ComponentHero } from './ComponentHero';
export type { ComponentHeroProps } from './ComponentHero';

// New live rendering components
export { LiveComponentRenderer } from './LiveComponentRenderer';
export type { LiveComponentRendererProps } from '../types';

export { DocumentationDemoViewer } from './DocumentationDemoViewer';
export type { DocumentationDemoViewerProps } from '../types';

// Placeholder components (for future implementation)
export * from './placeholders';
