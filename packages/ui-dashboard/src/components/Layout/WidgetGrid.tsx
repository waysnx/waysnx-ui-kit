/**
 * @file WidgetGrid.tsx
 * Responsive grid layout for widgets
 */

import React, { ReactNode, CSSProperties, useId } from "react";

/**
 * Widget grid props
 */
interface WidgetGridProps {
  /**
   * Grid content
   */
  children?: ReactNode;

  /**
   * Number of columns on different breakpoints
   */
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };

  /**
   * Gap between items
   */
  gap?: number | string;

  /**
   * Auto-fit columns
   */
  autoFit?: boolean;

  /**
   * Minimum widget width for auto-fit
   */
  minWidth?: number | string;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional CSS styles
   */
  style?: CSSProperties;
}

// Breakpoint values (min-width)
const BREAKPOINTS = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
};

/**
 * Widget Grid Component
 *
 * Responsive grid layout for arranging widgets.
 *
 * @example
 * ```tsx
 * <WidgetGrid
 *   columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
 *   gap={16}
 * >
 *   <Widget>...</Widget>
 *   <Widget>...</Widget>
 * </WidgetGrid>
 * ```
 */
export const WidgetGrid: React.FC<WidgetGridProps> = ({
  children,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 16,
  autoFit = false,
  minWidth = 300,
  className = "",
  style,
}) => {
  const uniqueId = useId().replace(/:/g, "");
  const gridClass = `wx-dash-grid-${uniqueId}`;

  const getGridStyle = (): CSSProperties => {
    if (autoFit) {
      return {
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${typeof minWidth === "number" ? `${minWidth}px` : minWidth}, 1fr))`,
        gap,
        ...style,
      };
    }
    // For responsive mode, use xs as the base (mobile-first)
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${columns.xs || 1}, 1fr)`,
      gap,
      ...style,
    };
  };

  const getResponsiveStyles = (): string => {
    if (autoFit) return "";

    let css = "";

    if (columns.sm) {
      css += `@media(min-width:${BREAKPOINTS.sm}px){.${gridClass}{grid-template-columns:repeat(${columns.sm},1fr)}}`;
    }
    if (columns.md) {
      css += `@media(min-width:${BREAKPOINTS.md}px){.${gridClass}{grid-template-columns:repeat(${columns.md},1fr)}}`;
    }
    if (columns.lg) {
      css += `@media(min-width:${BREAKPOINTS.lg}px){.${gridClass}{grid-template-columns:repeat(${columns.lg},1fr)}}`;
    }
    if (columns.xl) {
      css += `@media(min-width:${BREAKPOINTS.xl}px){.${gridClass}{grid-template-columns:repeat(${columns.xl},1fr)}}`;
    }

    return css;
  };

  const responsiveCss = getResponsiveStyles();

  return (
    <>
      {responsiveCss && <style>{responsiveCss}</style>}
      <div
        className={`widget-grid ${gridClass} ${className}`}
        style={getGridStyle()}
        role="region"
        aria-label="Widget grid"
      >
        {children}
      </div>
    </>
  );
};

/**
 * Widget row props
 */
interface WidgetRowProps {
  /**
   * Row content
   */
  children?: ReactNode;

  /**
   * Gap between items
   */
  gap?: number | string;

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
 * Widget Row Component
 *
 * Horizontal container for widgets.
 *
 * @example
 * ```tsx
 * <WidgetRow gap={16}>
 *   <Widget>...</Widget>
 *   <Widget>...</Widget>
 * </WidgetRow>
 * ```
 */
export const WidgetRow: React.FC<WidgetRowProps> = ({
  children,
  gap = 16,
  className = "",
  style,
}) => {
  return (
    <div
      className={`widget-row ${className}`}
      style={{
        display: "flex",
        flexDirection: "row",
        gap,
        ...style,
      }}
      role="region"
      aria-label="Widget row"
    >
      {children}
    </div>
  );
};

/**
 * Widget column props
 */
interface WidgetColumnProps {
  /**
   * Column content
   */
  children?: ReactNode;

  /**
   * Column flex basis (used in flex layouts)
   */
  flex?: string | number;

  /**
   * Grid column span (1-12). Used when inside a CSS Grid parent.
   * Takes precedence over flex when provided.
   * @example span={4} → occupies 4 of 12 columns (33%)
   */
  span?: number;

  /**
   * Gap between items
   */
  gap?: number | string;

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
 * Widget Column Component
 *
 * Vertical container for widgets.
 *
 * @example
 * ```tsx
 * // Flex-based (equal columns)
 * <WidgetColumn flex={1} gap={16}>
 *   <Widget>...</Widget>
 * </WidgetColumn>
 *
 * // Grid-based (12-column system)
 * <WidgetColumn span={4} gap={16}>
 *   <Widget>...</Widget>
 * </WidgetColumn>
 * ```
 */
export const WidgetColumn: React.FC<WidgetColumnProps> = ({
  children,
  flex = 1,
  span,
  gap = 16,
  className = "",
  style,
}) => {
  return (
    <div
      className={`widget-column ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        ...(span ? { gridColumn: `span ${span}` } : { flex }),
        gap,
        ...style,
      }}
      role="region"
      aria-label="Widget column"
    >
      {children}
    </div>
  );
};

/**
 * Widget container props
 */
interface WidgetContainerProps {
  /**
   * Container content
   */
  children?: ReactNode;

  /**
   * Container width
   */
  width?: number | string;

  /**
   * Container height
   */
  height?: number | string;

  /**
   * Container flex
   */
  flex?: string | number;

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
 * Widget Container Component
 *
 * Generic container for widgets.
 *
 * @example
 * ```tsx
 * <WidgetContainer flex={1} height={400}>
 *   <Widget>...</Widget>
 * </WidgetContainer>
 * ```
 */
export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  children,
  width,
  height,
  flex,
  className = "",
  style,
}) => {
  return (
    <div
      className={`widget-container ${className}`}
      style={{
        width,
        height,
        flex,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

WidgetGrid.displayName = "WidgetGrid";
WidgetRow.displayName = "WidgetRow";
WidgetColumn.displayName = "WidgetColumn";
WidgetContainer.displayName = "WidgetContainer";
