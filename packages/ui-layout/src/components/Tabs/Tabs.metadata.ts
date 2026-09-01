export default {
  purpose: "Organize content into tabs that users can switch between.",

  description: "A tabbed interface that displays one tab's content at a time, with clickable tab headers for switching. Keyboard accessible with arrow keys for navigation and support for single or multiple tab selections. Used for organizing related content into manageable sections without taking up much vertical space.",

  functionalAreas: [
    "Layout",
    "Navigation"
  ],

  userIntents: [
    "Switch between related content sections",
    "See all available options at once",
    "Organize content without scrolling",
    "Compare different content areas"
  ],

  exampleUseCases: [
    "Account Settings Tabs",
    "Product Information Tabs",
    "Dialog Tabs",
    "Form Tabs",
    "Data Tabs",
    "Content Organization",
    "Feature Tabs"
  ],

  useWhen: [
    "Use this component to organize related content into switchable sections.",
    "Use this component when tabs are equally important and frequently accessed.",
    "Use this component when content doesn't fit without scrolling.",
    "Use this component for content-adjacent information like specs or reviews."
  ],

  avoidWhen: [
    "Avoid this component when one tab is significantly more important than others.",
    "Avoid this component with more than 7-8 tabs (consider alternatives).",
    "Avoid this component for hierarchical navigation (use breadcrumbs instead).",
    "Avoid this component when all content should be visible simultaneously."
  ],

  relatedComponents: [
    "PageTabs",
    "Accordion",
    "Drawer"
  ]
};
