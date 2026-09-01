export default {
  purpose: "Guide users through a multi-step process or form.",

  description: "An interactive component that orchestrates a step-by-step workflow with validation, error messages, and navigation controls. Displays one step at a time, validates before progressing, and provides save/skip options. Commonly used for onboarding, complex forms, and multi-step processes requiring user guidance.",

  functionalAreas: [
    "Forms",
    "Workflow"
  ],

  userIntents: [
    "Complete multi-step process",
    "Fill complex form in stages",
    "Receive guidance through process",
    "Validate and confirm each step"
  ],

  exampleUseCases: [
    "Checkout Wizard",
    "Onboarding Flow",
    "Complex Form",
    "Setup Wizard",
    "Multi-step Registration",
    "Installation Wizard",
    "Configuration Flow"
  ],

  useWhen: [
    "Use this component for complex multi-step processes or forms.",
    "Use this component when validation is needed at each step.",
    "Use this component to guide users through intimidating processes.",
    "Use this component when users may want to save progress and continue later."
  ],

  avoidWhen: [
    "Avoid this component for simple single-step forms (use basic form instead).",
    "Avoid this component for processes with dynamic or highly variable steps.",
    "Avoid this component when all steps should be visible (use checklist instead).",
    "Avoid this component for optional or exploratory flows."
  ],

  relatedComponents: [
    "Stepper",
    "Form",
    "Dialog"
  ]
};
