import React, { useState } from 'react';
import { useTranslation } from '@waysnx/ui-i18n';
import { FloatingButtonProps } from '../../types';
import './FloatingButton.css';

/**
 * FloatingButton Component
 * A floating button that triggers the accessibility center
 */
export const FloatingButton = React.forwardRef<HTMLButtonElement, FloatingButtonProps>(
  (
    {
      position = 'bottom-right',
      onClick,
      className,
      style,
      ariaLabel,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const { t } = useTranslation();

    const positionClass = `wx-floating-button--${position}`;
    const finalAriaLabel = ariaLabel || t('accessibility.aria.openAccessibilitySettings');

    return (
      <button
        ref={ref}
        className={`wx-floating-button ${positionClass} ${className || ''}`}
        style={style}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={finalAriaLabel}
        aria-pressed={isHovered}
        type="button"
      >
        {/* Accessibility Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      </button>
    );
  }
);

FloatingButton.displayName = 'FloatingButton';
