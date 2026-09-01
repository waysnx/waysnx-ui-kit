/**
 * @file components/Toolbar/Toolbar.tsx
 * Action toolbar for visualization — zoom controls, expand/collapse, export, filter.
 */

import React from 'react';
import { useTranslation } from '@waysnx/ui-i18n';

export type ToolbarPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface ToolbarAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  separator?: boolean;
}

export interface ToolbarProps {
  /** Toolbar position within the canvas */
  position?: ToolbarPosition;
  /** Custom actions to include */
  actions?: ToolbarAction[];
  /** Show zoom controls */
  showZoom?: boolean;
  /** Current zoom level (0–3) */
  zoom?: number;
  /** Zoom in handler */
  onZoomIn?: () => void;
  /** Zoom out handler */
  onZoomOut?: () => void;
  /** Fit to screen handler */
  onFitView?: () => void;
  /** Reset zoom handler */
  onResetZoom?: () => void;
  className?: string;
}

export function Toolbar({
  position = 'top-right',
  actions = [],
  showZoom = true,
  zoom = 1,
  onZoomIn,
  onZoomOut,
  onFitView,
  onResetZoom,
  className = '',
}: ToolbarProps) {
  const { t } = useTranslation();
  const zoomPercent = Math.round(zoom * 100);

  return (
    <div
      className={`wx-vis-toolbar wx-vis-toolbar--${position} ${className}`}
      role="toolbar"
      aria-label={t('visualization.toolbar.ariaLabel')}
    >
      {/* Zoom controls */}
      {showZoom && (
        <>
          <button
            className="wx-vis-toolbar__btn"
            onClick={onZoomOut}
            aria-label={t('visualization.toolbar.zoomOut')}
            type="button"
            title={t('visualization.toolbar.zoomOut')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 13H5v-2h14v2z" />
            </svg>
          </button>

          <span className="wx-vis-toolbar__zoom-label" aria-label={t('visualization.zoom.current', { zoom: zoomPercent })}>
            {zoomPercent}%
          </span>

          <button
            className="wx-vis-toolbar__btn"
            onClick={onZoomIn}
            aria-label={t('visualization.toolbar.zoomIn')}
            type="button"
            title={t('visualization.toolbar.zoomIn')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </button>

          {onFitView && (
            <button
              className="wx-vis-toolbar__btn"
              onClick={onFitView}
              aria-label={t('visualization.toolbar.fitView')}
              type="button"
              title={t('visualization.toolbar.fitView')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 3h7v2H5v5H3V3zm11 0h7v7h-2V5h-5V3zM3 14h2v5h5v2H3v-7zm16 5h-5v2h7v-7h-2v5z" />
              </svg>
            </button>
          )}

          {onResetZoom && (
            <button
              className="wx-vis-toolbar__btn"
              onClick={onResetZoom}
              aria-label={t('visualization.toolbar.resetZoom')}
              type="button"
              title={t('visualization.toolbar.resetZoom')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
              </svg>
            </button>
          )}
        </>
      )}

      {/* Custom actions */}
      {actions.map((action) => (
        <React.Fragment key={action.id}>
          {action.separator && <div className="wx-vis-toolbar__separator" aria-hidden="true" />}
          <button
            className="wx-vis-toolbar__btn"
            onClick={action.onClick}
            disabled={action.disabled}
            aria-label={action.label}
            type="button"
            title={action.label}
          >
            {action.icon}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Toolbar;
