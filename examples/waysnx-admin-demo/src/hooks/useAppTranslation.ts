import { useCallback } from 'react';
import { useLocaleContext } from '../context/LocaleContext';

/**
 * App-level translation hook.
 * Returns a t() function that looks up keys from the current locale's messages.
 * Falls back to the key itself if no translation is found.
 */
export function useAppTranslation() {
  const { locale, messages } = useLocaleContext();

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let text = messages[key] || key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [messages]
  );

  return { t, locale };
}
