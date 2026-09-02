/**
 * LoginCard Component
 * 
 * Uses @waysnx/ui-layout Card as base container
 * Adds: branding section, logo, title, description, footer
 */

import React from 'react';
import LoginForm, { LoginFormProps, LoginFormData } from './LoginForm';

export interface LoginCardProps extends Omit<LoginFormProps, 'onSubmit'> {
  title?: string;
  description?: string;
  logo?: string | React.ReactNode;
  logoAlt?: string;
  footerText?: string;
  footerLinkText?: string;
  onFooterLinkClick?: () => void;
  maxWidth?: string | number;
  onSubmit: (data: LoginFormData) => Promise<void> | void;
  className?: string;
}

export const LoginCard: React.FC<LoginCardProps> = ({
  title = 'Sign In',
  description,
  logo,
  logoAlt = 'Company Logo',
  footerText = "Don't have an account?",
  footerLinkText = 'Sign up',
  onFooterLinkClick,
  maxWidth = 400,
  onSubmit,
  className = '',
  ...formProps
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '1.5rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        backgroundColor: '#ffffff',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }} className={className}>
        {/* Logo Section */}
        {logo && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '1rem',
            borderBottom: '1px solid #e5e7eb',
          }}>
            {typeof logo === 'string' ? (
              <img src={logo} alt={logoAlt} style={{ maxWidth: '200px', maxHeight: '80px', objectFit: 'contain' }} />
            ) : (
              <div>{logo}</div>
            )}
          </div>
        )}

        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'center' }}>
          {title && <h1 style={{ margin: 0, fontSize: '1.875rem', fontWeight: 700 }}>{title}</h1>}
          {description && <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>{description}</p>}
        </div>

        {/* Form Section */}
        <LoginForm {...formProps} onSubmit={onSubmit} />

        {/* Footer Section */}
        {footerText && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: '#6b7280',
            borderTop: '1px solid #e5e7eb',
            paddingTop: '1.5rem',
            marginTop: '0.5rem',
          }}>
            <span>{footerText}</span>
            {footerLinkText && onFooterLinkClick && (
              <button
                type="button"
                onClick={onFooterLinkClick}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3b82f6',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                  fontWeight: 600,
                  fontSize: 'inherit',
                }}
              >
                {footerLinkText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

LoginCard.displayName = 'LoginCard';

export default LoginCard;
