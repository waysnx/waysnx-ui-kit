/**
 * @file useWidget.ts
 * Hook for widget-specific operations
 */

import { useCallback } from "react";
import { useDashboard } from "./useDashboard";
import { WidgetConfig } from "../types";

/**
 * Hook for widget operations
 *
 * @param widgetId - ID of the widget
 * @returns Widget state and methods
 *
 * @example
 * ```tsx
 * const { widget, updateWidget, removeWidget } = useWidget('widget-1');
 * ```
 */
export const useWidget = (widgetId: string) => {
  const { widgets, setWidgets, selectedWidget, setSelectedWidget } = useDashboard();

  const widget = widgets[widgetId];

  const updateWidget = useCallback(
    (updates: Partial<WidgetConfig>) => {
      setWidgets({
        ...widgets,
        [widgetId]: {
          ...widget,
          ...updates,
        },
      });
    },
    [widgetId, widget, setWidgets, widgets]
  );

  const removeWidget = useCallback(() => {
    const { [widgetId]: removed, ...remaining } = widgets;
    setWidgets(remaining);
    if (selectedWidget === widgetId) {
      setSelectedWidget(undefined);
    }
  }, [widgetId, widgets, setWidgets, selectedWidget, setSelectedWidget]);

  const duplicateWidget = useCallback(() => {
    if (!widget) return;

    const newId = `${widgetId}-copy-${Date.now()}`;
    setWidgets({
      ...widgets,
      [newId]: {
        ...widget,
        id: newId,
      },
    });
  }, [widget, widgetId, widgets, setWidgets]);

  const toggleCollapse = useCallback(() => {
    updateWidget({
      collapsible: !widget?.collapsible,
    });
  }, [widget?.collapsible, updateWidget]);

  const select = useCallback(() => {
    setSelectedWidget(widgetId);
  }, [widgetId, setSelectedWidget]);

  const deselect = useCallback(() => {
    if (selectedWidget === widgetId) {
      setSelectedWidget(undefined);
    }
  }, [widgetId, selectedWidget, setSelectedWidget]);

  const isSelected = selectedWidget === widgetId;

  return {
    widget,
    isSelected,
    updateWidget,
    removeWidget,
    duplicateWidget,
    toggleCollapse,
    select,
    deselect,
  };
};
