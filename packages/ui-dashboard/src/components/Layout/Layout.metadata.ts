export default {
  purpose: "Arrange dashboard widgets in responsive grid and flexbox layouts.",

  description: "Layout components (WidgetGrid, WidgetRow, WidgetColumn, WidgetContainer) that arrange dashboard content responsively. WidgetGrid provides breakpoint-based column configuration, while Row and Column components handle flexbox layouts. Auto-fit mode enables responsive column counts based on container width.",

  functionalAreas: [
    "Layout",
    "Visualization"
  ],

  userIntents: [
    "Organize dashboard content spatially",
    "Create responsive dashboard layouts",
    "Arrange widgets efficiently",
    "Control widget spacing and sizing"
  ],

  exampleUseCases: [
    "Multi-Column Dashboard",
    "Responsive Widget Grid",
    "Side-by-Side Comparisons",
    "Horizontal Widget Layout",
    "Nested Layout Structure",
    "Adaptive Dashboard"
  ],

  useWhen: [
    "Use this component to arrange dashboard widgets in responsive grids.",
    "Use this component when breakpoint-based layouts improve mobile experience.",
    "Use this component when auto-fit column layout enhances responsiveness.",
    "Use this component when consistent widget spacing is important."
  ],

  avoidWhen: [
    "Avoid this component for simple single-column layouts.",
    "Avoid this component without dashboard context provider.",
    "Avoid this component for absolute positioned layouts.",
    "Avoid this component when CSS Grid direct control is needed."
  ],

  relatedComponents: [
    "Dashboard",
    "Widget",
    "Widgets"
  ]
};
