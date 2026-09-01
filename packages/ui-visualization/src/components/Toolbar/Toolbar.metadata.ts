export default {
  purpose: "Display tool or action buttons for interactive visualizations.",

  description: "A container component for displaying tool buttons, drawing tools, or action controls. Often positioned above or alongside the main visualization. Supports organizing tools into groups and showing/hiding tools.",

  functionalAreas: [
    "Visualization",
    "Actions"
  ],

  userIntents: [
    "Access tools",
    "Perform actions",
    "Select drawing tool",
    "Execute commands"
  ],

  exampleUseCases: [
    "Drawing Toolbar",
    "Visualization Tools",
    "Action Toolbar",
    "Editor Toolbar",
    "Canvas Tools",
    "Format Toolbar",
    "Editing Toolbar"
  ],

  useWhen: [
    "Use this component to display tools for visualizations.",
    "Use this component for drawing or editing tools.",
    "Use this component with organized tool groups.",
    "Use this component above the main interaction area."
  ],

  avoidWhen: [
    "Avoid this component without clear tool functionality.",
    "Avoid this component with too many tools without organization.",
    "Avoid this component for simple action buttons (use Button instead).",
    "Avoid this component without clear visual feedback."
  ],

  relatedComponents: [
    "Button",
    "Canvas",
    "Visualization"
  ]
};
