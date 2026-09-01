/**
 * @file Widget.tsx
 * Main widget component
 */

import React, { ReactNode, CSSProperties } from "react";
import { useTranslation } from "@waysnx/ui-i18n";
import { WidgetVariant, WidgetElevation } from "../../types";

/**
 * Widget props
 */
export interface WidgetProps {
  id?: string;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  toolbar?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  error?: Error | null;
  empty?: boolean | ReactNode;
  children?: ReactNode;
  height?: number | string;
  width?: number | string;
  variant?: WidgetVariant;
  elevation?: WidgetElevation;
  bordered?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Widget Component
 *
 * Reusable dashboard panel that can display various types of content.
 */
export const Widget: React.FC<WidgetProps> = ({
  id: _id,
  title,
  subtitle,
  icon,
  toolbar,
  footer,
  loading = false,
  error = null,
  empty = false,
  children,
  height,
  width,
  variant = "default",
  elevation = 1,
  bordered = false,
  className = "",
  style,
}) => {
  const showEmpty = empty && !children && !loading && !error;

  return (
    <div
      className={`widget widget-${variant} ${
        elevation ? `widget-elevation-${elevation}` : ""
      } ${bordered ? "widget-bordered" : ""} ${className}`}
      style={{ height, width, ...style }}
      role="region"
      aria-label={title}
    >
      {(title || toolbar) && (
        <div className="widget-header">
          {(title || subtitle || icon) && (
            <div className="widget-header-title">
              {icon && <span className="widget-header-icon">{icon}</span>}
              <div className="widget-header-text">
                {title && <h3 className="widget-title">{title}</h3>}
                {subtitle && <p className="widget-subtitle">{subtitle}</p>}
              </div>
            </div>
          )}
          {toolbar && <div className="widget-toolbar">{toolbar}</div>}
        </div>
      )}

      <div className="widget-body">
        {loading && <WidgetLoading />}
        {error && <WidgetError error={error} />}
        {showEmpty && <WidgetEmpty />}
        {!loading && !error && !showEmpty && children}
      </div>

      {footer && <div className="widget-footer">{footer}</div>}
    </div>
  );
};

/**
 * Widget Loading State
 */
export const WidgetLoading: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="widget-loading" role="status" aria-label={t('dashboard.loading')}>
      <div className="widget-state-icon">⏳</div>
      <div className="widget-state-title">{t('dashboard.loading')}</div>
      <div className="widget-state-message">{t('dashboard.loadingMessage')}</div>
    </div>
  );
};

/**
 * Widget Empty State
 */
export const WidgetEmpty: React.FC<{ message?: string }> = ({ message }) => {
  const { t } = useTranslation();
  return (
    <div className="widget-empty" role="status" aria-label={t('dashboard.empty')}>
      <div className="widget-state-icon">📭</div>
      <div className="widget-state-title">{t('dashboard.empty')}</div>
      <div className="widget-state-message">{message || t('dashboard.emptyMessage')}</div>
    </div>
  );
};

/**
 * Widget Error State
 */
export const WidgetError: React.FC<{ error: Error | null; retry?: () => void }> = ({
  error,
  retry,
}) => {
  const { t } = useTranslation();
  return (
    <div className="widget-error" role="alert">
      <div className="widget-state-icon">⚠️</div>
      <div className="widget-state-title">{t('dashboard.error')}</div>
      <div className="widget-state-message">
        {error?.message || t('dashboard.errorMessage')}
      </div>
      {retry && (
        <button onClick={retry} className="widget-error-retry">
          {t('dashboard.tryAgain')}
        </button>
      )}
    </div>
  );
};

/**
 * Widget Offline State
 */
export const WidgetOffline: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="widget-offline" role="alert">
      <div className="widget-state-icon">📡</div>
      <div className="widget-state-title">{t('dashboard.offline')}</div>
      <div className="widget-state-message">{t('dashboard.offlineMessage')}</div>
    </div>
  );
};

/**
 * Widget Permission Denied State
 */
export const WidgetPermissionDenied: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="widget-permission-denied" role="alert">
      <div className="widget-state-icon">🔒</div>
      <div className="widget-state-title">{t('dashboard.permissionDenied')}</div>
      <div className="widget-state-message">{t('dashboard.permissionDeniedMessage')}</div>
    </div>
  );
};

Widget.displayName = "Widget";
WidgetLoading.displayName = "WidgetLoading";
WidgetEmpty.displayName = "WidgetEmpty";
WidgetError.displayName = "WidgetError";
WidgetOffline.displayName = "WidgetOffline";
WidgetPermissionDenied.displayName = "WidgetPermissionDenied";
