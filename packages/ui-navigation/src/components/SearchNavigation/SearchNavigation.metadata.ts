export default {
  purpose: "Enable users to search for content or pages and navigate quickly.",

  description: "A search interface component that helps users find and navigate to content or pages. Often features a search input with suggestions, autocomplete, and results that link to pages or content. Used to provide alternative navigation when structure is complex.",

  functionalAreas: [
    "Navigation",
    "Search"
  ],

  userIntents: [
    "Search for content",
    "Navigate to pages",
    "Find information quickly",
    "See search suggestions"
  ],

  exampleUseCases: [
    "Site Search Navigation",
    "Page Search",
    "Content Finder",
    "Quick Navigation Search",
    "Help Search",
    "Documentation Search",
    "Product Search"
  ],

  useWhen: [
    "Use this component when site structure is complex or deep.",
    "Use this component to provide alternative navigation method.",
    "Use this component to help users find content quickly.",
    "Use this component for content-heavy sites or applications."
  ],

  avoidWhen: [
    "Avoid this component without sufficient indexed content.",
    "Avoid this component for simple sites with few pages.",
    "Avoid this component without clear search results display.",
    "Avoid this component without autocomplete or suggestions."
  ],

  relatedComponents: [
    "Search",
    "CommandPalette",
    "Navigation"
  ]
};
