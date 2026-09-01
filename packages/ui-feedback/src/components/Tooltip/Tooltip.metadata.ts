export default {
  purpose: "Display supplementary information when user hovers over an element.",

  description: "A small popup that appears near an element when the user hovers over or focuses on it, providing context-sensitive help or additional information. Positioned intelligently to stay within viewport bounds and disappears when the user moves away. Used for explaining UI elements, showing abbreviations, or providing quick tips without cluttering the interface.",

  functionalAreas: [
    "Feedback",
    "Communication"
  ],

  userIntents: [
    "Understand what a UI element does",
    "Learn the full form of an abbreviation",
    "Get quick help or tips",
    "See supplementary information"
  ],

  exampleUseCases: [
    "Icon Button Help",
    "Abbreviation Explanation",
    "Form Field Tips",
    "Settings Descriptions",
    "Action Button Help",
    "Data Point Explanation",
    "Keyboard Shortcut Info"
  ],

  useWhen: [
    "Use this component when supplementary information enhances but isn't critical.",
    "Use this component for explaining icon-only buttons or abbreviations.",
    "Use this component when you need to save space by hiding helpful context.",
    "Use this component for keyboard shortcuts or quick tips."
  ],

  avoidWhen: [
    "Avoid this component for critical information that users must see.",
    "Avoid this component on touch devices where hover doesn't work intuitively.",
    "Avoid this component when the tooltip text is longer than a sentence or two.",
    "Avoid this component for complex explanations (provide help text instead)."
  ],

  relatedComponents: [
    "Popover",
    "Drawer",
    "Modal"
  ]
};
