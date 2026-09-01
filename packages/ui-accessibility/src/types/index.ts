/**
 * Accessibility Settings Type
 * Defines all customizable accessibility features
 */
export interface AccessibilitySettings {
  // Text & Display
  textSize: 'normal' | 'large' | 'x-large' | 'xx-large';
  textSpacing: 'normal' | 'loose' | 'extra-loose';
  font: 'default' | 'dyslexia-friendly';

  // Color & Contrast
  contrast: 'normal' | 'high' | 'yellow-black';
  colorFilters: 'none' | 'grayscale' | 'deuteranopia' | 'protanopia' | 'tritanopia';

  // Focus & Navigation
  focusMode: 'standard' | 'high-visibility' | 'box-outline';
  readingGuide: boolean;
  highlightLinks: boolean;

  // Motion
  reducedMotion: boolean;

  // Magnifier
  magnifier: boolean;

  // Screen Reader
  screenReaderOptimization: boolean;

  // Keyboard
  keyboardShortcuts: boolean;
}

/**
 * Accessibility Profile - Pre-configured settings
 */
export interface AccessibilityProfile {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  settings: AccessibilitySettings;
  category?: 'preset' | 'custom' | 'saved';
}

/**
 * Analytics Event - Emitted when settings change
 */
export interface AccessibilityEvent {
  eventType: 'profile_changed' | 'setting_changed' | 'feature_enabled' | 'feature_disabled';
  timestamp: number;
  profile?: string;
  setting?: keyof AccessibilitySettings;
  previousValue?: unknown;
  newValue?: unknown;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Analytics Handler Function
 */
export type AccessibilityAnalyticsHandler = (event: AccessibilityEvent) => void;

/**
 * Accessibility Provider Props
 */
export interface AccessibilityProviderProps {
  children: React.ReactNode;
  defaultSettings?: Partial<AccessibilitySettings>;
  storageKey?: string;
  onSettingsChange?: (settings: AccessibilitySettings) => void;
  onEvent?: AccessibilityAnalyticsHandler;
  customProfiles?: AccessibilityProfile[];
  persistSettings?: boolean;
}

/**
 * Accessibility Center Props
 */
export interface AccessibilityCenterProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  variant?: 'floating-button' | 'drawer' | 'modal' | 'panel';
  showProfile?: boolean;
  showAccessibilityScore?: boolean;
  showQuickActions?: boolean;
  showSettings?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSettingsChange?: (settings: AccessibilitySettings) => void;
  onProfileChange?: (profile: AccessibilityProfile) => void;
  customProfiles?: AccessibilityProfile[];
}

/**
 * Floating Button Props
 */
export interface FloatingButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

/**
 * Context Value Type
 */
export interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  currentProfile: AccessibilityProfile | null;
  profiles: AccessibilityProfile[];
  updateSetting: (key: keyof AccessibilitySettings, value: AccessibilitySettings[keyof AccessibilitySettings]) => void;
  updateSettings: (updates: Partial<AccessibilitySettings>) => void;
  applyProfile: (profile: AccessibilityProfile) => void;
  resetToDefaults: () => void;
  getCSSVariable: (setting: keyof AccessibilitySettings) => string;
  isEnabled: (feature: keyof AccessibilitySettings) => boolean;
  emitEvent: (event: Omit<AccessibilityEvent, 'timestamp'>) => void;
}
