import React from 'react';
import { useTranslation } from '@waysnx/ui-i18n';

export const PlaceholderWrapper: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = '' }) => {
  const { t } = useTranslation();

  return (
    <div
      className={className}
      style={{
        border: '2px dashed var(--wx-color-border)',
        borderRadius: 'var(--wx-radius-lg)',
        padding: '2rem',
        background: 'var(--wx-color-surface-alt)',
        textAlign: 'center',
      }}
    >
      <span style={{
        display: 'inline-block',
        padding: '3px 12px',
        borderRadius: '999px',
        background: 'var(--wx-color-primary-light)',
        color: 'var(--wx-color-primary)',
        fontSize: 'var(--wx-font-size-xs)',
        fontWeight: 600,
        marginBottom: '0.75rem',
      }}>
        {t('docs.comingSoon')}
      </span>
      <h3 style={{ fontSize: 'var(--wx-font-size-lg)', fontWeight: 600, margin: '0 0 0.5rem', color: 'var(--wx-color-text)' }}>
        {title}
      </h3>
      <div style={{ fontSize: 'var(--wx-font-size-sm)', color: 'var(--wx-color-text-muted)', lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
};
