import React, { useEffect, useRef } from "react";
import "./Drawer.css";
import { useTranslation } from '@waysnx/ui-i18n';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  position?: "left" | "right";
  size?: "sm" | "md" | "lg";
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  children: React.ReactNode;
  className?: string;
  testId?: string;
}

export function Drawer({
  open,
  onClose,
  title,
  position = "right",
  size = "md",
  showCloseButton = true,
  closeOnBackdrop = true,
  children,
  className = "",
  testId,
}: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    
    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;
    
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      // Restore focus to the previously focused element
      previousActiveElement.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const titleId = title ? "drawer-title" : undefined;

  return (
    <div
      className="wx-drawer-backdrop"
      onClick={closeOnBackdrop ? onClose : undefined}
      role="presentation"
    >
      <div
        className={`wx-drawer wx-drawer-${position} wx-drawer-${size} ${className}`}
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        data-testid={testId}
      >
        {(title || showCloseButton) && (
          <div className="wx-drawer-header">
            {title && <div className="wx-drawer-title" id={titleId}>{title}</div>}
            {showCloseButton && (
              <button 
                className="wx-drawer-close" 
                onClick={onClose} 
                aria-label={t('drawer.close')}
              >
                ✕
              </button>
            )}
          </div>
        )}
        <div className="wx-drawer-content">{children}</div>
      </div>
    </div>
  );
}
