export default {
  purpose: "Arrange content in a responsive grid layout.",

  description: "A flexible grid layout component that automatically arranges child items into columns based on available space and configuration. Supports responsive column counts, gaps, and alignment options. Commonly used for displaying collections of items like product cards, gallery images, or dashboard widgets.",

  functionalAreas: [
    "Layout",
    "Visualization"
  ],

  userIntents: [
    "Display items in a grid",
    "Create responsive multi-column layout",
    "Organize items by category",
    "Show collections efficiently"
  ],

  exampleUseCases: [
    "Product Grid",
    "Image Gallery",
    "Card Grid",
    "Dashboard Widgets",
    "Portfolio Grid",
    "Thumbnail Grid",
    "Feature Showcase"
  ],

  useWhen: [
    "Use this component to arrange items in a grid layout.",
    "Use this component when you need responsive column adjustments.",
    "Use this component to display collections of similar items.",
    "Use this component for product displays, galleries, or dashboard layouts."
  ],

  avoidWhen: [
    "Avoid this component for simple single-row or single-column layouts.",
    "Avoid this component when exact positioning is critical (use CSS Grid directly).",
    "Avoid this component for data tables (use Table component instead).",
    "Avoid this component when items have highly variable sizes."
  ],

  relatedComponents: [
    "Container",
    "Row",
    "Column",
    "Stack"
  ]
};
