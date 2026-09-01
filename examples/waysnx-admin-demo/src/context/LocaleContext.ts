import { createContext, useContext } from 'react';
import type { Locale } from '../hooks/useLocale';

interface LocaleContextType {
  locale: Locale;
  messages: Record<string, string>;
  changeLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  messages: {},
  changeLocale: () => {},
});

export function useLocaleContext() {
  return useContext(LocaleContext);
}
