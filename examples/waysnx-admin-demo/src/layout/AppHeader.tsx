import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, UserMenu, NotificationCenter, CommandPalette } from '@waysnx/ui-navigation';
import type { Notification, Command, UserInfo, UserMenuItem } from '@waysnx/ui-navigation';
import { AccessibilityCenter } from '@waysnx/ui-accessibility';
import { ConfirmDialog, useToast } from '@waysnx/ui-feedback';
import { useThemeContext } from '../context/ThemeContext';
import { useLocaleContext } from '../context/LocaleContext';
import { useAppTranslation } from '../hooks/useAppTranslation';
import type { Locale } from '../hooks/useLocale';

interface AppHeaderProps {
  onToggleSidebar?: () => void;
}

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const { theme, toggleTheme } = useThemeContext();
  const { locale, changeLocale } = useLocaleContext();
  const { t } = useAppTranslation();
  const toast = useToast();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const navigate = useNavigate();

  // Cmd+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const notifications: Notification[] = [
    { id: '1', title: t('notifications.newUserRegistered'), message: t('notifications.johnDoeJoined'), type: 'info', timestamp: Date.now() - 120000 },
    { id: '2', title: t('notifications.projectUpdated'), message: t('notifications.websiteRedesignUpdated'), type: 'info', timestamp: Date.now() - 900000 },
    { id: '3', title: t('notifications.taskCompleted'), message: t('notifications.designSystemUpdated'), type: 'success', timestamp: Date.now() - 3600000 },
    { id: '4', title: t('notifications.paymentReceived'), message: t('notifications.acmeCorp'), type: 'warning', timestamp: Date.now() - 7200000 },
    { id: '5', title: t('notifications.newComment'), message: t('notifications.projectApollo'), type: 'info', timestamp: Date.now() - 10800000 },
  ];

  const commands: Command[] = [
    { id: 'dashboard', title: t('nav.dashboard'), category: t('search.pages'), action: () => navigate('/dashboard') },
    { id: 'employees', title: t('employees.title'), category: t('search.pages'), action: () => navigate('/employees') },
    { id: 'onboarding', title: t('onboarding.title'), category: t('search.pages'), action: () => navigate('/onboarding') },
  ];

  const userInfo: UserInfo = {
    name: 'Umesh Wani',
    email: 'umesh@waysnx.com',
    avatar: 'UW',
    status: 'online',
  };

  const userMenuItems: UserMenuItem[] = [
    { id: 'profile', label: t('header.myProfile'), onClick: () => {} },
    { id: 'settings', label: t('header.accountSettings'), onClick: () => {} },
    { id: 'signout', label: t('header.signOut'), onClick: () => setShowSignOutConfirm(true), destructive: true, divider: true },
  ];

  const leftContent = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* Search trigger */}
      <div
        onClick={() => setCommandPaletteOpen(true)}
        style={{ position: 'relative', width: '280px', cursor: 'pointer' }}
      >
        <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--wx-color-text-muted)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder={t('header.search')}
          readOnly
          style={{ width: '100%', height: '38px', padding: '0 60px 0 36px', border: '1px solid var(--wx-color-border)', borderRadius: '8px', background: 'var(--wx-color-surface-alt)', color: 'var(--wx-color-text)', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
        />
        <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px', color: 'var(--wx-color-text-muted)', background: 'var(--wx-color-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--wx-color-border)' }}>&#8984; K</span>
      </div>
    </div>
  );

  const rightContent = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <NotificationCenter notifications={notifications} showBadge trigger="click" />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        style={{ width: '48px', height: '26px', borderRadius: '13px', background: theme === 'dark' ? '#3b82f6' : '#1e293b', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0 }}
      >
        <span style={{ position: 'absolute', top: '3px', left: theme === 'dark' ? '25px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.3s ease', display: 'block' }} />
      </button>

      {/* Language switcher */}
      <select
        value={locale}
        onChange={(e) => changeLocale(e.target.value as Locale)}
        aria-label="Language"
        style={{ padding: '8px 16px', border: '1px solid var(--wx-color-border)', borderRadius: '20px', background: 'var(--wx-color-surface)', color: 'var(--wx-color-text)', fontSize: '13px', cursor: 'pointer', outline: 'none' }}
      >
        <option value="en">English</option>
        <option value="mr">मराठी</option>
      </select>

      {/* Accessibility */}
      <div className="app-header__accessibility-wrapper">
        <AccessibilityCenter variant="modal" position="top-right" />
      </div>

      {/* User Menu */}
      <UserMenu
        user={userInfo}
        items={userMenuItems}
        trigger="click"
        position="right"
        customTrigger={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '4px 8px', borderRadius: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', color: 'var(--wx-color-primary)' }}>UW</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--wx-color-text)' }}>Umesh Wani</span>
              <span style={{ fontSize: '11px', color: 'var(--wx-color-text-muted)' }}>Administrator</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        }
      />
    </div>
  );

  return (
    <>
      <Navbar
        items={[]}
        left={leftContent}
        right={rightContent}
        sticky
        shadow="sm"
      />
      <CommandPalette
        commands={commands}
        isOpen={commandPaletteOpen}
        onOpen={() => setCommandPaletteOpen(true)}
        onClose={() => setCommandPaletteOpen(false)}
        searchPlaceholder={t('search.placeholder')}
        recentCount={0}
      />
      <ConfirmDialog
        open={showSignOutConfirm}
        variant="danger"
        title={t('header.signOut')}
        message={t('header.signOutConfirm')}
        confirmLabel={t('header.signOut')}
        cancelLabel={t('common.cancel')}
        onConfirm={() => {
          setShowSignOutConfirm(false);
          toast.success(t('header.signedOut'));
        }}
        onCancel={() => setShowSignOutConfirm(false)}
      />
    </>
  );
}
