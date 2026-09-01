export default {
  purpose: "Organize page sections using tab navigation.",

  description: "A specialized tabs component designed for page-level tab navigation, often placed below the page header to separate major page sections. Each tab switches between distinct page sections or views while maintaining the header and navigation context.",

  functionalAreas: [
    "Layout",
    "Navigation"
  ],

  userIntents: [
    "Switch between page sections",
    "Organize related content areas",
    "See available pages sections",
    "Navigate between primary views"
  ],

  exampleUseCases: [
    "Account Settings Tabs",
    "User Profile Tabs",
    "Product Details Tabs",
    "Dashboard Tabs",
    "Page Section Navigation",
    "Content Tabs",
    "Organization Tabs"
  ],

  useWhen: [
    "Use this component to separate major page sections.",
    "Use this component for page-level tab navigation.",
    "Use this component when sections are equally important and frequently switched.",
    "Use this component as an alternative to page hierarchies."
  ],

  avoidWhen: [
    "Avoid this component for minor tabs within content (use Tabs instead).",
    "Avoid this component when tabs are hierarchical or deeply nested.",
    "Avoid this component when some sections are more important than others.",
    "Avoid this component for temporary or contextual navigation."
  ],

  relatedComponents: [
    "Tabs",
    "PageLayout",
    "PageHeader",
    "Navigation"
  ]
};
