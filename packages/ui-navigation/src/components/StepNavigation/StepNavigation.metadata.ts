export default {
  purpose: "Navigate between steps of a multi-step process or guide.",

  description: "A navigation component that shows and enables switching between steps of a multi-step workflow or tutorial. Often includes progress indicators and may allow skipping or revisiting steps. Coordinates with step content to provide cohesive multi-step experience.",

  functionalAreas: [
    "Navigation",
    "Workflow"
  ],

  userIntents: [
    "Navigate between process steps",
    "See current step",
    "Go back to previous step",
    "Progress to next step"
  ],

  exampleUseCases: [
    "Onboarding Steps Navigation",
    "Wizard Navigation",
    "Tutorial Steps",
    "Setup Steps",
    "Form Steps Navigation",
    "Process Steps",
    "Multi-step Workflow"
  ],

  useWhen: [
    "Use this component to navigate between multi-step processes.",
    "Use this component in wizards or onboarding flows.",
    "Use this component when users should progress linearly through steps.",
    "Use this component alongside Stepper for visual progress indication."
  ],

  avoidWhen: [
    "Avoid this component for non-linear workflows.",
    "Avoid this component with too many steps (provide checkpoints).",
    "Avoid this component without clear step structure.",
    "Avoid this component for optional or exploratory flows."
  ],

  relatedComponents: [
    "Stepper",
    "Wizard",
    "Tabs"
  ]
};
