export default {
  purpose: "Display recently accessed or used items for quick navigation.",

  description: "A menu or list showing recently accessed items, documents, or pages. Helps users quickly return to work in progress or frequently used items. Often appears in dropdown or panel form in header or sidebar.",

  functionalAreas: [
    "Navigation"
  ],

  userIntents: [
    "Access recently used items",
    "Resume previous work",
    "Navigate quickly to past items",
    "See work history"
  ],

  exampleUseCases: [
    "Recent Documents",
    "Recent Pages",
    "Recently Viewed Items",
    "Recent Projects",
    "Recent Searches",
    "Open Recent Menu",
    "Activity History"
  ],

  useWhen: [
    "Use this component to provide quick access to recent items.",
    "Use this component to help users resume work quickly.",
    "Use this component when users frequently revisit items.",
    "Use this component in applications with many items or documents."
  ],

  avoidWhen: [
    "Avoid this component without reliable usage history tracking.",
    "Avoid this component in simple applications with few items.",
    "Avoid this component when items are always visible in main navigation.",
    "Avoid this component without clear time-based ordering."
  ],

  relatedComponents: [
    "Menu",
    "FavoritesMenu",
    "QuickActions"
  ]
};
