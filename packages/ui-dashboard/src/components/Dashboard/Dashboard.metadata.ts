export default {
  purpose: "Provide the main container and layout structure for dashboard applications.",

  description: "A comprehensive dashboard framework component that provides layout structure with optional header, sidebar, toolbar, and footer areas. Includes theme management through context and filter state persistence for dashboard-wide filter coordination. Provides semantic HTML structure with accessibility landmarks and skip links.",

  functionalAreas: [
    "Layout",
    "Visualization",
    "Navigation"
  ],

  userIntents: [
    "Access dashboard applications and data",
    "Navigate dashboard sections",
    "Change dashboard theme",
    "Filter and view analytics"
  ],

  exampleUseCases: [
    "Analytics Dashboard",
    "Business Intelligence Portal",
    "Admin Control Panel",
    "Sales Dashboard",
    "Monitoring Dashboard",
    "Reporting Interface"
  ],

  useWhen: [
    "Use this component as the root container for dashboard applications.",
    "Use this component when dashboard-wide features like themes and filters are needed.",
    "Use this component when consistent layout structure across dashboard pages is required.",
    "Use this component when accessibility landmarks and skip links are important."
  ],

  avoidWhen: [
    "Avoid this component for simple single-page layouts.",
    "Avoid this component when custom layout control takes precedence.",
    "Avoid this component without child components to populate sections.",
    "Avoid this component when dashboard features are not needed."
  ],

  relatedComponents: [
    "Widget",
    "Layout",
    "Filters"
  ]
};
