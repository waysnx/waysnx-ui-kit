export default {
  purpose: "Create a contained panel or section with consistent styling.",

  description: "A wrapper component that applies consistent styling to a panel or section of content. Similar to Card but often used for more generic container needs without necessarily displaying grouped information. Provides visual distinction through borders, padding, and background colors.",

  functionalAreas: [
    "Layout",
    "Data Entry"
  ],

  userIntents: [
    "Group content in a styled container",
    "Create visual distinction",
    "Organize layout sections",
    "Apply consistent styling"
  ],

  exampleUseCases: [
    "Form Panel",
    "Content Panel",
    "Information Container",
    "Layout Section",
    "Widget Container",
    "Sidebar Panel",
    "Modal Content Panel"
  ],

  useWhen: [
    "Use this component as a generic container with consistent styling.",
    "Use this component for layout sections and panels.",
    "Use this component when you need visual distinction without specific semantics.",
    "Use this component for flexible layout organization."
  ],

  avoidWhen: [
    "Avoid this component when Card semantics are more appropriate.",
    "Avoid this component for simple layout needs (use Stack instead).",
    "Avoid this component excessively (too many nested panels create visual clutter).",
    "Avoid this component for content that should be part of natural flow."
  ],

  relatedComponents: [
    "Card",
    "Container",
    "Section"
  ]
};
