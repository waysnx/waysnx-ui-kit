import React, { useRef, useEffect } from 'react';
import { useTranslation } from '@waysnx/ui-i18n';
import type { GridColumn } from '../../types';

interface GridToolbarProps {
  title?: string;
  totalCount: number;
  columns: GridColumn[];
  columnVisibility: Record<string, boolean>;
  onVisibilityChange: (key: string, visible: boolean) => void;
  showColumnToggle: boolean;
  showGlobalFilter?: boolean;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  toolbarActions?: React.ReactNode;
  colDropdownOpen: boolean;
  setColDropdownOpen: (open: boolean) => void;
}

export function GridToolbar({
  title,
  totalCount,
  columns,
  columnVisibility,
  onVisibilityChange,
  showColumnToggle,
  showGlobalFilter,
  globalFilter,
  onGlobalFilterChange,
  toolbarActions,
  colDropdownOpen,
  setColDropdownOpen,
}: GridToolbarProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setColDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [setColDropdownOpen]);

  return (
    <div className="wx-grid-toolbar">
      <div className="wx-grid-toolbar-left">
        {title && <span className="wx-grid-title">{title}</span>}
        {title && <span className="wx-grid-count">| {t('grid.totalRecords')} {totalCount}</span>}
      </div>
      {showGlobalFilter && (
        <div className="wx-grid-global-search">
          <input
            className="wx-grid-global-search-input"
            type="text"
            placeholder={t('grid.searchAllColumns')}
            value={globalFilter || ''}
            onChange={e => onGlobalFilterChange?.(e.target.value)}
          />
          {globalFilter && (
            <button
              className="wx-grid-global-search-clear"
              onClick={() => onGlobalFilterChange?.('')}
              title={t('grid.clearSearch')}
            >
              ✕
            </button>
          )}
        </div>
      )}
      <div className="wx-grid-toolbar-right">
        {toolbarActions}
        {showColumnToggle && (
          <div className="wx-grid-col-toggle" ref={dropdownRef}>
            <button
              className="wx-grid-col-toggle-btn"
              onClick={() => setColDropdownOpen(!colDropdownOpen)}
            >
              ☰ {t('grid.columns')}
            </button>
            {colDropdownOpen && (
              <div className="wx-grid-col-dropdown">
                <div className="wx-grid-col-dropdown-title">{t('grid.columns')}</div>
                {columns.map(col => (
                  <label key={col.key} className="wx-grid-col-item">
                    <input
                      type="checkbox"
                      checked={columnVisibility[col.key] !== false}
                      onChange={e => onVisibilityChange(col.key, e.target.checked)}
                    />
                    {col.title}
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
