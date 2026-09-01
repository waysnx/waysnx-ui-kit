export default {
  purpose: "Define the overall structure and layout of a page.",

  description: "A master layout component that coordinates multiple page-level components (header, content, sidebar) into a cohesive page structure. Provides consistent page organization with proper spacing and responsive adjustments. Simplifies creation of complex page layouts with header, footer, sidebar, and main content areas.",

  functionalAreas: [
    "Layout"
  ],

  userIntents: [
    "Create consistent page structure",
    "Organize page header, content, and sidebar",
    "Control overall page layout",
    "Maintain responsive page structure"
  ],

  exampleUseCases: [
    "Two-column Page Layout",
    "Three-column Dashboard",
    "Content with Sidebar",
    "Settings Page Layout",
    "Admin Dashboard",
    "Document Page Layout",
    "Multi-section Page"
  ],

  useWhen: [
    "Use this component as the top-level page structure.",
    "Use this component to organize header, content, and sidebar areas.",
    "Use this component for consistency across multiple pages.",
    "Use this component when the page needs responsive layout adjustments."
  ],

  avoidWhen: [
    "Avoid this component for simple single-column layouts (use Container instead).",
    "Avoid this component for modal or overlay content.",
    "Avoid this component without clear page-level sections.",
    "Avoid this component for non-page content like dialogs or popovers."
  ],

  relatedComponents: [
    "PageHeader",
    "PageContent",
    "PageTabs",
    "Container"
  ]
};
