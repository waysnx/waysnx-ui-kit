/**
 * @file index.ts
 * Main entry point for @waysnx/ui-visualization
 */

// Styles
import './styles/index.css';

// Types
export * from './types';

// Constants
export * from './constants';

// Utils
export * from './utils';

// Engines
export * from './engines';

// Hooks
export * from './hooks';

// Components
export { OrgChart } from './components/OrgChart';
export type { OrgChartProps } from './components/OrgChart';

export { Hierarchy } from './components/Hierarchy';
export type { HierarchyProps } from './components/Hierarchy';

export { Tree } from './components/Tree';
export type { TreeProps } from './components/Tree';

export { TreeNode } from './components/TreeNode';
export type { TreeNodeProps } from './components/TreeNode';

export { Connector } from './components/Connector';
export type { ConnectorProps } from './components/Connector';

export { MiniMap } from './components/MiniMap';
export type { MiniMapProps } from './components/MiniMap';

export { Toolbar } from './components/Toolbar';
export type { ToolbarProps, ToolbarAction, ToolbarPosition } from './components/Toolbar';

export { SearchBox } from './components/SearchBox';
export type { SearchBoxProps } from './components/SearchBox';

export { ZoomControls } from './components/ZoomControls';
export type { ZoomControlsProps } from './components/ZoomControls';

export { Legend } from './components/Legend';
export type { LegendProps, LegendItem } from './components/Legend';

// i18n re-export — consumers can use TranslationProvider from here
export {
  TranslationProvider,
  useTranslation,
} from '@waysnx/ui-i18n';
export type { UIVisualizationMessages } from '@waysnx/ui-i18n';
