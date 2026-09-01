export default {
  purpose: "Create a layout with a sidebar and main content area.",

  description: "A specialized layout component that arranges a sidebar navigation or content area alongside the main content. Provides responsive adjustments for hiding or collapsing the sidebar on smaller screens. Commonly used for applications with persistent navigation or multi-column layouts.",

  functionalAreas: [
    "Layout",
    "Navigation"
  ],

  userIntents: [
    "See navigation sidebar alongside content",
    "Access secondary navigation",
    "Maintain navigation while browsing content",
    "Switch between sidebar and full-width on mobile"
  ],

  exampleUseCases: [
    "Application Layout",
    "Dashboard with Sidebar",
    "Documentation Site",
    "Admin Interface",
    "Settings with Sidebar",
    "News Site Layout",
    "CMS Layout"
  ],

  useWhen: [
    "Use this component for persistent sidebar navigation.",
    "Use this component in multi-panel layouts.",
    "Use this component when sidebar should remain visible during content navigation.",
    "Use this component for responsive layouts that collapse on mobile."
  ],

  avoidWhen: [
    "Avoid this component for simple two-column layouts (use Grid instead).",
    "Avoid this component when sidebar should not be persistent.",
    "Avoid this component for temporary sidebars (use Drawer instead).",
    "Avoid this component when main content should full-width."
  ],

  relatedComponents: [
    "Drawer",
    "PageLayout",
    "Grid",
    "Navigation"
  ]
};
