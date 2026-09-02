/**
 * Placeholder ("Coming Soon") components — PLANNED, NOT PRODUCTION-READY.
 *
 * These are scaffolded interfaces and stub implementations that demonstrate
 * future extension points. Each renders a visible "Coming Soon" badge via
 * PlaceholderWrapper and is intentionally non-functional in 1.0.0.
 *
 * These MUST be excluded from production-ready component counts. Documentation
 * and WDG count logic should treat every name in {@link COMING_SOON_COMPONENTS}
 * as planned/experimental rather than shipped.
 */

/**
 * Canonical list of the six planned "Coming Soon" components. Consumed by
 * documentation/count tooling to exclude planned components from
 * production-ready totals.
 */
export const COMING_SOON_COMPONENTS = [
  'DependencyGraph',
  'Playground',
  'TokenViewer',
  'ThemeExplorer',
  'AISection',
  'WorkflowViewer',
] as const;

export type ComingSoonComponentName = (typeof COMING_SOON_COMPONENTS)[number];

export { DependencyGraphPlaceholder } from './DependencyGraphPlaceholder';
export { PlaygroundPlaceholder } from './PlaygroundPlaceholder';
export { TokenViewerPlaceholder } from './TokenViewerPlaceholder';
export { ThemeExplorerPlaceholder } from './ThemeExplorerPlaceholder';
export { AISectionPlaceholder } from './AISectionPlaceholder';
export { WorkflowViewerPlaceholder } from './WorkflowViewerPlaceholder';

export type { DependencyGraphProps } from './DependencyGraphPlaceholder';
export type { PlaygroundProps } from './PlaygroundPlaceholder';
export type { TokenViewerProps } from './TokenViewerPlaceholder';
export type { ThemeExplorerProps } from './ThemeExplorerPlaceholder';
export type { AISectionProps } from './AISectionPlaceholder';
export type { WorkflowViewerProps } from './WorkflowViewerPlaceholder';
