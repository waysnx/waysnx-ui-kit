import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '@waysnx/ui-navigation';
import type { NavigationItem } from '@waysnx/ui-navigation';
import { useAppTranslation } from '../hooks/useAppTranslation';
import { useThemeContext } from '../context/ThemeContext';

export function AppSidebar({ collapsed, onCollapseChange }: { collapsed?: boolean; onCollapseChange?: (v: boolean) => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useAppTranslation();
  const { theme } = useThemeContext();

  const menuItems: NavigationItem[] = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg> },
    { id: 'forms', label: t('nav.forms'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg> },
    { id: 'grid', label: t('nav.gridListing'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /></svg> },
  ];

  const pathMap: Record<string, string> = {
    dashboard: '/dashboard',
    forms: '/onboarding',
    grid: '/employees',
  };

  const logo = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={theme === 'dark' ? '/header-logo-dark.png' : '/header-logo.png'}
        alt="WaysNX UI Kit"
        className="sidebar-logo__img"
        style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
      />
    </div>
  );

  const footer = (
    <div className="sidebar-footer">
      <div className="sidebar-footer__card">
        <img src="/waysnx-logo.png" alt="WaysNX UI Kit" className="sidebar-footer__logo" />
        <p className="sidebar-footer__desc">{t('footer.buildFaster')}</p>
        <a href="https://waysnx.com" target="_blank" rel="noopener noreferrer" className="sidebar-footer__btn">
          {t('footer.learnMore')}
        </a>
      </div>
      <div className="sidebar-footer__version">v1.0.0</div>
    </div>
  );

  return (
    <Sidebar
      items={menuItems}
      logo={logo}
      footer={footer}
      isCollapsed={collapsed}
      onCollapseChange={onCollapseChange}
      collapsible
      persistState
      colorScheme={theme}
      activeItem={menuItems.find(item => pathMap[item.id] === location.pathname)}
      onItemClick={(item) => {
        const path = pathMap[item.id];
        if (path) navigate(path);
      }}
    />
  );
}
