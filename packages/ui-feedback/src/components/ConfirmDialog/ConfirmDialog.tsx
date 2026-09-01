import React from "react";
import { useTranslation } from "@waysnx/ui-i18n";
import { Modal } from "../Modal";
import "./ConfirmDialog.css";

export interface ConfirmDialogProps {
  open: boolean;
  title?: string | React.ReactNode;
  message: string | React.ReactNode;
  variant?: "default" | "danger" | "warning";
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  testId?: string;
}

export function ConfirmDialog({
  open,
  title,
  message,
  variant = "default",
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  testId,
}: ConfirmDialogProps) {
  const { t } = useTranslation();
  const resolvedConfirmLabel = confirmLabel || t('confirm.confirm');
  const resolvedCancelLabel = cancelLabel || t('confirm.cancel');

  return (
    <Modal 
      open={open} 
      onClose={onCancel} 
      title={title} 
      size="sm" 
      showCloseButton={false}
      role="alertdialog"
      testId={testId}
    >
      <div className="wx-confirm-message">
        {typeof message === "string" ? message.replace(/\\n/g, "\n") : message}
      </div>
      <div className="wx-confirm-actions">
        <button 
          className="wx-confirm-btn wx-confirm-btn-cancel" 
          onClick={onCancel}
          aria-label={`${resolvedCancelLabel} action`}
        >
          {resolvedCancelLabel}
        </button>
        <button
          className={`wx-confirm-btn wx-confirm-btn-${variant}`}
          onClick={onConfirm}
          aria-label={`${resolvedConfirmLabel} action`}
        >
          {resolvedConfirmLabel}
        </button>
      </div>
    </Modal>
  );
}
