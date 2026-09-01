export default {
  purpose: "Display dashboard content in a contained, reusable panel with optional header and footer.",

  description: "A versatile dashboard card component that displays content with optional title, subtitle, icon, and toolbar. Supports loading, error, and empty states with configurable messages and retry functionality. Includes elevation and border styling variants and can be sized to fit grid layouts flexibly.",

  functionalAreas: [
    "Visualization",
    "Layout",
    "Feedback"
  ],

  userIntents: [
    "View dashboard metrics and data",
    "Interact with dashboard panels",
    "Monitor loading and error states",
    "Access widget-specific actions"
  ],

  exampleUseCases: [
    "Chart Display",
    "Metric Card",
    "Data Table",
    "Status Indicator",
    "Recent Activity",
    "KPI Display"
  ],

  useWhen: [
    "Use this component to display dashboard content in consistent containers.",
    "Use this component when widgets need loading, error, and empty states.",
    "Use this component when widget headers with titles and toolbars are needed.",
    "Use this component when widgets should have consistent styling and layout."
  ],

  avoidWhen: [
    "Avoid this component for simple inline content without panel presentation.",
    "Avoid this component when full-page content should not be constrained.",
    "Avoid this component without title or meaningful content to display.",
    "Avoid this component for content requiring custom container styling."
  ],

  relatedComponents: [
    "Dashboard",
    "Layout",
    "Widgets"
  ]
};
