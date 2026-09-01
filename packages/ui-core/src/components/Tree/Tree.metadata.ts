export default {
  purpose: "Display hierarchical data with expandable nodes and checkboxes for selection.",

  description: "A hierarchical tree component that displays nested data with expand/collapse controls. Each node can have child nodes that are toggled into view with expand buttons. Integrated checkboxes allow selecting individual nodes or entire subtrees. Maintains parent-child relationships for tri-state checking of parent nodes.",

  functionalAreas: [
    "Visualization",
    "Selection",
    "Navigation"
  ],

  userIntents: [
    "Navigate hierarchical structures",
    "Select items in a hierarchy",
    "Explore tree-structured data",
    "Manage nested categories or groups"
  ],

  exampleUseCases: [
    "Organization Structure",
    "File System Browser",
    "Category Hierarchy",
    "Permission Matrix",
    "Navigation Menu",
    "Nested Settings"
  ],

  useWhen: [
    "Use this component when displaying hierarchical data with parent-child relationships.",
    "Use this component when users need to navigate and expand nested structures.",
    "Use this component when selecting across multiple hierarchy levels is needed.",
    "Use this component when visual representation of hierarchy improves comprehension."
  ],

  avoidWhen: [
    "Avoid this component for flat lists without hierarchy.",
    "Avoid this component when deep nesting makes navigation difficult.",
    "Avoid this component for very large hierarchies without filtering.",
    "Avoid this component on mobile devices with limited space."
  ],

  relatedComponents: [
    "Select",
    "Checkbox",
    "Radio"
  ]
};
