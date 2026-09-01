export default {
  purpose: "Display a list of selectable menu items.",

  description: "A vertical or horizontal list of clickable menu items that trigger actions or navigation. Can be a simple dropdown, standalone menu, or part of a navigation structure. Supports grouping, icons, keyboard navigation, and nested submenus.",

  functionalAreas: [
    "Navigation",
    "Actions"
  ],

  userIntents: [
    "See menu options",
    "Select or trigger action",
    "Navigate to related pages",
    "Access sub-menu options"
  ],

  exampleUseCases: [
    "Dropdown Menu",
    "Context Menu",
    "Navigation Menu",
    "Application Menu",
    "Settings Menu",
    "User Menu",
    "Main Navigation"
  ],

  useWhen: [
    "Use this component to display a list of selectable actions or navigation options.",
    "Use this component for dropdown menus or contextual menus.",
    "Use this component to organize related actions or navigation items.",
    "Use this component when space is limited (collapse into menu)."
  ],

  avoidWhen: [
    "Avoid this component for simple button groups (use Button instead).",
    "Avoid this component without keyboard navigation support.",
    "Avoid this component with too many items (provide search or organization).",
    "Avoid this component for always-visible items (use dedicated space)."
  ],

  relatedComponents: [
    "Navigation",
    "ContextMenu",
    "Dropdown"
  ]
};
