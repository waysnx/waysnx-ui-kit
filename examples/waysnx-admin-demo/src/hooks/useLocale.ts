import { useState, useCallback } from 'react';
import { enMessages } from '../i18n/en';
import { mrMessages } from '../i18n/mr';

export type Locale = 'en' | 'mr';

const messagesMap: Record<Locale, Record<string, string>> = {
  en: enMessages,
  mr: mrMessages,
};

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem('app-locale');
    return (saved as Locale) || 'en';
  });

  const changeLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('app-locale', newLocale);
  }, []);

  return { locale, messages: messagesMap[locale], changeLocale };
}
