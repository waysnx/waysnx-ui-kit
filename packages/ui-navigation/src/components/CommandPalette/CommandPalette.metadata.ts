export default {
  purpose: "Enable quick access to commands and navigation via keyboard.",

  description: "A search-driven interface that lets users quickly find and execute commands, navigate to sections, or access features by typing. Usually triggered with a keyboard shortcut (like Cmd+K) and features fuzzy search matching. Popular in developer tools and modern applications for power-user access.",

  functionalAreas: [
    "Navigation",
    "Search"
  ],

  userIntents: [
    "Quickly execute commands",
    "Find features by typing",
    "Navigate without mouse",
    "Discover available actions"
  ],

  exampleUseCases: [
    "Application Command Palette",
    "Settings Shortcut Access",
    "Help Search",
    "Navigation Search",
    "Feature Discovery",
    "Developer Tools Access",
    "Document Outline Search"
  ],

  useWhen: [
    "Use this component for power-user access to commands and features.",
    "Use this component in applications with many commands or features.",
    "Use this component to enable keyboard-driven workflows.",
    "Use this component for discovering lesser-known features."
  ],

  avoidWhen: [
    "Avoid this component in simple applications with few commands.",
    "Avoid this component without a clear keyboard shortcut trigger.",
    "Avoid this component on mobile platforms.",
    "Avoid this component without good command descriptions for discoverability."
  ],

  relatedComponents: [
    "Menu",
    "SearchNavigation",
    "Navigation"
  ]
};
