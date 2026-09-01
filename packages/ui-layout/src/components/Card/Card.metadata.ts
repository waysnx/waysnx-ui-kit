export default {
  purpose: "Contain and organize related content in a bordered container.",

  description: "A wrapper component that groups related content into a visually distinct card container. Provides visual organization by separating content into discrete chunks with clear boundaries and padding. Used extensively for displaying lists of similar items, panels of information, or sections of grouped functionality.",

  functionalAreas: [
    "Layout",
    "Data Entry"
  ],

  userIntents: [
    "Group related information together",
    "Organize content visually",
    "Separate different content areas",
    "Create structured page layouts"
  ],

  exampleUseCases: [
    "Product Card",
    "Profile Card",
    "Information Panel",
    "Content Container",
    "Form Section",
    "Dashboard Widget",
    "List Item Container"
  ],

  useWhen: [
    "Use this component to organize and visually separate content.",
    "Use this component when you want to group related information together.",
    "Use this component as a container for dashboard widgets or panels.",
    "Use this component in grid layouts to organize similar content items."
  ],

  avoidWhen: [
    "Avoid this component for single-use containers without grouped content.",
    "Avoid this component when content should be part of the natural page flow.",
    "Avoid this component in extremely compact layouts where space is precious.",
    "Avoid this component for simple dividers between unrelated content."
  ],

  relatedComponents: [
    "Container",
    "Panel",
    "Section"
  ]
};
