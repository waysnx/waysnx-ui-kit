import React from 'react';
import './Link.css';

export interface LinkProps {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  prependText?: string;
  appendText?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  isActive?: boolean;
  testId?: string;
}

export function Link({
  label,
  href,
  onClick,
  prependText,
  appendText,
  target,
  className,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  isActive = false,
  testId,
}: LinkProps) {
  // Validate href — only allow safe protocols
  const safeHref = href && /^(https?:|mailto:|\/|#)/i.test(href.trim()) ? href.trim() : '#';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <div className="wx-link-wrapper" data-testid={testId}>
      {prependText && <span className="wx-link-prepend">{prependText}</span>}
      <a
        href={disabled ? undefined : safeHref}
        onClick={handleClick}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={`wx-link ${disabled ? 'wx-link-disabled' : ''} ${className || ''}`}
        aria-disabled={disabled}
        aria-label={ariaLabel || label}
        aria-describedby={ariaDescribedBy}
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
      </a>
      {appendText && <span className="wx-link-append">{appendText}</span>}
    </div>
  );
}
