import React from 'react';
import { useTranslation } from '@waysnx/ui-i18n';
import type { GridAction } from '../../types';

interface GridSelectionBarProps {
  count: number;
  selectionActions?: GridAction[];
  selectedRows: Record<string, any>[];
  onClear: () => void;
}

export function GridSelectionBar({ count, selectionActions, selectedRows, onClear }: GridSelectionBarProps) {
  const { t } = useTranslation();
  if (count === 0) return null;

  return (
    <div className="wx-grid-selection-bar">
      <div className="wx-grid-selection-bar-left">
        <span className="wx-grid-selection-count">{t('grid.rowsSelected', { count })}</span>
        <button className="wx-grid-selection-clear" onClick={onClear}>{t('grid.clear')}</button>
      </div>
      {selectionActions && selectionActions.length > 0 && (
        <div className="wx-grid-selection-actions">
          {selectionActions.map((action, i) => (
            <button
              key={i}
              className={[
                'wx-grid-action-btn',
                action.variant === 'destructive' ? 'wx-grid-action-btn--destructive' : '',
                action.variant === 'primary' ? 'wx-grid-action-btn--primary' : '',
              ].join(' ').trim()}
              onClick={() => action.onClick(selectedRows as any)}
              title={action.label}
            >
              {action.icon && <span>{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
