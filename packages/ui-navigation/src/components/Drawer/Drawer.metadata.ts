export default {
  purpose: "Display navigation content in a side panel that slides in from the screen edge.",

  description: "A slide-out navigation panel that appears from the left or right edge, used for navigation menus or secondary content. Common on mobile to save screen space while providing access to navigation. Can be triggered by a menu button and closed by clicking backdrop or close button.",

  functionalAreas: [
    "Navigation",
    "Layout"
  ],

  userIntents: [
    "Access navigation menu",
    "View navigation options",
    "Navigate between sections",
    "See available pages"
  ],

  exampleUseCases: [
    "Mobile Navigation Menu",
    "Sidebar Navigation",
    "Mobile App Menu",
    "Quick Navigation Access",
    "Mobile Menu Panel",
    "App Navigation Drawer",
    "Mobile Application Menu"
  ],

  useWhen: [
    "Use this component for navigation on mobile or small screens.",
    "Use this component when persistent sidebar isn't feasible.",
    "Use this component to save screen space while providing navigation.",
    "Use this component to hide navigation that isn't always needed."
  ],

  avoidWhen: [
    "Avoid this component for permanent navigation (use SidebarLayout instead).",
    "Avoid this component for desktop where persistent sidebar is better.",
    "Avoid this component for critical actions (keep visible).",
    "Avoid this component as primary content container."
  ],

  relatedComponents: [
    "Sidebar",
    "Navigation",
    "Menu"
  ]
};
