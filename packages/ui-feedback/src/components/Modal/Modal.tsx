import React, { useEffect, useRef } from "react";
import { useTranslation } from "@waysnx/ui-i18n";
import "./Modal.css";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  size?: "sm" | "md" | "lg" | "fullscreen";
  footer?: React.ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
  className?: string;
  role?: string;
  testId?: string;
}

export function Modal({
  open,
  onClose,
  title,
  size = "md",
  footer,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  children,
  className = "",
  role = "dialog",
  testId,
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    
    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;
    
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) onClose();
    };
    
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    // Only focus the modal container on initial open, not on every re-render
    setTimeout(() => {
      if (ref.current && document.activeElement === document.body) {
        ref.current.focus();
      }
    }, 0);
    
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      // Restore focus to the previously focused element
      previousActiveElement.current?.focus();
    };
  }, [open, onClose, closeOnEscape]);

  if (!open) return null;

  const titleId = title ? "modal-title" : undefined;
  const descriptionId = "modal-description";

  return (
    <div
      className="wx-modal-backdrop"
      onClick={closeOnBackdrop ? onClose : undefined}
      role="presentation"
    >
      <div
        className={`wx-modal wx-modal-${size} ${className}`}
        role={role}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        data-testid={testId}
      >
        {(title || showCloseButton) && (
          <div className="wx-modal-header">
            {title && <div className="wx-modal-title" id={titleId}>{title}</div>}
            {showCloseButton && (
              <button
                className="wx-modal-close"
                onClick={onClose}
                aria-label={t('modal.close')}
              >
                ✕
              </button>
            )}
          </div>
        )}
        <div className="wx-modal-content" id={descriptionId}>{children}</div>
        {footer && <div className="wx-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
