import React from 'react';
import { useTranslation } from '@waysnx/ui-i18n';
import './SkipLinks.css';

export interface SkipLink {
  /** Target element id (without #) */
  targetId: string;
  /** Link label */
  label: string;
}

export interface SkipLinksProps {
  /** Links to render — defaults to a single "Skip to main content" link */
  links?: SkipLink[];
  className?: string;
}

const DEFAULT_LINKS: SkipLink[] = [
  { targetId: 'main-content', label: 'Skip to main content' },
];

/**
 * SkipLinks — renders visually hidden skip-navigation links.
 * Links appear on keyboard focus, allowing keyboard/screen reader users
 * to bypass repeated navigation blocks.
 *
 * Place as the very first child of <body> or <App>.
 *
 * @example
 * <SkipLinks links={[
 *   { targetId: 'main-content', label: 'Skip to main content' },
 *   { targetId: 'main-nav', label: 'Skip to navigation' },
 * ]} />
 */
export function SkipLinks({ links = DEFAULT_LINKS, className = '' }: SkipLinksProps) {
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: false });
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`wx-skip-links ${className}`}
      aria-label={t('accessibility.skipLinks.nav')}
    >
      {links.map((link) => (
        <a
          key={link.targetId}
          href={`#${link.targetId}`}
          className="wx-skip-link"
          onClick={(e) => handleClick(e, link.targetId)}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

SkipLinks.displayName = 'SkipLinks';
export default SkipLinks;
