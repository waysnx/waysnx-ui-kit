/**
 * @file ChartWidget.tsx
 * Chart wrapper widget - provides widget infrastructure without chart library opinion
 */

import React, { ReactNode, CSSProperties } from "react";
import { Widget } from "../Widget/Widget";
import { ChartWidgetProps } from "../../types";

/**
 * Chart Widget Component
 *
 * Wrapper for chart components that adds widget infrastructure without
 * enforcing a specific chart library. Works with Recharts, Chart.js, ECharts,
 * ApexCharts, Nivo, Highcharts, or any custom chart implementation.
 *
 * @example
 * ```tsx
 * <ChartWidget
 *   id="sales-chart"
 *   title="Sales Trend"
 *   subtitle="Last 30 days"
 *   onRefresh={() => fetchChartData()}
 * >
 *   <BarChart data={data} />
 * </ChartWidget>
 * ```
 */
export const ChartWidget: React.FC<ChartWidgetProps> = ({
  id,
  title,
  subtitle,
  loading = false,
  error = null,
  onRefresh,
  onExport,
  onFullscreen,
  children,
  className = "",
  style,
}) => {
  return (
    <Widget
      id={id}
      title={title}
      subtitle={subtitle}
      loading={loading}
      error={error}
      toolbar={
        <div className="chart-widget-toolbar">
          {onRefresh && (
            <button
              className="chart-widget-button chart-widget-refresh"
              onClick={onRefresh}
              aria-label="Refresh chart"
              title="Refresh"
            >
              ↻
            </button>
          )}
          {onExport && (
            <button
              className="chart-widget-button chart-widget-export"
              onClick={onExport}
              aria-label="Export chart"
              title="Export"
            >
              ⬇
            </button>
          )}
          {onFullscreen && (
            <button
              className="chart-widget-button chart-widget-fullscreen"
              onClick={onFullscreen}
              aria-label="Fullscreen"
              title="Fullscreen"
            >
              ⛶
            </button>
          )}
        </div>
      }
      className={`chart-widget ${className}`}
      style={style}
    >
      <div className="chart-widget-content">{children}</div>
    </Widget>
  );
};

/**
 * Table Widget props
 */
interface TableWidgetProps {
  /**
   * Widget ID
   */
  id: string;

  /**
   * Widget title
   */
  title?: string;

  /**
   * Widget subtitle
   */
  subtitle?: string;

  /**
   * Table content
   */
  children: ReactNode;

  /**
   * Is widget loading
   */
  loading?: boolean;

  /**
   * Widget error
   */
  error?: Error | null;

  /**
   * Is table paginated
   */
  paginated?: boolean;

  /**
   * Current page
   */
  currentPage?: number;

  /**
   * Total pages
   */
  totalPages?: number;

  /**
   * On page change handler
   */
  onPageChange?: (page: number) => void;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional CSS styles
   */
  style?: CSSProperties;
}

/**
 * Table Widget Component
 *
 * Wrapper for table components that adds widget infrastructure.
 *
 * @example
 * ```tsx
 * <TableWidget
 *   id="users-table"
 *   title="Users"
 * >
 *   <DataGrid columns={columns} rows={rows} />
 * </TableWidget>
 * ```
 */
export const TableWidget: React.FC<TableWidgetProps> = ({
  id,
  title,
  subtitle,
  children,
  loading = false,
  error = null,
  paginated = false,
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  style,
}) => {
  return (
    <Widget
      id={id}
      title={title}
      subtitle={subtitle}
      loading={loading}
      error={error}
      footer={
        paginated && (
          <div className="table-widget-pagination">
            <button
              onClick={() => onPageChange?.(currentPage! - 1)}
              disabled={currentPage === 1}
            >
              ←
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange?.(currentPage! + 1)}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        )
      }
      className={`table-widget ${className}`}
      style={style}
    >
      <div className="table-widget-content">{children}</div>
    </Widget>
  );
};

/**
 * Form Widget props
 */
interface FormWidgetProps {
  /**
   * Widget ID
   */
  id: string;

  /**
   * Widget title
   */
  title?: string;

  /**
   * Widget subtitle
   */
  subtitle?: string;

  /**
   * Form content
   */
  children: ReactNode;

  /**
   * Is widget loading
   */
  loading?: boolean;

  /**
   * Widget error
   */
  error?: Error | null;

  /**
   * On submit handler
   */
  onSubmit?: (data: any) => void | Promise<void>;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional CSS styles
   */
  style?: CSSProperties;
}

/**
 * Form Widget Component
 *
 * Wrapper for form components that adds widget infrastructure.
 *
 * @example
 * ```tsx
 * <FormWidget
 *   id="settings-form"
 *   title="Settings"
 *   onSubmit={(data) => updateSettings(data)}
 * >
 *   <FormBuilder config={config} />
 * </FormWidget>
 * ```
 */
export const FormWidget: React.FC<FormWidgetProps> = ({
  id,
  title,
  subtitle,
  children,
  loading = false,
  error = null,
  onSubmit,
  className = "",
  style,
}) => {
  return (
    <Widget
      id={id}
      title={title}
      subtitle={subtitle}
      loading={loading}
      error={error}
      className={`form-widget ${className}`}
      style={style}
    >
      <form
        className="form-widget-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.({});
        }}
      >
        {children}
      </form>
    </Widget>
  );
};

ChartWidget.displayName = "ChartWidget";
TableWidget.displayName = "TableWidget";
FormWidget.displayName = "FormWidget";
