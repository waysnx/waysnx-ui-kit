import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  FilterFn,
  RowSelectionState,
} from '@tanstack/react-table';import { useTranslation } from '@waysnx/ui-i18n';
import type { GridProps } from '../../types';
import { GridCell } from './GridCell';
import { GridActions } from './GridActions';
import { GridToolbar } from './GridToolbar';
import { GridPagination } from './GridPagination';
import { GridSelectionBar } from './GridSelectionBar';
import './Grid.css';

type FilterOperator = 'contains' | 'equals' | 'startsWith' | 'endsWith';

const operatorLabels: Record<FilterOperator, string> = {
  contains: 'Contains',
  equals: 'Equals',
  startsWith: 'Starts with',
  endsWith: 'Ends with',
};

interface FilterState {
  operator: FilterOperator;
  value: string;
}

// Custom filter function that respects operator
const customFilterFn: FilterFn<any> = (row, columnId, filterValue: FilterState) => {
  if (!filterValue?.value) return true;
  const cellValue = String(row.getValue(columnId) ?? '').toLowerCase();
  const search = filterValue.value.toLowerCase();
  switch (filterValue.operator) {
    case 'equals': return cellValue === search;
    case 'startsWith': return cellValue.startsWith(search);
    case 'endsWith': return cellValue.endsWith(search);
    default: return cellValue.includes(search);
  }
};
customFilterFn.autoRemove = (val: FilterState) => !val?.value;

