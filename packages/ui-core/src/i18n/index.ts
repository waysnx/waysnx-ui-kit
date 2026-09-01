/**
 * Re-exports from @waysnx/ui-i18n for backward compatibility.
 * The i18n system lives in the @waysnx/ui-i18n package.
 * ui-core re-exports it so consumers can import from either package.
 */
export {
  TranslationProvider,
  useTranslation,
  withTranslation,
  defaultMessages,
  esMessages,
  frMessages,
  arMessages,
} from '@waysnx/ui-i18n';

export type {
  TranslationProviderProps,
  UICoreMessages,
  UIFormBuilderMessages,
  UIGridBuilderMessages,
  UILayoutMessages,
  UIFeedbackMessages,
  AllMessages,
  TranslationMessages,
  TranslationConfig,
} from '@waysnx/ui-i18n';
