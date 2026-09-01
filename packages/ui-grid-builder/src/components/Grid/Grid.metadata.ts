export default {
  purpose: "Build and configure responsive data grids with columns and rows.",

  description: "A comprehensive grid builder component that enables creating, configuring, and managing data grids. Supports column definition, sorting, filtering, pagination, and responsive layouts. Used for displaying tabular data in customizable formats.",

  functionalAreas: [
    "Data Entry",
    "Visualization",
    "Layout"
  ],

  userIntents: [
    "View data in table format",
    "Sort and filter data",
    "Navigate pages",
    "Configure columns"
  ],

  exampleUseCases: [
    "Data Table",
    "Results Table",
    "Admin Grid",
    "Inventory Table",
    "Report Grid",
    "Data Management",
    "Spreadsheet View"
  ],

  useWhen: [
    "Use this component to display and manage tabular data.",
    "Use this component when sorting and filtering are important.",
    "Use this component for large datasets with pagination.",
    "Use this component when column customization is needed."
  ],

  avoidWhen: [
    "Avoid this component for simple list display (use List instead).",
    "Avoid this component without proper data structure.",
    "Avoid this component on mobile without responsive design.",
    "Avoid this component for hierarchical data (use Tree instead)."
  ],

  relatedComponents: [
    "Table",
    "DataGrid",
    "Grid",
    "List"
  ]
};
