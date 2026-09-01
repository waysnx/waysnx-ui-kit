export default {
  purpose: "Define a semantic content section with consistent spacing.",

  description: "A semantic container that represents a distinct section or area of content with consistent padding and spacing. Provides clear visual separation and organization while being semantically meaningful. Used to break up pages into logical, scannable sections.",

  functionalAreas: [
    "Layout"
  ],

  userIntents: [
    "Organize content into logical sections",
    "Improve page scanning and readability",
    "Create visual hierarchy",
    "Separate related content"
  ],

  exampleUseCases: [
    "Page Section",
    "Article Section",
    "Dashboard Section",
    "Content Area",
    "Feature Section",
    "Information Section",
    "Related Items Section"
  ],

  useWhen: [
    "Use this component to create semantic sections of content.",
    "Use this component to organize page content into logical areas.",
    "Use this component for consistent spacing between content sections.",
    "Use this component to improve page structure and readability."
  ],

  avoidWhen: [
    "Avoid this component for simple layout needs (use Stack instead).",
    "Avoid this component for styled containers (use Card or Panel instead).",
    "Avoid this component excessively (too many sections fragment content).",
    "Avoid this component without clear semantic purpose."
  ],

  relatedComponents: [
    "Container",
    "Card",
    "Stack"
  ]
};
