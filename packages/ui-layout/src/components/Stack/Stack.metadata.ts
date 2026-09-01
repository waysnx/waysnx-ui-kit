export default {
  purpose: "Arrange elements in a single row or column with consistent spacing.",

  description: "A layout primitive that arranges child elements in a stack (vertical or horizontal) with consistent spacing. Simplifies flex layouts by providing a simple, declarative way to create common layouts. Supports responsive direction changes and flexible item sizing.",

  functionalAreas: [
    "Layout"
  ],

  userIntents: [
    "Arrange elements in a row or column",
    "Add consistent spacing between elements",
    "Create responsive layouts",
    "Organize simple layouts"
  ],

  exampleUseCases: [
    "Button Group",
    "Form Field Stack",
    "Navigation Bar",
    "Toolbar",
    "List Layout",
    "Card Contents",
    "Dialog Contents"
  ],

  useWhen: [
    "Use this component to arrange elements in a single row or column.",
    "Use this component for simple layouts with consistent spacing.",
    "Use this component as an alternative to writing flexbox CSS.",
    "Use this component to create responsive layouts that change direction."
  ],

  avoidWhen: [
    "Avoid this component for complex multi-column grids (use Grid instead).",
    "Avoid this component when elements need specific positioning.",
    "Avoid this component for wrapping layouts (elements should fit without wrapping).",
    "Avoid this component with only one or two elements (use margin instead)."
  ],

  relatedComponents: [
    "Grid",
    "Container",
    "Spacer"
  ]
};
