export default {
  purpose: "Display a horizontal navigation bar with multiple navigation links.",

  description: "A horizontal navigation component containing multiple navigation links or menu items. Often placed below the header and contains the primary navigation structure. Supports responsive collapse to menu on mobile and highlighting of active sections.",

  functionalAreas: [
    "Navigation",
    "Layout"
  ],

  userIntents: [
    "See main navigation options",
    "Navigate between sections",
    "Know which section is active",
    "Access main site areas"
  ],

  exampleUseCases: [
    "Main Navigation Bar",
    "Section Navigation",
    "Horizontal Menu",
    "Top Navigation",
    "Site Navigation",
    "App Navigation",
    "Primary Navigation"
  ],

  useWhen: [
    "Use this component for primary horizontal navigation.",
    "Use this component to display main site or application sections.",
    "Use this component to show the current active section.",
    "Use this component to organize navigation links horizontally."
  ],

  avoidWhen: [
    "Avoid this component for vertical navigation (use Sidebar instead).",
    "Avoid this component when few navigation items exist (use Header instead).",
    "Avoid this component without clear active state indication.",
    "Avoid this component for nested navigation (use Menu instead)."
  ],

  relatedComponents: [
    "Header",
    "Sidebar",
    "Navigation",
    "Menu"
  ]
};
