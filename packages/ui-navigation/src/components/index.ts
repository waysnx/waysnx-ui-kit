/**
 * @file components/index.ts
 * Barrel export for all navigation components
 */

export { Menu } from './Menu';
export type { MenuProps } from './Menu';

// MenuItem component - named differently to avoid conflict with MenuItem type from types/index.ts
export { MenuItem as MenuItemComponent } from './Menu/MenuItem';
export type { MenuItemProps } from './Menu/MenuItem';

export { Sidebar } from './Sidebar';
export type { SidebarProps } from './Sidebar';

export { Navbar } from './Navbar';
export type { NavbarProps } from './Navbar';

export { Header } from './Header';
export type { HeaderProps } from './Header';

export { Breadcrumb } from './Breadcrumb';
export type { BreadcrumbProps } from './Breadcrumb';

export { ContextMenu } from './ContextMenu';
export type { ContextMenuProps, ContextMenuPosition } from './ContextMenu';

export { MegaMenu } from './MegaMenu';
export type { MegaMenuProps, MegaMenuSection } from './MegaMenu';

export { TreeMenu } from './TreeMenu';
export type { TreeMenuProps } from './TreeMenu';

export { Tabs } from './Tabs';
export type { TabsProps, TabConfig } from './Tabs';

export { Drawer } from './Drawer';
export type { DrawerProps } from './Drawer';

export { CommandPalette } from './CommandPalette';
export type { CommandPaletteProps, Command } from './CommandPalette';

export { SearchNavigation } from './SearchNavigation';
export type { SearchNavigationProps, SearchResult, SearchCategory } from './SearchNavigation';

export { UserMenu } from './UserMenu';
export type { UserMenuProps, UserInfo, UserMenuItem } from './UserMenu';

export { NotificationCenter } from './NotificationCenter';
export type { NotificationCenterProps, Notification } from './NotificationCenter';

export { WorkspaceSwitcher } from './WorkspaceSwitcher';
export type { WorkspaceSwitcherProps } from './WorkspaceSwitcher';

export { QuickActions } from './QuickActions';
export type { QuickActionsProps } from './QuickActions';

export { StepNavigation } from './StepNavigation';
export type { StepNavigationProps } from './StepNavigation';

export { FavoritesMenu } from './FavoritesMenu';
export type { FavoritesMenuProps } from './FavoritesMenu';

export { RecentItems } from './RecentItems';
export type { RecentItemsProps } from './RecentItems';
