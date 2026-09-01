import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../hooks/useAccessibility';
import { useTranslation } from '@waysnx/ui-i18n';
import './ReadingGuide.css';

/**
 * ReadingGuide Component
 * Displays a visual reading line to help users follow text
 * Only renders when readingGuide is enabled in accessibility settings
 */
export const ReadingGuide: React.FC = () => {
  const { settings } = useAccessibility();
  const { t } = useTranslation();
  const [position, setPosition] = useState(0);

  // Track mouse/scroll position
  useEffect(() => {
    if (!settings.readingGuide) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition(e.clientY);
    };

    const handleScroll = () => {
      setPosition(window.scrollY + window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [settings.readingGuide]);

  if (!settings.readingGuide) {
    return null;
  }

  return (
    <div
      className="wx-reading-guide"
      style={{
        top: `${position}px`,
      }}
      role="presentation"
      aria-label={t('accessibility.aria.readingGuide')}
      aria-hidden="true"
    />
  );
};

ReadingGuide.displayName = 'ReadingGuide';
