export default {
  purpose: "Create a visual separation between content sections.",

  description: "A simple horizontal or vertical line that separates distinct content areas visually. Helps organize information and improve visual hierarchy by creating clear boundaries. Can be styled and used to break up long content into more digestible sections.",

  functionalAreas: [
    "Layout",
    "Visualization"
  ],

  userIntents: [
    "Separate content sections visually",
    "Improve page organization",
    "Create visual breaks in content",
    "Help scan and understand structure"
  ],

  exampleUseCases: [
    "Section Separator",
    "Menu Item Divider",
    "Content Break",
    "Form Section Divider",
    "List Item Separator",
    "Dialog Content Divider",
    "Navigation Divider"
  ],

  useWhen: [
    "Use this component to separate distinct content sections.",
    "Use this component to improve visual organization and scanning.",
    "Use this component to create clear visual breaks in long content.",
    "Use this component in menus, dropdowns, and lists for grouping items."
  ],

  avoidWhen: [
    "Avoid this component for layout structure (use Container or Stack instead).",
    "Avoid this component excessively (too many dividers create visual noise).",
    "Avoid this component when margin or padding can achieve the same effect.",
    "Avoid this component for styling unrelated content together."
  ],

  relatedComponents: [
    "Spacer",
    "Stack",
    "Section"
  ]
};
