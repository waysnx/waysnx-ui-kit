export default {
  purpose: "Display header information and controls at the top of a page.",

  description: "A specialized header component positioned at the top of a page, typically containing the page title, description, and primary action buttons. Coordinates with other page layout components to provide a cohesive page structure. Often includes breadcrumbs, navigation, and contextual information.",

  functionalAreas: [
    "Layout",
    "Navigation"
  ],

  userIntents: [
    "Know the page title",
    "See page description or context",
    "Access primary actions",
    "Navigate back or to related pages"
  ],

  exampleUseCases: [
    "Page Title Header",
    "Toolbar with Actions",
    "Header with Breadcrumbs",
    "Section Header",
    "Content Page Header",
    "Dashboard Header",
    "List Page Header"
  ],

  useWhen: [
    "Use this component at the top of pages for title and key information.",
    "Use this component in combination with PageContent and page layouts.",
    "Use this component when you need a dedicated header with actions.",
    "Use this component to provide context and navigation aids."
  ],

  avoidWhen: [
    "Avoid this component in simple views without page-level actions.",
    "Avoid this component without a clear page structure.",
    "Avoid this component when the title belongs in content.",
    "Avoid this component for temporary or contextual headers."
  ],

  relatedComponents: [
    "PageContent",
    "PageLayout",
    "Breadcrumb",
    "Navigation"
  ]
};
