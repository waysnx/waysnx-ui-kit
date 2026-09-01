/**
 * @file components/Header/Header.tsx
 * Header component with breadcrumb and navigation controls
 */

import React, { forwardRef, useEffect, useRef } from 'react';
import type { BreadcrumbItem } from '../../types';
import { Breadcrumb } from '../Breadcrumb';
import './header.css';

/**
 * Header component props
 */
export interface HeaderProps {
  /**
   * Page title
   */
  title?: string;

  /**
   * Page subtitle or description
   */
  subtitle?: string;

  /**
   * Breadcrumb items
   */
  breadcrumbs?: BreadcrumbItem[];

  /**
   * Icon to display next to title
   */
  icon?: React.ReactNode;

  /**
   * Left side content
   */
  left?: React.ReactNode;

  /**
   * Right side content (actions, buttons, etc.)
   */
  right?: React.ReactNode;

  /**
   * Background variant
   */
  variant?: 'default' | 'minimal' | 'elevated';

  /**
   * Size of header
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether to show breadcrumb
   */
  showBreadcrumb?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: React.CSSProperties;

  /**
   * Sticky header
   */
  sticky?: boolean;

  /**
   * Breadcrumb separator
   */
  breadcrumbSeparator?: React.ReactNode;

  /**
   * Callback when breadcrumb item is clicked
   */
  onBreadcrumbClick?: (item: BreadcrumbItem) => void;
}

/**
 * Header Component
 *
 * Page header with optional breadcrumb navigation and action area.
 * Typically used at the top of page content areas.
 *
 * @example
 * ```tsx
 * <Header
 *   title="Dashboard"
 *   subtitle="Welcome back"
 *   breadcrumbs={breadcrumbs}
 *   right={<Actions />}
 * />
 * ```
 */
export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  (
    {
      title,
      subtitle,
      breadcrumbs,
      icon,
      left,
      right,
      variant = 'default',
      size = 'md',
      showBreadcrumb = true,
      className = '',
      style,
      sticky = false,
      breadcrumbSeparator,
      onBreadcrumbClick,
    },
    ref
  ) => {
    const headerRef = useRef<HTMLDivElement>(null);

    // Combine refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(headerRef.current);
        } else {
          ref.current = headerRef.current;
        }
      }
    }, [ref]);

    return (
      <header
        ref={headerRef}
        className={`nav-header nav-header--${variant} nav-header--${size} ${
          sticky ? 'nav-header--sticky' : ''
        } nav-component ${className}`}
        style={style}
        role="banner"
      >
        {/* Breadcrumb */}
        {showBreadcrumb && breadcrumbs && breadcrumbs.length > 0 && (
          <div className="nav-header__breadcrumb-wrapper">
            <Breadcrumb
              items={breadcrumbs}
              separator={breadcrumbSeparator}
              onItemClick={onBreadcrumbClick}
              className="nav-header__breadcrumb"
            />
          </div>
        )}

        {/* Main content */}
        <div className="nav-header__content">
          {/* Left section */}
          {(icon || title || left) && (
            <div className="nav-header__section nav-header__section--left">
              {icon && (
                <span className="nav-header__icon" aria-hidden="true">
                  {icon}
                </span>
              )}

              <div className="nav-header__title-group">
                {title && (
                  <h1 className="nav-header__title">
                    {title}
                  </h1>
                )}

                {subtitle && (
                  <p className="nav-header__subtitle">
                    {subtitle}
                  </p>
                )}
              </div>

              {left && (
                <div className="nav-header__left-content">
                  {left}
                </div>
              )}
            </div>
          )}

          {/* Right section */}
          {right && (
            <div className="nav-header__section nav-header__section--right">
              <div className="nav-header__right-content">
                {right}
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';

export default Header;
