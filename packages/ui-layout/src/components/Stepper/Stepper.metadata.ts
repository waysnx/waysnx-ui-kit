export default {
  purpose: "Show progress through a multi-step process.",

  description: "A visualization component that displays the current step, completed steps, and upcoming steps in a multi-step process or workflow. Provides visual feedback on progress while helping users understand the overall structure of the process. Available in horizontal and vertical orientations.",

  functionalAreas: [
    "Feedback",
    "Workflow",
    "Visualization"
  ],

  userIntents: [
    "Know what step I'm on",
    "See how many steps remain",
    "Track progress through process",
    "Understand process structure"
  ],

  exampleUseCases: [
    "Checkout Process Steps",
    "Onboarding Steps",
    "Form Wizard Steps",
    "Installation Steps",
    "Setup Steps",
    "Application Steps",
    "Multi-part Form"
  ],

  useWhen: [
    "Use this component to visualize progress through a multi-step process.",
    "Use this component when the number of steps is fixed and known.",
    "Use this component to help users understand where they are in a workflow.",
    "Use this component as a companion to a Wizard or multi-step form."
  ],

  avoidWhen: [
    "Avoid this component for processes with dynamic or unknown step counts.",
    "Avoid this component for simple two-step processes (use confirmations instead).",
    "Avoid this component for more than 10-12 steps (consider alternatives).",
    "Avoid this component when step structure is not linear."
  ],

  relatedComponents: [
    "Wizard",
    "Progress",
    "CircularProgress"
  ]
};
