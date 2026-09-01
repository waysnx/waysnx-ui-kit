export default {
  purpose: "Display hierarchical tree structure with expandable nodes.",

  description: "A component that renders hierarchical data as an expandable/collapsible tree. Each node can have children that expand on demand. Supports keyboard navigation and drag-and-drop for reordering. Used for file systems, org charts, or any hierarchical data.",

  functionalAreas: [
    "Visualization",
    "Navigation"
  ],

  userIntents: [
    "See hierarchical structure",
    "Expand/collapse sections",
    "Navigate hierarchy",
    "Understand relationships"
  ],

  exampleUseCases: [
    "File System Browser",
    "Organizational Chart",
    "Category Hierarchy",
    "Menu Structure",
    "DOM Tree",
    "Data Hierarchy",
    "Navigation Tree"
  ],

  useWhen: [
    "Use this component to display hierarchical data.",
    "Use this component with expand/collapse for managing complexity.",
    "Use this component when parent-child relationships are important.",
    "Use this component for file systems or org structures."
  ],

  avoidWhen: [
    "Avoid this component for flat data (use List instead).",
    "Avoid this component with extremely deep hierarchies.",
    "Avoid this component without clear parent-child relationships.",
    "Avoid this component without proper keyboard navigation."
  ],

  relatedComponents: [
    "TreeNode",
    "Hierarchy",
    "TreeMenu"
  ]
};
