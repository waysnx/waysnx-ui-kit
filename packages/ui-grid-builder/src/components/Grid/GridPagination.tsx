import React from 'react';
import { useTranslation } from '@waysnx/ui-i18n';

interface GridPaginationProps {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalFiltered: number;
  pageSizeOptions: number[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function GridPagination({
  pageIndex,
  pageSize,
  pageCount,
  totalFiltered,
  pageSizeOptions,
  canPreviousPage,
  canNextPage,
  onPageChange,
  onPageSizeChange,
}: GridPaginationProps) {
  const { t } = useTranslation();
  const from = totalFiltered === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalFiltered);

  const pageButtons = () => {
    const start = Math.max(0, Math.min(pageIndex - 2, pageCount - 5));
    return Array.from({ length: Math.min(pageCount, 5) }, (_, i) => start + i);
  };

  return (
    <div className="wx-grid-pagination">
      <div className="wx-grid-page-size">
        <span>{t('grid.rowsPerPage')}</span>
        <select value={pageSize} onChange={e => onPageSizeChange(Number(e.target.value))}>
          {pageSizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="wx-grid-pagination-info">
        {totalFiltered > 0 ? `${from}–${to} ${t('grid.of')} ${totalFiltered}` : t('grid.noRecords')}
      </div>
      <div className="wx-grid-pagination-controls">
        <button className="wx-grid-page-btn" onClick={() => onPageChange(0)} disabled={!canPreviousPage}>«</button>
        <button className="wx-grid-page-btn" onClick={() => onPageChange(pageIndex - 1)} disabled={!canPreviousPage}>‹</button>
        {pageButtons().map(p => (
          <button
            key={p}
            className={`wx-grid-page-btn ${p === pageIndex ? 'wx-grid-page-btn--active' : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p + 1}
          </button>
        ))}
        <button className="wx-grid-page-btn" onClick={() => onPageChange(pageIndex + 1)} disabled={!canNextPage}>›</button>
        <button className="wx-grid-page-btn" onClick={() => onPageChange(pageCount - 1)} disabled={!canNextPage}>»</button>
      </div>
    </div>
  );
}
