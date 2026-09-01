export default {
  purpose: "Display user-selected favorite or bookmarked items for quick access.",

  description: "A menu or list showing items that users have marked as favorites or bookmarks. Provides fast navigation to frequently used or important items. Usually customizable with add/remove actions.",

  functionalAreas: [
    "Navigation"
  ],

  userIntents: [
    "Access favorite items quickly",
    "See bookmarked content",
    "Customize navigation",
    "Find frequently used items"
  ],

  exampleUseCases: [
    "Favorite Pages",
    "Bookmarked Items",
    "Quick Access Menu",
    "Personal Shortcuts",
    "Starred Items",
    "Recently Used Items",
    "Custom Shortcuts"
  ],

  useWhen: [
    "Use this component to provide quick access to favorite items.",
    "Use this component when users frequently revisit certain items.",
    "Use this component when users want to customize their navigation.",
    "Use this component in applications with large item collections."
  ],

  avoidWhen: [
    "Avoid this component without personalization capability.",
    "Avoid this component when most users don't have favorites.",
    "Avoid this component in simple applications.",
    "Avoid this component without clear add/remove mechanisms."
  ],

  relatedComponents: [
    "Menu",
    "QuickActions",
    "Navigation"
  ]
};
