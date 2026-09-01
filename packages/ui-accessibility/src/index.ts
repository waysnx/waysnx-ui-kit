/**
 * @waysnx/ui-accessibility
 * Enterprise-grade accessibility control center for WaysNX UI Kit
 *
 * @example
 * ```tsx
 * import { AccessibilityProvider, AccessibilityCenter } from '@waysnx/ui-accessibility';
 * import '@waysnx/ui-accessibility/dist/index.css';
 *
 * function App() {
 *   return (
 *     <AccessibilityProvider>
 *       <SkipLinks />
 *       <YourApp />
 *       <AccessibilityCenter position="bottom-right" variant="floating-button" />
 *     </AccessibilityProvider>
 *   );
 * }
 * ```
 */

// Types
export type {
  AccessibilitySettings,
  AccessibilityProfile,
  AccessibilityEvent,
  AccessibilityAnalyticsHandler,
  AccessibilityProviderProps,
  AccessibilityCenterProps,
  FloatingButtonProps,
  AccessibilityContextValue,
} from './types';

// Context
export { AccessibilityProvider } from './context/AccessibilityProvider';
export { AccessibilityContext } from './context/AccessibilityContext';

// Components
export { AccessibilityCenter } from './components/AccessibilityCenter/AccessibilityCenter';
export { FloatingButton } from './components/FloatingButton/FloatingButton';
export { ReadingGuide } from './components/ReadingGuide/ReadingGuide';
export { Magnifier } from './components/Magnifier/Magnifier';
export { SkipLinks } from './components/SkipLinks/SkipLinks';
export type { SkipLinksProps, SkipLink } from './components/SkipLinks/SkipLinks';

// Hooks — core
export { useAccessibility } from './hooks/useAccessibility';
export { useAccessibilityChange } from './hooks/useAccessibilityChange';
export { useAccessibilityAnalytics, formatAccessibilityEvent } from './hooks/useAccessibilityAnalytics';

// Hooks — granular
export { useAccessibilityProfile } from './hooks/useAccessibilityProfile';
export type { UseAccessibilityProfileReturn } from './hooks/useAccessibilityProfile';
export { useContrast } from './hooks/useContrast';
export type { UseContrastReturn, ContrastMode } from './hooks/useContrast';
export { useFontScale } from './hooks/useFontScale';
export type { UseFontScaleReturn, TextSize } from './hooks/useFontScale';
export { useFocus } from './hooks/useFocus';
export type { UseFocusReturn, FocusMode } from './hooks/useFocus';
export { useMotion } from './hooks/useMotion';
export type { UseMotionReturn } from './hooks/useMotion';
export { useSpeech } from './hooks/useSpeech';
export type { UseSpeechReturn, SpeechOptions } from './hooks/useSpeech';

// Utils & Constants
export {
  DEFAULT_SETTINGS,
  PRESET_PROFILES,
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
  CSS_VARIABLE_MAP,
  TEXT_SIZE_MULTIPLIERS,
  STORAGE_KEYS,
  FOCUS_MODE_STYLES,
} from './utils/constants';

export { loadSettings, saveSettings, clearSettings, getOrCreateSessionId } from './utils/storage';
export { updateCSSVariables, clearCSSVariables, getCSSVariableValue, isAccessibilityEnabled } from './utils/cssVariables';

// Services
export { keyboardManager } from './services/KeyboardManager';
export type { KeyboardShortcut } from './services/KeyboardManager';
export { focusManager } from './services/FocusManager';
export { announcementService } from './services/AnnouncementService';

// i18n re-export
export { TranslationProvider, useTranslation } from '@waysnx/ui-i18n';
export type { UIAccessibilityMessages } from '@waysnx/ui-i18n';

// Locale packs — use with TranslationProvider
export {
  accessibilityEnMessages,
  accessibilityEsMessages,
  accessibilityFrMessages,
  accessibilityArMessages,
  accessibilityHiMessages,
  accessibilityMrMessages,
  accessibilityPtMessages,
} from './locales';

// Styles
import './styles/index.css';
