export default {
  purpose: "Display hierarchical menu structure with collapsible tree nodes.",

  description: "A menu component that represents hierarchical relationships with expandable and collapsible nodes. Each node can have child items that reveal on expansion. Used for navigation structures, file trees, or any hierarchical menu.",

  functionalAreas: [
    "Navigation",
    "Visualization"
  ],

  userIntents: [
    "Navigate hierarchical structure",
    "Expand/collapse menu sections",
    "See nested options",
    "Navigate deep hierarchies"
  ],

  exampleUseCases: [
    "File System Navigation",
    "Hierarchical Menu",
    "Navigation Tree",
    "Category Navigation",
    "Site Map",
    "Nested Menu",
    "Documentation Tree"
  ],

  useWhen: [
    "Use this component to display hierarchical navigation structures.",
    "Use this component when navigation has multiple levels.",
    "Use this component to allow users to explore nested items.",
    "Use this component for file systems or documentation structures."
  ],

  avoidWhen: [
    "Avoid this component for flat navigation (use Menu instead).",
    "Avoid this component with very deep hierarchies (5+ levels).",
    "Avoid this component when most items are always expanded.",
    "Avoid this component without collapsible expansion."
  ],

  relatedComponents: [
    "Menu",
    "Navigation",
    "Drawer"
  ]
};
