export default {
  purpose: "Provide dashboard-level filtering and search controls for narrowing displayed data.",

  description: "A filter bar component that displays search, select dropdowns, date range inputs, and other filter controls. Supports sticky positioning for persistent access and clear-all functionality to reset filters. Integrates with dashboard context for coordinated filter state management across widgets.",

  functionalAreas: [
    "Filtering",
    "Search",
    "Data Entry"
  ],

  userIntents: [
    "Filter dashboard data by criteria",
    "Search for specific items",
    "Apply date ranges",
    "Reset all filters at once"
  ],

  exampleUseCases: [
    "Status Filter",
    "Date Range Selection",
    "Search Products",
    "Filter by Department",
    "Apply Multiple Filters",
    "Quick Search Bar"
  ],

  useWhen: [
    "Use this component when dashboard needs top-level filtering controls.",
    "Use this component when filters should be sticky and always accessible.",
    "Use this component when multiple filter types are needed together.",
    "Use this component when clear-all functionality improves user experience."
  ],

  avoidWhen: [
    "Avoid this component when filtering is not needed.",
    "Avoid this component for widget-level filters (use component props instead).",
    "Avoid this component when filters should be hidden by default.",
    "Avoid this component for complex filtering requiring advanced UI."
  ],

  relatedComponents: [
    "Dashboard",
    "Select",
    "Input"
  ]
};
