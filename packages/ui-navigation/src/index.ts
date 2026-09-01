/**
 * @file index.ts
 * Main barrel export for @waysnx/ui-navigation
 */

// Styles
import './styles/index.css';

// Types
export * from './types';

// Constants
export * from './constants';

// Utils
export * from './utils';

// Providers
export { NavigationProvider } from './providers';
export type { NavigationContextType } from './providers';

// Components
export * from './components';

// Hooks
export {
  useNavigation,
  useSidebar,
  useMenu,
  useTabs,
  useDrawer,
  useBreadcrumb,
  useWorkspace,
  useCommandPalette,
} from './hooks';

// Services
// export * from './services'; // To be implemented in Phase 6
