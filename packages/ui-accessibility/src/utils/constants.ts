import { AccessibilitySettings, AccessibilityProfile } from '../types';

/**
 * Default Accessibility Settings
 */
export const DEFAULT_SETTINGS: AccessibilitySettings = {
  textSize: 'normal',
  textSpacing: 'normal',
  font: 'default',
  contrast: 'normal',
  colorFilters: 'none',
  focusMode: 'standard',
  readingGuide: false,
  highlightLinks: false,
  reducedMotion: false,
  magnifier: false,
  screenReaderOptimization: false,
  keyboardShortcuts: true,
};

/**
 * Profile: Low Vision
 * For users who have low vision and need larger text, high contrast
 */
export const PROFILE_LOW_VISION: AccessibilityProfile = {
  id: 'low-vision',
  name: 'Low Vision',
  description: 'Larger text, high contrast, enhanced focus indicators',
  settings: {
    textSize: 'x-large',
    textSpacing: 'loose',
    font: 'default',
    contrast: 'high',
    colorFilters: 'none',
    focusMode: 'high-visibility',
    readingGuide: true,
    highlightLinks: true,
    reducedMotion: false,
    magnifier: true,
    screenReaderOptimization: false,
    keyboardShortcuts: true,
  },
  category: 'preset',
};

/**
 * Profile: Dyslexia
 * For users with dyslexia who need specialized font and spacing
 */
export const PROFILE_DYSLEXIA: AccessibilityProfile = {
  id: 'dyslexia',
  name: 'Dyslexia Friendly',
  description: 'Specialized font, increased letter/word spacing',
  settings: {
    textSize: 'large',
    textSpacing: 'extra-loose',
    font: 'dyslexia-friendly',
    contrast: 'high',
    colorFilters: 'none',
    focusMode: 'standard',
    readingGuide: true,
    highlightLinks: true,
    reducedMotion: true,
    magnifier: false,
    screenReaderOptimization: false,
    keyboardShortcuts: true,
  },
  category: 'preset',
};

/**
 * Profile: ADHD
 * For users with ADHD who need reduced distractions and clear focus
 */
export const PROFILE_ADHD: AccessibilityProfile = {
  id: 'adhd',
  name: 'ADHD Optimized',
  description: 'Reduced motion, enhanced focus indicators, minimal distractions',
  settings: {
    textSize: 'normal',
    textSpacing: 'normal',
    font: 'default',
    contrast: 'high',
    colorFilters: 'none',
    focusMode: 'high-visibility',
    readingGuide: false,
    highlightLinks: true,
    reducedMotion: true,
    magnifier: false,
    screenReaderOptimization: false,
    keyboardShortcuts: true,
  },
  category: 'preset',
};

/**
 * Profile: Motor Disabilities
 * For users with motor control challenges who need larger targets and simplified interactions
 */
export const PROFILE_MOTOR_DISABILITIES: AccessibilityProfile = {
  id: 'motor-disabilities',
  name: 'Motor Disabilities',
  description: 'Simplified controls, larger targets, reduced precision requirements',
  settings: {
    textSize: 'large',
    textSpacing: 'loose',
    font: 'default',
    contrast: 'high',
    colorFilters: 'none',
    focusMode: 'high-visibility',
    readingGuide: false,
    highlightLinks: true,
    reducedMotion: true,
    magnifier: false,
    screenReaderOptimization: true,
    keyboardShortcuts: true,
  },
  category: 'preset',
};

/**
 * Profile: Blind (Screen Reader Optimized)
 * For blind users who rely on screen readers
 */
export const PROFILE_BLIND: AccessibilityProfile = {
  id: 'blind',
  name: 'Blind',
  description: 'Optimized for screen readers, enhanced keyboard navigation',
  settings: {
    textSize: 'normal',
    textSpacing: 'normal',
    font: 'default',
    contrast: 'normal',
    colorFilters: 'none',
    focusMode: 'standard',
    readingGuide: false,
    highlightLinks: true,
    reducedMotion: true,
    magnifier: false,
    screenReaderOptimization: true,
    keyboardShortcuts: true,
  },
  category: 'preset',
};

/**
 * Profile: Color Blind - Deuteranopia (Red-Blind)
 * For users with red-green color blindness (red-blind variant)
 */
export const PROFILE_DEUTERANOPIA: AccessibilityProfile = {
  id: 'deuteranopia',
  name: 'Color Blind (Deuteranopia)',
  description: 'Optimized for red-green color blindness',
  settings: {
    textSize: 'normal',
    textSpacing: 'normal',
    font: 'default',
    contrast: 'high',
    colorFilters: 'deuteranopia',
    focusMode: 'standard',
    readingGuide: false,
    highlightLinks: true,
    reducedMotion: false,
    magnifier: false,
    screenReaderOptimization: false,
    keyboardShortcuts: true,
  },
  category: 'preset',
};

/**
 * Profile: Color Blind - Protanopia (Green-Blind)
 * For users with red-green color blindness (green-blind variant)
 */
