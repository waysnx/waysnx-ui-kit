import type { GridColumn, GridColumnType, GridSchema, GridSchemaProperty, GridConfig, GridActionDef } from './types';

/**
 * Infer GridColumnType from JSON Schema property type + format.
 */
function inferColumnType(prop: GridSchemaProperty): GridColumnType {
  if (prop['x-grid-type']) return prop['x-grid-type'];
  if (prop['x-currency-symbol']) return 'currency';
  if (prop.type === 'boolean') return 'boolean';
  if (prop.type === 'number' || prop.type === 'integer') return 'number';
  if (prop.type === 'string') {
    switch (prop.format) {
      case 'email': return 'email';
      case 'date':
      case 'date-time': return 'date';
      default: return 'text';
    }
  }
  return 'text';
}

/**
 * Convert a single schema property to a GridColumn.
 */
function propertyToColumn(key: string, prop: GridSchemaProperty): GridColumn {
  const type = inferColumnType(prop);
  const col: GridColumn = {
    key,
    title: prop.title || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
    type,
  };

  if (prop['x-grid-width']) col.width = prop['x-grid-width'];
  if (prop['x-grid-align']) col.align = prop['x-grid-align'];
  else if (type === 'currency' || type === 'number' || type === 'percentage') col.align = 'right';

  if (prop['x-grid-sortable'] !== undefined) col.sortable = prop['x-grid-sortable'];
  if (prop['x-grid-filterable'] !== undefined) col.filterable = prop['x-grid-filterable'];
  if (prop['x-grid-visible'] !== undefined) col.visible = prop['x-grid-visible'];
  if (prop['x-currency-symbol']) col.currencySymbol = prop['x-currency-symbol'];
  if (prop['x-currency-position']) col.currencyPosition = prop['x-currency-position'];
  if (prop['x-grid-decimals'] !== undefined) col.decimals = prop['x-grid-decimals'];
  if (prop['x-date-format']) col.dateFormat = prop['x-date-format'];
  else if (type === 'date' && !col.dateFormat) col.dateFormat = 'dd/MM/yyyy';
  if (prop['x-grid-badge-map']) col.badgeMap = prop['x-grid-badge-map'];

  return col;
}

/**
 * Convert a GridSchema (JSON Schema with x-grid-* extensions) into
 * { columns, gridProps, actionDefs } ready to spread into <Grid />.
 *
 * Supports both grouped format (x-grid-settings, x-grid-pagination, etc.)
 * and flat format (x-grid-title, x-grid-page-size, etc.) for backward compatibility.
 * Grouped values take priority over flat values.
 */
export function schemaToGridConfig(schema: GridSchema): GridConfig {
  const columns: GridColumn[] = Object.entries(schema.properties || {}).map(
    ([key, prop]) => propertyToColumn(key, prop)
  );

  // Read grouped settings
  const settings = schema['x-grid-settings'];
  const pagination = schema['x-grid-pagination'];
  const filters = schema['x-grid-filters'];
  const colGroup = schema['x-grid-columns'];
  const actionsGroup = schema['x-grid-actions'];
  const selection = schema['x-grid-selection'];

  // Build gridProps — grouped takes priority, flat as fallback
  const gridProps: GridConfig['gridProps'] = {};

  // Settings
  const title = settings?.title ?? schema['x-grid-title'];
  if (title) gridProps.title = title;
  const emptyMessage = settings?.emptyMessage ?? schema['x-grid-empty-message'];
  if (emptyMessage) gridProps.emptyMessage = emptyMessage;

  // Pagination
  const pageSize = pagination?.pageSize ?? schema['x-grid-page-size'];
  if (pageSize) gridProps.pageSize = pageSize;
  const pageSizeOptions = pagination?.pageSizeOptions ?? schema['x-grid-page-size-options'];
  if (pageSizeOptions) gridProps.pageSizeOptions = pageSizeOptions;
  const serverSideVal = pagination?.serverSide;
  if (serverSideVal !== undefined) gridProps.serverSide = serverSideVal;

  // Filters
  const showGlobalFilter = filters?.showGlobalFilter ?? schema['x-grid-show-global-filter'];
  if (showGlobalFilter !== undefined) gridProps.showGlobalFilter = showGlobalFilter;
  const showColumnFilter = filters?.showColumnFilter ?? schema['x-grid-show-column-filter'];
  if (showColumnFilter !== undefined) gridProps.showColumnFilter = showColumnFilter;

  // Columns
  const showColumnToggle = colGroup?.showColumnToggle ?? schema['x-grid-show-column-toggle'];
  if (showColumnToggle !== undefined) gridProps.showColumnToggle = showColumnToggle;

  // Actions
  const actionsAsMenu = actionsGroup?.actionsAsMenu ?? schema['x-grid-actions-as-menu'];
  if (actionsAsMenu !== undefined) gridProps.actionsAsMenu = actionsAsMenu;

  // Selection
  const selectionEnabled = selection?.enabled ?? schema['x-grid-show-row-selection'];
  if (selectionEnabled !== undefined) gridProps.showRowSelection = selectionEnabled;
  const selectionMode = selection?.mode ?? schema['x-grid-selection-mode'];
  if (selectionMode) gridProps.selectionMode = selectionMode;

  // Action definitions — grouped takes priority
  const actionDefs: GridActionDef[] = actionsGroup?.items ?? schema['x-grid-action-items'] ?? [];

  return { columns, gridProps, actionDefs };
}
