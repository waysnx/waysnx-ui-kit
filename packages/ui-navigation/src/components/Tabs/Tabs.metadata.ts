export default {
  purpose: "Organize navigation into switchable tabs.",

  description: "Tab-based navigation component that displays multiple navigation options as tabs, with one active tab showing its content. Supports keyboard navigation and visual indication of active tab. Used for organizing primary navigation or content sections.",

  functionalAreas: [
    "Navigation",
    "Layout"
  ],

  userIntents: [
    "Switch between sections",
    "See available options",
    "Know which section is active",
    "Navigate between areas"
  ],

  exampleUseCases: [
    "Navigation Tabs",
    "Section Tabs",
    "Feature Tabs",
    "Content Tabs",
    "Primary Navigation Tabs",
    "Organization Tabs",
    "Item Detail Tabs"
  ],

  useWhen: [
    "Use this component for tab-based navigation or content organization.",
    "Use this component when tabs are equally important.",
    "Use this component for organizing content sections.",
    "Use this component with fewer than 8 tabs."
  ],

  avoidWhen: [
    "Avoid this component when one option is significantly more important.",
    "Avoid this component with more than 8-10 tabs.",
    "Avoid this component for hierarchical navigation.",
    "Avoid this component when all content should be visible."
  ],

  relatedComponents: [
    "PageTabs",
    "Navigation",
    "Menu"
  ]
};