function FilterDropdown({
  columnId,
  filterState,
  onFilterChange,
  onClose,
}: {
  columnId: string;
  filterState: FilterState;
  onFilterChange: (state: FilterState) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div className="wx-grid-filter-dropdown" ref={ref} onClick={e => e.stopPropagation()}>
      <select
        className="wx-grid-filter-operator"
        value={filterState.operator}
        onChange={e => onFilterChange({ ...filterState, operator: e.target.value as FilterOperator })}
      >
        {(Object.keys(operatorLabels) as FilterOperator[]).map(op => (
          <option key={op} value={op}>{operatorLabels[op]}</option>
        ))}
      </select>
      <input
        ref={inputRef}
        className="wx-grid-filter-popup-input"
        placeholder="Filter..."
        value={filterState.value}
        onChange={e => onFilterChange({ ...filterState, value: e.target.value })}
      />
      <div className="wx-grid-filter-actions">
        <button
          className="wx-grid-filter-clear-btn"
          onClick={() => { onFilterChange({ operator: 'contains', value: '' }); onClose(); }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export function Grid({
  title,
  data,
  columns: colDefs,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  actions,
  loading = false,
  emptyMessage = 'No records found',
  showColumnToggle = true,
  showColumnFilter = true,
  showGlobalFilter = false,
  actionsAsMenu = true,
  showRowSelection = false,
  selectionMode = 'checkbox',
  selectionActions,
  onSelectionChange,
  toolbarActions,
  onRowClick,
  className,
  serverSide = false,
  totalCount,
  onPageFetch,
  tableLayout = 'auto',
  actionsColumnTitle,
  testId,
}: GridProps) {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    const vis: VisibilityState = {};
    colDefs.forEach(c => { if (c.visible === false) vis[c.key] = false; });
    return vis;
  });
  const [colDropdownOpen, setColDropdownOpen] = useState(false);
  const [openFilterCol, setOpenFilterCol] = useState<string | null>(null);
  const [filterStates, setFilterStates] = useState<Record<string, FilterState>>({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Server-side pagination state
  const [ssPageIndex, setSsPageIndex] = useState(0);
  const [ssPageSize, setSsPageSize] = useState(initialPageSize);

  const getFilterState = (colId: string): FilterState =>
    filterStates[colId] || { operator: 'contains', value: '' };

  const handleFilterChange = (colId: string, state: FilterState, setFilterValue: (v: any) => void) => {
    setFilterStates(prev => ({ ...prev, [colId]: state }));
    setFilterValue(state.value ? state : undefined);
  };

  const tableColumns = useMemo(() => {
    const cols: any[] = [];

    // Selection column
    if (showRowSelection) {
      cols.push({
        id: '__selection',
        accessorKey: '__selection',
        header: ({ table }: any) => selectionMode === 'checkbox' ? (
          <input
            type="checkbox"
            className="wx-grid-row-checkbox"
            checked={table.getIsAllPageRowsSelected()}
            ref={el => { if (el) el.indeterminate = table.getIsSomePageRowsSelected(); }}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            onClick={e => e.stopPropagation()}
          />
        ) : null,
        size: 40,
        enableSorting: false,
        enableColumnFilter: false,
        filterFn: customFilterFn,
        meta: { align: 'center' as const },
        cell: ({ row }: any) => (
          <input
            type={selectionMode}
            className="wx-grid-row-checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            onClick={e => e.stopPropagation()}
          />
        ),
      });
    }

    const dataCols = colDefs.map(col => ({
      id: col.key,
      accessorKey: col.key,
      header: col.title,
      size: undefined,
      enableSorting: col.sortable !== false,
      enableColumnFilter: col.filterable !== false,
      filterFn: customFilterFn,
      meta: { align: col.align || 'left', cssWidth: col.width },
      cell: ({ getValue, row }: any) => (
        <GridCell value={getValue()} col={col} row={row.original} />
      ),
    }));
    cols.push(...dataCols);

    if (actions && actions.length > 0) {
      cols.push({
        id: '__actions',
        accessorKey: '__actions',
        header: actionsColumnTitle ?? t('grid.actions'),
        size: undefined,
        enableSorting: false,
        enableColumnFilter: false,
        filterFn: customFilterFn,
        meta: { align: 'left' as const },
        cell: ({ row }: any) => <GridActions row={row.original} actions={actions} asMenu={actionsAsMenu} />,
      });
    }
    return cols;
  }, [colDefs, actions, showRowSelection, selectionMode, actionsAsMenu, actionsColumnTitle, t]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: { sorting, columnFilters, columnVisibility, globalFilter, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: (updater) => {
      setRowSelection(updater);
    },
    enableRowSelection: showRowSelection,
    enableMultiRowSelection: selectionMode === 'checkbox',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // In server-side mode, skip client-side pagination — data is already one page
    ...(serverSide ? {} : { getPaginationRowModel: getPaginationRowModel() }),
    ...(serverSide ? { manualPagination: true, pageCount: Math.ceil((totalCount || 0) / ssPageSize) } : {}),
    initialState: { pagination: { pageSize: initialPageSize } },
  });

  // Pagination values — server-side uses local state, client-side uses table state
  const pageIndex = serverSide ? ssPageIndex : table.getState().pagination.pageIndex;
  const pageSize = serverSide ? ssPageSize : table.getState().pagination.pageSize;
  const totalFiltered = serverSide ? (totalCount || 0) : table.getFilteredRowModel().rows.length;
  const pageCount = serverSide ? Math.ceil((totalCount || 0) / ssPageSize) : table.getPageCount();
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageCount - 1;

  const handlePageChange = (newPageIndex: number) => {
    if (serverSide) {
      setSsPageIndex(newPageIndex);
      onPageFetch?.({ pageIndex: newPageIndex, pageSize: ssPageSize });
    } else {
      table.setPageIndex(newPageIndex);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (serverSide) {
      setSsPageSize(newPageSize);
      setSsPageIndex(0);
      onPageFetch?.({ pageIndex: 0, pageSize: newPageSize });
    } else {
      table.setPageSize(newPageSize);
    }
  };

  const selectedRows = table.getSelectedRowModel().rows.map(r => r.original);
  const selectedCount = selectedRows.length;

  // Notify parent when selection changes
  React.useEffect(() => {
    onSelectionChange?.(selectedRows);
  }, [rowSelection]);

  return (
    <div className={`wx-grid-wrapper ${className || ''}`} data-testid={testId}>
      <GridToolbar
        title={title}
        totalCount={totalFiltered}
        columns={colDefs}
        columnVisibility={columnVisibility as Record<string, boolean>}
        onVisibilityChange={(key, visible) =>
          setColumnVisibility(prev => ({ ...prev, [key]: visible }))
        }
        showColumnToggle={showColumnToggle}
        showGlobalFilter={showGlobalFilter}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        toolbarActions={toolbarActions}
        colDropdownOpen={colDropdownOpen}
        setColDropdownOpen={setColDropdownOpen}
      />

      {showRowSelection && selectedCount > 0 && (
        <GridSelectionBar
          count={selectedCount}
          selectionActions={selectionActions}
          selectedRows={selectedRows}
          onClear={() => setRowSelection({})}
        />
      )}

      <div className="wx-grid-table-wrapper">
        <table className="wx-grid-table" style={{ tableLayout }}>
          <thead className="wx-grid-thead">
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(header => {
                  const isFiltered = !!getFilterState(header.id).value;
                  const isFilterOpen = openFilterCol === header.id;
                  return (
                    <th
                      key={header.id}
                      className={`wx-grid-th ${header.column.getCanSort() ? 'wx-grid-th-sortable' : ''}`}
                      style={{
                        width: (header.column.columnDef.meta as any)?.cssWidth || undefined,
                        textAlign: (header.column.columnDef.meta as any)?.align || 'left',
                        position: 'relative',
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="wx-grid-th-inner">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="wx-grid-sort-icon">
                            {header.column.getIsSorted() === 'asc' ? '▲'
                              : header.column.getIsSorted() === 'desc' ? '▼' : '⇅'}
                          </span>
                        )}
                        {header.column.getCanFilter() && showColumnFilter && (
                          <button
                            className={`wx-grid-filter-icon-btn ${isFiltered ? 'wx-grid-filter-icon-btn--active' : ''}`}
                            onClick={e => {
                              e.stopPropagation();
                              setOpenFilterCol(isFilterOpen ? null : header.id);
                            }}
                            title="Filter"
                          >
                            ▽
                          </button>
                        )}
                      </div>
                      {isFilterOpen && showColumnFilter && (
                        <FilterDropdown
                          columnId={header.id}
                          filterState={getFilterState(header.id)}
                          onFilterChange={state =>
                            handleFilterChange(header.id, state, header.column.setFilterValue)
                          }
                          onClose={() => setOpenFilterCol(null)}
                        />
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="wx-grid-tbody">
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i} className="wx-grid-skeleton-row">
                  {tableColumns.map((_, j) => (
                    <td key={j}><div className="wx-grid-skeleton-cell" /></td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={tableColumns.length} className="wx-grid-empty">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className={[
                    onRowClick ? 'wx-grid-row-clickable' : '',
                    row.getIsSelected() ? 'wx-grid-row-selected' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="wx-grid-td"
                      style={{ textAlign: (cell.column.columnDef.meta as any)?.align || 'left' }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <GridPagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={pageCount}
        totalFiltered={totalFiltered}
        pageSizeOptions={pageSizeOptions}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
