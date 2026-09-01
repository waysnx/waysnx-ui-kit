export default {
  purpose: "Enable searching and filtering within visualizations.",

  description: "A search/filter input component used within visualizations to find and highlight specific elements. Often integrates with visualization rendering to update what's displayed based on search results.",

  functionalAreas: [
    "Search",
    "Visualization"
  ],

  userIntents: [
    "Find elements",
    "Filter data",
    "Search visualization",
    "Highlight matches"
  ],

  exampleUseCases: [
    "Tree Search",
    "Diagram Search",
    "Chart Filter",
    "Element Finder",
    "Data Filter",
    "Content Search",
    "Visualization Filter"
  ],

  useWhen: [
    "Use this component in large visualizations with many elements.",
    "Use this component to help users find specific items.",
    "Use this component with real-time search/highlight.",
    "Use this component with advanced filtering options."
  ],

  avoidWhen: [
    "Avoid this component for small visualizations (not needed).",
    "Avoid this component without proper search implementation.",
    "Avoid this component with unclear search semantics.",
    "Avoid this component without performance optimization."
  ],

  relatedComponents: [
    "Input",
    "Filter",
    "Visualization"
  ]
};
