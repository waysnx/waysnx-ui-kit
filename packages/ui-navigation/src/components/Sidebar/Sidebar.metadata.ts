export default {
  purpose: "Display persistent sidebar navigation alongside main content.",

  description: "A vertical navigation panel that stays visible on the side of the page, showing navigation structure and related pages. Remains accessible while users browse content. Commonly used in applications with hierarchical navigation, providing context and quick access.",

  functionalAreas: [
    "Navigation",
    "Layout"
  ],

  userIntents: [
    "See available navigation options",
    "Navigate without leaving main view",
    "Understand current position",
    "Switch between pages quickly"
  ],

  exampleUseCases: [
    "Application Sidebar",
    "Dashboard Navigation",
    "Documentation Sidebar",
    "Admin Interface",
    "Settings Sidebar",
    "Navigation Panel",
    "Application Menu"
  ],

  useWhen: [
    "Use this component for persistent sidebar navigation.",
    "Use this component in applications with hierarchical structure.",
    "Use this component when users frequently switch between sections.",
    "Use this component to maintain navigation context while browsing."
  ],

  avoidWhen: [
    "Avoid this component on mobile or small screens (use Drawer instead).",
    "Avoid this component when content should be full-width.",
    "Avoid this component with too many navigation items.",
    "Avoid this component for temporary or temporary navigation."
  ],

  relatedComponents: [
    "Drawer",
    "Navigation",
    "Menu",
    "SidebarLayout"
  ]
};
