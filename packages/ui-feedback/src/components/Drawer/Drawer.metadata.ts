export default {
  purpose: "Display content in a side panel that slides in from the screen edge.",

  description: "A slide-out panel that appears from the left or right edge of the screen, used for secondary content, navigation, or form fields without taking up permanent space. Can be closed by clicking the backdrop, pressing Escape, or clicking the close button. Commonly used for filters, navigation menus, and detail panels that complement the main content.",

  functionalAreas: [
    "Layout",
    "Navigation"
  ],

  userIntents: [
    "View secondary content without losing main view",
    "Access filters or settings",
    "See navigation menu options",
    "View detailed information aside from main content"
  ],

  exampleUseCases: [
    "Filter Panel",
    "Navigation Menu",
    "Settings Panel",
    "Detail View",
    "Search Filters",
    "Side Navigation",
    "Mobile Navigation Menu"
  ],

  useWhen: [
    "Use this component when content should be secondary to the main view.",
    "Use this component when screen space is limited and temporary access is sufficient.",
    "Use this component for filters, settings, or navigation menus.",
    "Use this component when users should maintain context of the main content."
  ],

  avoidWhen: [
    "Avoid this component when content should be part of the main flow.",
    "Avoid this component when content requires persistent visibility.",
    "Avoid this component for critical information that needs constant access.",
    "Avoid this component when content is the primary focus of the view."
  ],

  relatedComponents: [
    "Modal",
    "Sidebar",
    "Navigation"
  ]
};
