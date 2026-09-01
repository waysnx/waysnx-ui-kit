/**
 * @file constants/index.ts
 * Constants for navigation components
 */

/**
 * Navigation component sizes
 */
export const SIZES = {
  COMPACT: 'compact',
  NORMAL: 'normal',
  SPACIOUS: 'spacious',
} as const;

/**
 * Navigation themes
 */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

/**
 * Navigation positions
 */
export const POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

/**
 * Notification types
 */
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

/**
 * Keyboard shortcuts
 */
export const SHORTCUTS = {
  OPEN_COMMAND_PALETTE: 'ctrl+k',
  OPEN_SEARCH: 'ctrl+/',
  OPEN_HELP: '?',
  CLOSE: 'escape',
  NEXT_ITEM: 'ArrowDown',
  PREV_ITEM: 'ArrowUp',
  SELECT_ITEM: 'Enter',
  TOGGLE_SIDEBAR: 'ctrl+b',
} as const;

/**
 * Storage keys for persistence
 */
export const STORAGE_KEYS = {
  FAVORITES: 'waysnx:navigation:favorites',
  RECENT_ITEMS: 'waysnx:navigation:recent',
  ACTIVE_WORKSPACE: 'waysnx:navigation:active-workspace',
  SIDEBAR_STATE: 'waysnx:navigation:sidebar-state',
  THEME: 'waysnx:navigation:theme',
  COMMANDS: 'waysnx:navigation:commands',
} as const;

/**
 * Default configuration values
 */
export const DEFAULTS = {
  MAX_RECENT_ITEMS: 10,
  MAX_FAVORITES: 50,
  DRAWER_ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  SEARCH_DEBOUNCE: 200,
  MAX_BREADCRUMB_ITEMS: 5,
} as const;

/**
 * CSS custom property names
 */
export const CSS_VARS = {
  PRIMARY_COLOR: '--wx-color-primary',
  SECONDARY_COLOR: '--wx-color-text-muted',
  TEXT_COLOR: '--wx-color-text',
  BACKGROUND_COLOR: '--wx-color-surface',
  BORDER_COLOR: '--wx-color-border',
  HOVER_COLOR: '--wx-color-surface-hover',
  ACTIVE_COLOR: '--wx-color-primary-light',
  DISABLED_COLOR: '--wx-color-text-light',
  SHADOW: '--wx-shadow-sm',
  BORDER_RADIUS: '--wx-radius-sm',
  TRANSITION_DURATION: '--wx-nav-transition',
  SIDEBAR_WIDTH: '--wx-nav-sidebar-width',
  DRAWER_WIDTH: '--wx-nav-drawer-width',
} as const;

/**
 * ARIA roles
 */
export const ARIA_ROLES = {
  NAVIGATION: 'navigation',
  MENU: 'menu',
  MENUITEM: 'menuitem',
  MENUITEMRADIO: 'menuitemradio',
  MENUITEMCHECKBOX: 'menuitemcheckbox',
  TABLIST: 'tablist',
  TAB: 'tab',
  TABPANEL: 'tabpanel',
  BUTTON: 'button',
  LINK: 'link',
  PRESENTATION: 'presentation',
  NONE: 'none',
} as const;

/**
 * Local storage namespace
 */
export const LOCAL_STORAGE_NAMESPACE = 'waysnx:navigation';

/**
 * Animation timing functions
 */
export const ANIMATIONS = {
  EASE_OUT: 'ease-out',
  EASE_IN: 'ease-in',
  EASE_IN_OUT: 'ease-in-out',
  LINEAR: 'linear',
} as const;
