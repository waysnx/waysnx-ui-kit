import React, { useState, useCallback, useContext, createContext, useEffect } from "react";
import { useTranslation } from "@waysnx/ui-i18n";
import "./Toast.css";

export type ToastType = "success" | "error" | "info" | "warning";
export type ToastPosition = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string | React.ReactNode;
  duration?: number;
}

export interface ToastProps {
  type?: ToastType;
  message: string | React.ReactNode;
}

export function Toast({ type = "info", message }: ToastProps) {
  const { t } = useTranslation();
  const ariaLabel = type === 'success' ? t('toast.successNotification')
    : type === 'error' ? t('toast.errorNotification')
    : type === 'warning' ? t('toast.warningNotification')
    : t('toast.infoNotification');

  return (
    <div 
      className={`wx-toast wx-toast-${type}`} 
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={ariaLabel}
    >
      <span className="wx-toast-icon" aria-hidden="true">{getIcon(type)}</span>
      <span className="wx-toast-message">
        {typeof message === "string" ? message.replace(/\\n/g, "\n") : message}
      </span>
    </div>
  );
}

function getIcon(type: ToastType): string {
  switch (type) {
    case "success": return "✓";
    case "error": return "✕";
    case "warning": return "⚠";
    case "info": return "ℹ";
  }
}

// Toast Context & Provider

interface ToastContextType {
  addToast: (type: ToastType, message: string | React.ReactNode, duration?: number) => void;
  removeToast: (id: string) => void;
  success: (message: string | React.ReactNode, duration?: number) => void;
  error: (message: string | React.ReactNode, duration?: number) => void;
  info: (message: string | React.ReactNode, duration?: number) => void;
  warning: (message: string | React.ReactNode, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
  testId?: string;
}

export function ToastProvider({
  children,
  position = "top-right",
  maxToasts = 5,
  testId,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string | React.ReactNode, duration = 4000) => {
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
      setToasts((prev) => {
        const next = [...prev, { id, type, message, duration }];
        return next.slice(-maxToasts);
      });
    },
    [maxToasts]
  );

  const success = useCallback((msg: string | React.ReactNode, d?: number) => addToast("success", msg, d), [addToast]);
  const error = useCallback((msg: string | React.ReactNode, d?: number) => addToast("error", msg, d), [addToast]);
  const info = useCallback((msg: string | React.ReactNode, d?: number) => addToast("info", msg, d), [addToast]);
  const warning = useCallback((msg: string | React.ReactNode, d?: number) => addToast("warning", msg, d), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, info, warning }}>
      {children}
      <div className={`wx-toast-container wx-toast-${position}`} data-testid={testId}>
        {toasts.map((toast) => (
          <ToastItemComponent
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItemComponent({
  toast,
  onRemove,
}: {
  toast: ToastItem;
  onRemove: (id: string) => void;
}) {
  const [exiting, setExiting] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(() => onRemove(toast.id), 300);
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onRemove]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const ariaLabel = toast.type === 'success' ? t('toast.successNotification')
    : toast.type === 'error' ? t('toast.errorNotification')
    : toast.type === 'warning' ? t('toast.warningNotification')
    : t('toast.infoNotification');

  return (
    <div
      className={`wx-toast wx-toast-${toast.type} wx-toast-item ${exiting ? "wx-toast-exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={ariaLabel}
    >
      <span className="wx-toast-icon" aria-hidden="true">{getIcon(toast.type)}</span>
      <span className="wx-toast-message">
        {typeof toast.message === "string"
          ? toast.message.replace(/\\n/g, "\n")
          : toast.message}
      </span>
      <button 
        className="wx-toast-close" 
        onClick={handleClose} 
        aria-label={t('toast.close')}
      >
        ✕
      </button>
    </div>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
