import React from 'react';

export type GridColumnType =
  | 'text'
  | 'number'
  | 'currency'
  | 'percentage'
  | 'email'
  | 'date'
  | 'boolean'
  | 'badge'
  | 'image'
  | 'custom';

export interface GridColumn {
  key: string;
  title: string;
  type?: GridColumnType;
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
  dateFormat?: string;
  /** Currency symbol e.g. '$', '€', '£' (used with type: 'currency') */
  currencySymbol?: string;
  /** Currency symbol position (default: 'start') */
  currencyPosition?: 'start' | 'end';
  /** Decimal places for currency or percentage (default: 2 for currency, 1 for percentage) */
  decimals?: number;
  /** Text alignment (default: 'left') */
  align?: 'left' | 'center' | 'right';
  /**
   * Badge color map for type: 'badge'.
   * Key is the cell value, value defines label, text color, and background color.
   * @example
   * badgeMap: {
   *   active:   { label: 'Active',   color: '#166534', bg: '#dcfce7' },
   *   inactive: { label: 'Inactive', color: '#991b1b', bg: '#fee2e2' },
   *   pending:  { label: 'Pending',  color: '#92400e', bg: '#fef3c7' },
   * }
   */
  badgeMap?: Record<string, { label?: string; color: string; bg: string }>;
}

export interface GridAction {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: Record<string, any>) => void;
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  hidden?: (row: Record<string, any>) => boolean;
}

export interface GridProps {
  title?: string;
  data: Record<string, any>[];
  columns: GridColumn[];
  pageSize?: number;
  pageSizeOptions?: number[];
  actions?: GridAction[];
  loading?: boolean;
  emptyMessage?: string;
  showColumnToggle?: boolean;
  /** Show column filter icons in header (default: true) */
  showColumnFilter?: boolean;
  /** Show global search box in toolbar that filters all columns (default: false) */
  showGlobalFilter?: boolean;
  /** Show actions as a kebab (⋮) dropdown menu instead of inline buttons (default: true) */
  actionsAsMenu?: boolean;
  /** Show row selection checkboxes or radio buttons (default: false) */
  showRowSelection?: boolean;
  /** Selection mode — checkbox (multi) or radio (single) (default: 'checkbox') */
  selectionMode?: 'checkbox' | 'radio';
  /** Actions shown in the selection bar when rows are selected */
  selectionActions?: GridAction[];
  /** Called when row selection changes — receives array of selected row data */
  onSelectionChange?: (selectedRows: Record<string, any>[]) => void;
  toolbarActions?: React.ReactNode;
  onRowClick?: (row: Record<string, any>) => void;
  className?: string;
  /** Enable server-side pagination (default: false). When true, data should contain only the current page's rows. */
  serverSide?: boolean;
  /** Total record count across all pages (required when serverSide is true) */
  totalCount?: number;
  /** Called when page or page size changes in server-side mode */
  onPageFetch?: (params: { pageIndex: number; pageSize: number }) => void;
  /** Table layout algorithm: 'auto' (default, browser decides) or 'fixed' (strict widths, supports %, even distribution) */
  tableLayout?: 'auto' | 'fixed';
  /** Custom title for the auto-generated row actions column. Overrides the i18n default (`grid.actions` → "Actions"). */
  actionsColumnTitle?: string;
  /** Test ID for targeting the root element in tests */
  testId?: string;
}

// ── Schema-to-Grid types ──

export interface GridSchemaProperty {
  type: string;
  title?: string;
  format?: string;
  enum?: string[];
  'x-enum-labels'?: string[];
  // Grid column overrides
  'x-grid-type'?: GridColumnType;
  'x-grid-width'?: string;
  'x-grid-align'?: 'left' | 'center' | 'right';
  'x-grid-sortable'?: boolean;
  'x-grid-filterable'?: boolean;
  'x-grid-visible'?: boolean;
  'x-grid-decimals'?: number;
  'x-grid-badge-map'?: Record<string, { label?: string; color: string; bg: string }>;
  // Reuse existing x- extensions
  'x-currency-symbol'?: string;
  'x-currency-position'?: 'start' | 'end';
  'x-date-format'?: string;
}

export interface GridActionDef {
  name: string;
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
}

/** Grouped grid settings */
export interface GridSettingsGroup {
  title?: string;
  emptyMessage?: string;
}

export interface GridPaginationGroup {
  pageSize?: number;
  pageSizeOptions?: number[];
  serverSide?: boolean;
}

export interface GridFiltersGroup {
  showGlobalFilter?: boolean;
  showColumnFilter?: boolean;
}

export interface GridColumnsGroup {
  showColumnToggle?: boolean;
}

export interface GridActionsGroup {
  actionsAsMenu?: boolean;
  items?: GridActionDef[];
}

export interface GridSelectionGroup {
  enabled?: boolean;
  mode?: 'checkbox' | 'radio';
}

export interface GridSchema {
  type: 'object';
  properties: Record<string, GridSchemaProperty>;

  // Grouped settings (recommended)
  'x-grid-settings'?: GridSettingsGroup;
  'x-grid-pagination'?: GridPaginationGroup;
  'x-grid-filters'?: GridFiltersGroup;
  'x-grid-columns'?: GridColumnsGroup;
  'x-grid-actions'?: GridActionsGroup;
  'x-grid-selection'?: GridSelectionGroup;

  // Flat settings (backward compatible)
  'x-grid-title'?: string;
  'x-grid-page-size'?: number;
  'x-grid-page-size-options'?: number[];
  'x-grid-show-global-filter'?: boolean;
  'x-grid-show-column-toggle'?: boolean;
  'x-grid-show-column-filter'?: boolean;
  'x-grid-actions-as-menu'?: boolean;
  'x-grid-show-row-selection'?: boolean;
  'x-grid-selection-mode'?: 'checkbox' | 'radio';
  'x-grid-empty-message'?: string;
  /** @deprecated Use x-grid-actions.items instead */
  'x-grid-action-items'?: GridActionDef[];
}

export interface GridConfig {
  columns: GridColumn[];
  gridProps: Omit<GridProps, 'data' | 'columns' | 'actions' | 'selectionActions' | 'toolbarActions' | 'onRowClick' | 'onSelectionChange'>;
  actionDefs: GridActionDef[];
}
