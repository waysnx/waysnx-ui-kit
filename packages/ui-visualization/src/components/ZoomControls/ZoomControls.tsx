/**
 * @file components/ZoomControls/ZoomControls.tsx
 * Standalone zoom in/out/fit control buttons.
 */

import { useTranslation } from '@waysnx/ui-i18n';

export interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView?: () => void;
  onResetZoom?: () => void;
  className?: string;
}

export function ZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onFitView,
  onResetZoom,
  className = '',
}: ZoomControlsProps) {
  const { t } = useTranslation();
  const zoomPercent = Math.round(zoom * 100);

  return (
    <div
      className={`wx-vis-zoom-controls ${className}`}
      role="group"
      aria-label="Zoom controls"
    >
      <button
        className="wx-vis-zoom-controls__btn"
        onClick={onZoomIn}
        aria-label={t('visualization.zoom.zoomIn')}
        type="button"
        title={t('visualization.zoom.zoomIn')}
      >
        +
      </button>

      <div className="wx-vis-zoom-controls__separator" aria-hidden="true" />

      <span
        className="wx-vis-zoom-controls__label"
        aria-label={t('visualization.zoom.current', { zoom: zoomPercent })}
      >
        {zoomPercent}%
      </span>

      <div className="wx-vis-zoom-controls__separator" aria-hidden="true" />

      <button
        className="wx-vis-zoom-controls__btn"
        onClick={onZoomOut}
        aria-label={t('visualization.zoom.zoomOut')}
        type="button"
        title={t('visualization.zoom.zoomOut')}
      >
        −
      </button>

      {onFitView && (
        <>
          <div className="wx-vis-zoom-controls__separator" aria-hidden="true" />
          <button
            className="wx-vis-zoom-controls__btn"
            onClick={onFitView}
            aria-label={t('visualization.zoom.fitView')}
            type="button"
            title={t('visualization.zoom.fitView')}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 3h7v2H5v5H3V3zm11 0h7v7h-2V5h-5V3zM3 14h2v5h5v2H3v-7zm16 5h-5v2h7v-7h-2v5z" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export default ZoomControls;
