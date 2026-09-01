export default {
  purpose: "Organize content in a horizontal row within a layout grid.",

  description: "A layout primitive that defines a horizontal row in a flexible grid system. Used as a building block within grid layouts to arrange items horizontally with consistent spacing. Supports responsive adjustments and alignment options for creating complex layouts.",

  functionalAreas: [
    "Layout"
  ],

  userIntents: [
    "Organize content into rows",
    "Create horizontal layouts",
    "Control content alignment",
    "Build grid structures"
  ],

  exampleUseCases: [
    "Form Row",
    "Grid Row",
    "Data Table Row",
    "Item Row",
    "Toolbar Row",
    "Navigation Row",
    "Content Row"
  ],

  useWhen: [
    "Use this component as a building block within grid systems.",
    "Use this component to organize content horizontally.",
    "Use this component in combination with Column for grid layouts.",
    "Use this component when you need consistent row spacing and alignment."
  ],

  avoidWhen: [
    "Avoid this component for simple horizontal layouts (use Stack instead).",
    "Avoid this component for layout without a grid system.",
    "Avoid this component when Flex would be simpler.",
    "Avoid this component without clear grid requirements."
  ],

  relatedComponents: [
    "Column",
    "Grid",
    "Container",
    "Stack"
  ]
};
