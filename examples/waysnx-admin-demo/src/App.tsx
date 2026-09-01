import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TranslationProvider } from '@waysnx/ui-i18n';
import { AccessibilityProvider, ReadingGuide, Magnifier, SkipLinks } from '@waysnx/ui-accessibility';
import { ToastProvider } from '@waysnx/ui-feedback';
import { AppLayout } from './layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { EmployeeListing } from './pages/EmployeeListing';
import { EmployeeOnboarding } from './pages/EmployeeOnboarding';
import { useTheme } from './hooks/useTheme';
import { useLocale } from './hooks/useLocale';
import { ThemeContext } from './context/ThemeContext';
import { LocaleContext } from './context/LocaleContext';

function AppContent() {
  const themeState = useTheme();
  const localeState = useLocale();

  return (
    <ThemeContext.Provider value={themeState}>
      <LocaleContext.Provider value={localeState}>
        <TranslationProvider locale={localeState.locale} messages={localeState.messages}>
          <AccessibilityProvider>
            <SkipLinks />
            <ReadingGuide />
            <Magnifier />
            <ToastProvider position="top-right">
              <BrowserRouter>
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employees" element={<EmployeeListing />} />
                    <Route path="/onboarding" element={<EmployeeOnboarding />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ToastProvider>
          </AccessibilityProvider>
        </TranslationProvider>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default function App() {
  return <AppContent />;
}
