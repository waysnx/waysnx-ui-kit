import React, { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../../hooks/useAccessibility';
import { useTranslation } from '@waysnx/ui-i18n';
import './Magnifier.css';

/**
 * Magnifier Component
 * Provides a magnified view of page content for users with low vision
 * Follows cursor/scroll position
 */
export const Magnifier: React.FC = () => {
  const { settings } = useAccessibility();
  const { t } = useTranslation();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const magnifierRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Default zoom level when magnifier is enabled (2x)
  const zoomLevel = 2;
  const magnifierSize = 150; // 150x150px viewing area

  useEffect(() => {
    if (!settings.magnifier) {
      setVisible(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleScroll = () => {
      if (contentRef.current) {
        contentRef.current.style.transform = `scale(${zoomLevel}) translate(${-window.scrollX / zoomLevel}px, ${-window.scrollY / zoomLevel}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [settings.magnifier]);

  if (!settings.magnifier) {
    return null;
  }

  return (
    <div
      ref={magnifierRef}
      className={`wx-magnifier ${visible ? 'wx-magnifier-visible' : ''}`}
      style={{
        left: `${position.x - magnifierSize / 2}px`,
        top: `${position.y - magnifierSize / 2}px`,
      }}
      role="presentation"
      aria-label={t('accessibility.aria.magnifier')}
      aria-hidden="true"
    >
      <div
        ref={contentRef}
        className="wx-magnifier-content"
        style={{
          width: `${window.innerWidth}px`,
          height: `${window.innerHeight}px`,
          transform: `scale(${zoomLevel}) translate(${-position.x / zoomLevel + magnifierSize / (2 * zoomLevel)}px, ${-position.y / zoomLevel + magnifierSize / (2 * zoomLevel)}px)`,
        }}
      >
        {/* Content is clipped by parent container */}
      </div>

      {/* Crosshair cursor */}
      <div className="wx-magnifier-crosshair" />
    </div>
  );
};

Magnifier.displayName = 'Magnifier';
