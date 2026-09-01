export default {
  purpose: "Organize main content area of a page layout.",

  description: "A container component that wraps the primary content of a page, often used in combination with PageHeader and page layout components. Provides proper spacing and structure for page content while coordinating with other page-level layout components.",

  functionalAreas: [
    "Layout"
  ],

  userIntents: [
    "Organize page content properly",
    "Create consistent page structure",
    "Separate header from content",
    "Control content spacing"
  ],

  exampleUseCases: [
    "Page Main Content",
    "Article Content",
    "Dashboard Content",
    "Form Page Content",
    "Detail Page Content",
    "List Page Content",
    "Settings Page Content"
  ],

  useWhen: [
    "Use this component to wrap the main content of a page.",
    "Use this component in combination with PageHeader and page layouts.",
    "Use this component to ensure consistent spacing and structure.",
    "Use this component as part of a comprehensive page layout system."
  ],

  avoidWhen: [
    "Avoid this component for simple single-section pages.",
    "Avoid this component without a corresponding PageHeader.",
    "Avoid this component when Container would be simpler.",
    "Avoid this component for modal or overlay content."
  ],

  relatedComponents: [
    "PageHeader",
    "PageLayout",
    "Container",
    "Section"
  ]
};
