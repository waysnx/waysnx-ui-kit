import type { TranslationMessages } from '@waysnx/ui-i18n';

/**
 * English translations for ui-accessibility
 * These can be used standalone or merged with other UI kit translations
 */
export const accessibilityEnMessages: TranslationMessages = {
  // Main heading & labels
  'accessibility.title': 'Accessibility Settings',
  'accessibility.settings': 'Settings',
  'accessibility.currentProfile': 'Current Profile',
  'accessibility.profiles': 'Profiles',
  'accessibility.quickActions': 'Quick Actions',
  'accessibility.score': 'Accessibility Score',

  // Buttons
  'accessibility.openSettings': 'Open accessibility settings',
  'accessibility.closeSettings': 'Close accessibility settings',
  'accessibility.toggleSettings': 'Toggle accessibility settings',
  'accessibility.resetAll': 'Reset All',
  'accessibility.applyProfile': 'Apply {profile} profile',

  // Profile names
  'accessibility.profile.lowVision': 'Low Vision',
  'accessibility.profile.dyslexia': 'Dyslexia Friendly',
  'accessibility.profile.adhd': 'ADHD Optimized',
  'accessibility.profile.motorDisabilities': 'Motor Disabilities',
  'accessibility.profile.blind': 'Blind',
  'accessibility.profile.deuteranopia': 'Color Blind (Deuteranopia)',
  'accessibility.profile.protanopia': 'Color Blind (Protanopia)',
  'accessibility.profile.tritanopia': 'Color Blind (Tritanopia)',
  'accessibility.profile.elderly': 'Elderly',
  'accessibility.profile.seizureSafe': 'Seizure Safe',

  // Profile descriptions
  'accessibility.profile.lowVision.description':
    'Larger text, high contrast, enhanced focus indicators',
  'accessibility.profile.dyslexia.description':
    'Specialized font, increased letter/word spacing',
  'accessibility.profile.adhd.description':
    'Reduced motion, enhanced focus indicators, minimal distractions',
  'accessibility.profile.motorDisabilities.description':
    'Simplified controls, larger targets, reduced precision requirements',
  'accessibility.profile.blind.description':
    'Optimized for screen readers, enhanced keyboard navigation',
  'accessibility.profile.deuteranopia.description':
    'Optimized for red-green color blindness',
  'accessibility.profile.protanopia.description':
    'Optimized for red-green color blindness (green-blind)',
  'accessibility.profile.tritanopia.description':
    'Optimized for blue-yellow color blindness',
  'accessibility.profile.elderly.description':
    'Larger text, high contrast, reduced complexity',
  'accessibility.profile.seizureSafe.description':
    'Reduced flashing, animations disabled, static transitions',

  // Setting labels
  'accessibility.setting.textSize': 'Text Size',
  'accessibility.setting.textSpacing': 'Text Spacing',
  'accessibility.setting.font': 'Font',
  'accessibility.setting.contrast': 'Contrast',
  'accessibility.setting.colorFilters': 'Color Filters',
  'accessibility.setting.focusMode': 'Focus Mode',
  'accessibility.setting.readingGuide': 'Reading Guide',
  'accessibility.setting.highlightLinks': 'Highlight Links',
  'accessibility.setting.reducedMotion': 'Reduce Motion',
  'accessibility.setting.screenReaderOptimization': 'Screen Reader Optimization',
  'accessibility.setting.keyboardShortcuts': 'Keyboard Shortcuts',

  // Setting options
  'accessibility.option.normal': 'Normal',
  'accessibility.option.large': 'Large',
  'accessibility.option.xLarge': 'Extra Large',
  'accessibility.option.xxLarge': 'XX Large',
  'accessibility.option.loose': 'Loose',
  'accessibility.option.extraLoose': 'Extra Loose',
  'accessibility.option.default': 'Default',
  'accessibility.option.dyslexiaFriendly': 'Dyslexia Friendly',
  'accessibility.option.high': 'High Contrast',
  'accessibility.option.yellowBlack': 'Yellow-Black',
  'accessibility.option.none': 'None',
  'accessibility.option.grayscale': 'Grayscale',
  'accessibility.option.standard': 'Standard',
  'accessibility.option.highVisibility': 'High Visibility',
  'accessibility.option.boxOutline': 'Box Outline',

  // Aria labels
  'accessibility.aria.openAccessibilitySettings': 'Open accessibility settings',
  'accessibility.aria.closeAccessibilitySettings': 'Close accessibility settings',
  'accessibility.aria.toggleAccessibilitySettings': 'Toggle accessibility settings',
  'accessibility.aria.readingGuide': 'Reading guide overlay',
  'accessibility.aria.magnifier': 'Magnifier tool',
  'accessibility.aria.accessibilityCenter': 'Accessibility control center',

  // Messages
  'accessibility.message.settingUpdated': 'Setting updated',
  'accessibility.message.profileApplied': 'Profile applied successfully',
  'accessibility.message.settingsReset': 'Settings have been reset to defaults',
};
