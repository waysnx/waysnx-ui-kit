export default {
  purpose: "Represent a single node within a hierarchical tree structure.",

  description: "A component that represents an individual node in a tree, with expand/collapse functionality if it has children. Often used as a child component within Tree or hierarchy visualizations.",

  functionalAreas: [
    "Visualization",
    "Navigation"
  ],

  userIntents: [
    "See tree node",
    "Expand/collapse branch",
    "Navigate hierarchy",
    "Select node"
  ],

  exampleUseCases: [
    "File System Node",
    "Menu Item",
    "Hierarchy Node",
    "Tree Item",
    "Navigation Node",
    "Folder Item",
    "Category Node"
  ],

  useWhen: [
    "Use this component as individual nodes within Tree components.",
    "Use this component to represent items in hierarchies.",
    "Use this component with expand/collapse for nested items.",
    "Use this component with proper nesting support."
  ],

  avoidWhen: [
    "Avoid this component used standalone (use Tree instead).",
    "Avoid this component without parent Tree context.",
    "Avoid this component for flat lists (use ListItem instead).",
    "Avoid this component without clear parent-child relationships."
  ],

  relatedComponents: [
    "Tree",
    "Hierarchy",
    "ListItem"
  ]
};
