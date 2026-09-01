import React, { createContext, useContext, useCallback, useMemo } from 'react';
import type { TranslationMessages, AllMessages } from './types';
import { defaultMessages } from './defaultMessages';

interface TranslationContextType {
  /** Current locale code */
  locale: string;
  /** Text direction (ltr or rtl) */
  direction: 'ltr' | 'rtl';
  /**
   * Get a translated message by key.
   * Supports interpolation with {placeholder} syntax.
   * Falls back to English default if key not found in custom messages.
   *
   * @example
   * t('validation.minLength', { min: 3 }) // "Minimum 3 characters required"
   * t('wizard.next') // "Next" or translated equivalent
   */
  t: (key: keyof AllMessages, params?: Record<string, string | number>) => string;
  /** Get all current messages (merged defaults + custom) */
  messages: AllMessages;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export interface TranslationProviderProps {
  children: React.ReactNode;
  /** Active locale code (e.g., 'en', 'es', 'fr', 'ar') */
  locale?: string;
  /** Custom messages to override English defaults. Only override what you need. */
  messages?: TranslationMessages;
  /** Text direction. Auto-detected for common RTL locales if not provided. */
  direction?: 'ltr' | 'rtl';
}

/** RTL locale codes */
const RTL_LOCALES = new Set(['ar', 'he', 'fa', 'ur', 'ps', 'sd', 'yi']);

/**
 * TranslationProvider wraps your app to provide i18n support to all WaysNX UI Kit components.
 *
 * @example
 * // Basic usage with Spanish translations
 * <TranslationProvider locale="es" messages={spanishMessages}>
 *   <App />
 * </TranslationProvider>
 *
 * @example
 * // Without provider, all components use English defaults (no breaking change)
 * <App />
 */
export function TranslationProvider({
  children,
  locale = 'en',
  messages: customMessages,
  direction,
}: TranslationProviderProps) {
  // Detect direction from locale if not explicitly provided
  const resolvedDirection = direction || (RTL_LOCALES.has(locale.split('-')[0]) ? 'rtl' : 'ltr');

  // Merge custom messages with defaults
  const mergedMessages = useMemo<AllMessages>(() => {
    if (!customMessages) return defaultMessages;
    return { ...defaultMessages, ...customMessages } as AllMessages;
  }, [customMessages]);

  // Translation function with interpolation
  const t = useCallback(
    (key: keyof AllMessages, params?: Record<string, string | number>): string => {
      let message = mergedMessages[key] || defaultMessages[key] || String(key);

      // Interpolate {placeholder} values
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          message = message.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
        });
      }

      return message;
    },
    [mergedMessages]
  );

  const contextValue = useMemo<TranslationContextType>(
    () => ({
      locale,
      direction: resolvedDirection,
      t,
      messages: mergedMessages,
    }),
    [locale, resolvedDirection, t, mergedMessages]
  );

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}

/**
 * Hook to access the translation function and locale info.
 * Falls back to English defaults when used outside a TranslationProvider.
 *
 * @example
 * function MyComponent() {
 *   const { t, locale, direction } = useTranslation();
 *   return <span>{t('validation.required')}</span>;
 * }
 */
export function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext);

  // Fallback for usage without a provider (no breaking change)
  if (!context) {
    return {
      locale: 'en',
      direction: 'ltr',
      t: (key: keyof AllMessages, params?: Record<string, string | number>): string => {
        let message = defaultMessages[key] || String(key);
        if (params) {
          Object.entries(params).forEach(([paramKey, paramValue]) => {
            message = message.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
          });
        }
        return message;
      },
      messages: defaultMessages,
    };
  }

  return context;
}

/**
 * HOC to inject translation props into class components.
 * Prefer the useTranslation hook for function components.
 */
export function withTranslation<P extends object>(
  Component: React.ComponentType<P & { t: TranslationContextType['t']; locale: string; direction: 'ltr' | 'rtl' }>
) {
  return function WrappedComponent(props: P) {
    const { t, locale, direction } = useTranslation();
    return <Component {...props} t={t} locale={locale} direction={direction} />;
  };
}
