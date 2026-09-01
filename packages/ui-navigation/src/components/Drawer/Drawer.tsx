/**
 * @file components/Drawer/Drawer.tsx
 * Drawer component for slide-out side panels
 */

import React, { useState, useCallback, useRef, useEffect, forwardRef, ReactNode } from 'react';
import './drawer.css';

/**
 * Drawer component props
 */
export interface DrawerProps {
  /**
   * Whether drawer is open
   */
  isOpen: boolean;

  /**
   * Callback when drawer is requested to close
   */
  onClose?: () => void;

  /**
   * Drawer content
   */
  children?: ReactNode;

  /**
   * Position of drawer
   */
  position?: 'left' | 'right' | 'top' | 'bottom';

  /**
   * Width of drawer (for left/right)
   */
  width?: string | number;

  /**
   * Height of drawer (for top/bottom)
   */
  height?: string | number;

  /**
   * Show backdrop overlay
   */
  showBackdrop?: boolean;

  /**
   * Close on backdrop click
   */
  closeOnBackdropClick?: boolean;

  /**
   * Close on Escape key press
   */
  closeOnEscape?: boolean;

  /**
   * Animation duration in ms
   */
  animationDuration?: number;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: React.CSSProperties;

  /**
   * Drawer title
   */
  title?: string;

  /**
   * Show close button
   */
  showCloseButton?: boolean;

  /**
   * Backdrop opacity (0-1)
   */
  backdropOpacity?: number;

  /**
   * Lock body scroll when drawer is open
   */
  lockScroll?: boolean;

  /**
   * Z-index for drawer
   */
  zIndex?: number;

  /**
   * Allow drawer resizing
   */
  resizable?: boolean;

  /**
   * Drawer header content
   */
  header?: ReactNode;

  /**
   * Drawer footer content
   */
  footer?: ReactNode;

  /**
   * Accessible label for drawer
   */
  ariaLabel?: string;

  /**
   * Drawer description for a11y
   */
  ariaDescription?: string;
}

/**
 * Drawer Component
 *
 * Slide-out panel with support for multiple positions, animations,
 * backdrop overlay, and keyboard/click-outside interactions.
 *
 * @example
 * ```tsx
 * <Drawer
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   position="left"
 *   width={300}
 * >
 *   Drawer content
 * </Drawer>
 * ```
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen,
      onClose,
      children,
      position = 'left',
      width = 300,
      height = 300,
      showBackdrop = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      animationDuration = 300,
      className = '',
      style,
      title,
      showCloseButton = true,
      backdropOpacity = 0.5,
      lockScroll = true,
      zIndex = 1000,
      resizable = false,
      header,
      footer,
      ariaLabel,
      ariaDescription,
    },
    ref
  ) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Lock body scroll when drawer is open
    useEffect(() => {
      if (lockScroll && isOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
        };
      }
    }, [isOpen, lockScroll]);

    // Handle animation timing
    useEffect(() => {
      if (isOpen) {
        setIsAnimating(true);
      }
    }, [isOpen]);

    const handleAnimationEnd = useCallback(() => {
      if (!isOpen) {
        setIsAnimating(false);
      }
    }, [isOpen]);

    // Handle Escape key
    useEffect(() => {
      if (!closeOnEscape || !isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose?.();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [closeOnEscape, isOpen, onClose]);

    // Handle backdrop click
    const handleBackdropClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
          onClose?.();
        }
      },
      [closeOnBackdropClick, onClose]
    );

    if (!isOpen && !isAnimating) {
      return null;
    }

    const drawerWidth = typeof width === 'number' ? `${width}px` : width;
    const drawerHeight = typeof height === 'number' ? `${height}px` : height;

    const isHorizontal = position === 'left' || position === 'right';

    return (
      <div
        className={`nav-drawer-overlay ${isOpen ? 'nav-drawer-overlay--open' : ''}`}
        style={{
          zIndex,
          opacity: isOpen ? backdropOpacity : 0,
        }}
        onClick={handleBackdropClick}
        role={showBackdrop ? 'presentation' : undefined}
      >
        {showBackdrop && (
          <div
            className="nav-drawer-backdrop"
            style={{
              backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
            }}
          />
        )}

        <div
          ref={ref || drawerRef}
          className={`nav-drawer nav-drawer--${position} ${resizable ? 'nav-drawer--resizable' : ''} nav-component ${className}`}
          style={{
            ...style,
            width: isHorizontal ? drawerWidth : undefined,
            height: !isHorizontal ? drawerHeight : undefined,
            zIndex: zIndex + 1,
            transition: `all ${animationDuration}ms ease-in-out`,
            opacity: isOpen ? 1 : 0,
            visibility: isAnimating ? 'visible' : 'hidden',
          }}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel || 'Drawer'}
          aria-description={ariaDescription}
          onAnimationEnd={handleAnimationEnd}
        >
          {/* Header */}
          {(title || header || showCloseButton) && (
            <div className="nav-drawer__header">
              {header ? (
                header
              ) : (
                <div className="nav-drawer__header-content">
                  {title && <h2 className="nav-drawer__title">{title}</h2>}
                  {showCloseButton && (
                    <button
                      className="nav-drawer__close-btn"
                      onClick={onClose}
                      aria-label="Close drawer"
                      title="Close"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="nav-drawer__content">{children}</div>

          {/* Footer */}
          {footer && <div className="nav-drawer__footer">{footer}</div>}
        </div>
      </div>
    );
  }
);

Drawer.displayName = 'Drawer';

export default Drawer;
