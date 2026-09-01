export default {
  purpose: "Add flexible spacing between layout elements.",

  description: "A layout component that creates flexible vertical or horizontal space between elements. Often used to push elements apart or create breathing room without using margins or padding. Simplifies responsive spacing by providing a reusable spacing primitive.",

  functionalAreas: [
    "Layout"
  ],

  userIntents: [
    "Add space between elements",
    "Push elements to edges",
    "Create visual breathing room",
    "Control layout spacing"
  ],

  exampleUseCases: [
    "Space Between Form Elements",
    "Toolbar Spacing",
    "Footer Spacing",
    "Header Spacing",
    "Flexible Space",
    "Page Section Spacing",
    "Column Spacing"
  ],

  useWhen: [
    "Use this component to add flexible spacing between elements.",
    "Use this component to push elements apart in a layout.",
    "Use this component as an alternative to margin and padding.",
    "Use this component in responsive layouts for flexible spacing."
  ],

  avoidWhen: [
    "Avoid this component for fixed spacing (use margin or padding instead).",
    "Avoid this component when styling would be clearer.",
    "Avoid this component excessively (use layout components instead).",
    "Avoid this component when CSS Grid or Flexbox would be simpler."
  ],

  relatedComponents: [
    "Stack",
    "Container",
    "Grid"
  ]
};
