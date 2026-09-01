/**
 * @file types/index.ts
 * Core types for navigation components and services
 */

/**
 * Navigation item representing a menu entry or link
 */
export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  hidden?: boolean;
  isDivider?: boolean;
  permissions?: string[];
  roles?: string[];
  children?: NavigationItem[];
  onClick?: (item: NavigationItem) => void;
  metadata?: Record<string, any>;
}

/**
 * Extended menu item with additional properties
 */
export interface MenuItem extends NavigationItem {
  variant?: 'default' | 'danger' | 'success';
  shortcut?: string;
  description?: string;
  permissions?: string[];
  roles?: string[];
  feature?: string;
}

/**
 * Sidebar item with layout properties
 */
export interface SidebarItem extends NavigationItem {
  expanded?: boolean;
  level?: number;
  collapsible?: boolean;
}

/**
 * Breadcrumb navigation item
 */
export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

/**
 * Tab item for tab navigation
 */
export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  content?: React.ReactNode;
  closable?: boolean;
}

/**
 * Drawer state configuration
 */
export interface DrawerState {
  isOpen: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  width?: string | number;
  height?: string | number;
  overlay?: boolean;
  onClose?: () => void;
}

/**
 * Command palette command item
 */
export interface CommandItem {
  id: string;
  title: string;
  description?: string;
  shortcut?: string;
  category?: string;
  icon?: React.ReactNode;
  action: () => void | Promise<void>;
  metadata?: Record<string, any>;
}

/**
 * Workspace configuration
 */
export interface Workspace {
  id: string;
  name: string;
  icon?: React.ReactNode;
  description?: string;
  active?: boolean;
  metadata?: Record<string, any>;
}

/**
 * Notification item for notification center
 */
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
  timestamp?: Date;
  read?: boolean;
  actions?: Array<{
    label: string;
    onClick: () => void;
  }>;
}

/**
 * Favorite item for favorites menu
 */
export interface FavoriteItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  category?: string;
  timestamp?: Date;
}

/**
 * Recent item for recent items menu
 */
export interface RecentItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  type?: string;
  timestamp?: Date;
  preview?: string;
}

/**
 * Quick action item
 */
export interface QuickAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void | Promise<void>;
  shortcut?: string;
  tooltip?: string;
  disabled?: boolean;
  requiredPermissions?: string[];
  badge?: string | number;
  metadata?: Record<string, any>;
}

/**
 * Step item for step navigation/wizard
 */
export interface StepItem {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
  optional?: boolean;
}

/**
 * Quick action group for organizing actions
 */
export interface QuickActionGroup {
  id: string;
  label?: string;
  actions: (QuickAction | QuickActionGroup)[];
}

/**
 * Navigation context type
 */
export interface NavigationContextType {
  items: NavigationItem[];
  setItems: (items: NavigationItem[]) => void;
  activeItem?: NavigationItem;
  setActiveItem: (item?: NavigationItem) => void;
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  recent: RecentItem[];
  addRecent: (item: RecentItem) => void;
  workspaces: Workspace[];
  activeWorkspace?: Workspace;
  setActiveWorkspace: (workspace?: Workspace) => void;
  theme?: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

/**
 * Router adapter for different routing libraries
 */
export interface RouterAdapter {
  isActive: (href: string) => boolean;
  navigate: (href: string) => void | Promise<void>;
  resolveHref: (href: string) => string;
}

/**
 * Navigation configuration
 */
export interface NavigationConfig {
  enableBreadcrumbs?: boolean;
  enableFavorites?: boolean;
  enableRecent?: boolean;
  enableSearch?: boolean;
  maxRecentItems?: number;
  persistState?: boolean;
  routerAdapter?: RouterAdapter;
  theme?: 'light' | 'dark';
  density?: 'compact' | 'normal' | 'spacious';
}

/**
 * Security context type (placeholder for ui-security integration)
 */
export interface SecurityContext {
  permissions?: string[];
  roles?: string[];
  features?: string[];
  canAccess?: (item: NavigationItem | MenuItem) => boolean;
}
