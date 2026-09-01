export default {
  purpose: "Organize content in a vertical column within a layout grid.",

  description: "A layout primitive that defines a vertical column in a flexible grid system. Used as a building block within grid layouts to organize content in columns with consistent sizing and spacing. Supports responsive column sizes and spans for creating complex layouts.",

  functionalAreas: [
    "Layout"
  ],

  userIntents: [
    "Organize content into columns",
    "Create responsive multi-column layouts",
    "Control content width and alignment",
    "Build complex grid structures"
  ],

  exampleUseCases: [
    "Multi-column Page Layout",
    "Dashboard Column",
    "Two-column Content Layout",
    "Sidebar Column",
    "Product Grid Column",
    "Responsive Column Layout",
    "Data Table Column"
  ],

  useWhen: [
    "Use this component as a building block within grid systems.",
    "Use this component to organize content into vertical columns.",
    "Use this component when you need responsive column layouts.",
    "Use this component in combination with Row for complex grid layouts."
  ],

  avoidWhen: [
    "Avoid this component for layout without a grid system (use Flex or Stack instead).",
    "Avoid this component for simple single-column layouts.",
    "Avoid this component when Grid component would be simpler.",
    "Avoid this component without clear responsive requirements."
  ],

  relatedComponents: [
    "Row",
    "Grid",
    "Container",
    "Stack"
  ]
};