export const PROFILE_PROTANOPIA: AccessibilityProfile = {
  id: 'protanopia',
  name: 'Color Blind (Protanopia)',
  description: 'Optimized for red-green color blindness (green-blind)',
  settings: {
    textSize: 'normal',
    textSpacing: 'normal',
    font: 'default',
    contrast: 'high',
    colorFilters: 'protanopia',
    focusMode: 'standard',
    readingGuide: false,
    highlightLinks: true,
    reducedMotion: false,
    magnifier: false,
    screenReaderOptimization: false,
    keyboardShortcuts: true,
  },
  category: 'preset',
};

/**
 * Profile: Color Blind - Tritanopia (Blue-Yellow Blind)
 * For users with blue-yellow color blindness
 */
export const PROFILE_TRITANOPIA: AccessibilityProfile = {
  id: 'tritanopia',
  name: 'Color Blind (Tritanopia)',
  description: 'Optimized for blue-yellow color blindness',
  settings: {
    textSize: 'normal',
    textSpacing: 'normal',
    font: 'default',
    contrast: 'high',
    colorFilters: 'tritanopia',
    focusMode: 'standard',
    readingGuide: false,
    highlightLinks: true,
    reducedMotion: false,
    magnifier: false,
    screenReaderOptimization: false,
    keyboardShortcuts: true,
  },
  category: 'preset',
};

/**
 * Profile: Elderly
 * For elderly users who need larger text, higher contrast, and simplified interactions
 */
export const PROFILE_ELDERLY: AccessibilityProfile = {
  id: 'elderly',
  name: 'Elderly',
  description: 'Larger text, high contrast, reduced complexity',
  settings: {
    textSize: 'x-large',
    textSpacing: 'loose',
    font: 'default',
    contrast: 'high',
    colorFilters: 'none',
    focusMode: 'high-visibility',
    readingGuide: true,
    highlightLinks: true,
    reducedMotion: true,
    magnifier: false,
    screenReaderOptimization: false,
    keyboardShortcuts: true,
  },
  category: 'preset',
};

/**
 * Profile: Seizure Safe
 * For users with photosensitive epilepsy who need reduced flashing and animations
 */
export const PROFILE_SEIZURE_SAFE: AccessibilityProfile = {
  id: 'seizure-safe',
  name: 'Seizure Safe',
  description: 'Reduced flashing, animations disabled, static transitions',
  settings: {
    textSize: 'normal',
    textSpacing: 'normal',
    font: 'default',
    contrast: 'normal',
    colorFilters: 'none',
    focusMode: 'box-outline',
    readingGuide: false,
    highlightLinks: false,
    reducedMotion: true,
    magnifier: false,
    screenReaderOptimization: false,
    keyboardShortcuts: true,
  },
  category: 'preset',
};

/**
 * All Preset Profiles (Phase 1 + Phase 2)
 */
export const PRESET_PROFILES: AccessibilityProfile[] = [
  PROFILE_LOW_VISION,
  PROFILE_DYSLEXIA,
  PROFILE_ADHD,
  PROFILE_MOTOR_DISABILITIES,
  PROFILE_BLIND,
  PROFILE_DEUTERANOPIA,
  PROFILE_PROTANOPIA,
  PROFILE_TRITANOPIA,
  PROFILE_ELDERLY,
  PROFILE_SEIZURE_SAFE,
];

/**
 * CSS Variable Mappings
 * Maps accessibility settings to CSS custom properties
 */
export const CSS_VARIABLE_MAP: Record<keyof AccessibilitySettings, string> = {
  textSize: '--wx-accessibility-text-size',
  textSpacing: '--wx-accessibility-text-spacing',
  font: '--wx-accessibility-font',
  contrast: '--wx-accessibility-contrast',
  colorFilters: '--wx-accessibility-color-filters',
  focusMode: '--wx-accessibility-focus-mode',
  readingGuide: '--wx-accessibility-reading-guide',
  highlightLinks: '--wx-accessibility-highlight-links',
  reducedMotion: '--wx-accessibility-reduced-motion',
  magnifier: '--wx-accessibility-magnifier',
  screenReaderOptimization: '--wx-accessibility-screen-reader',
  keyboardShortcuts: '--wx-accessibility-keyboard-shortcuts',
};

/**
 * Text Size Multipliers for CSS
 */
export const TEXT_SIZE_MULTIPLIERS: Record<string, number> = {
  normal: 1,
  large: 1.2,
  'x-large': 1.5,
  'xx-large': 2,
};

/**
 * Storage Keys
 */
export const STORAGE_KEYS = {
  SETTINGS: 'waysnx-accessibility-settings',
  PROFILE: 'waysnx-accessibility-profile',
  SESSION_ID: 'waysnx-accessibility-session-id',
} as const;

/**
 * Focus Mode Styles
 */
export const FOCUS_MODE_STYLES = {
  standard: {
    outline: '2px solid var(--wx-shadow-focus)',
    outlineOffset: '2px',
  },
  'high-visibility': {
    outline: '4px solid var(--wx-color-primary)',
    outlineOffset: '3px',
  },
  'box-outline': {
    border: '3px solid var(--wx-color-primary)',
    boxShadow: '0 0 0 3px rgba(241, 153, 36, 0.3)',
  },
} as const;
