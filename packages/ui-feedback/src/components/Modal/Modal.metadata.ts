export default {
  purpose: "Display important content in a focused dialog window.",

  description: "A modal overlay that displays content in a centered dialog, overlaying the main page content and preventing interaction with the background. Used for critical information, forms, or actions that require focused user attention. Can be sized, closed via button or Escape key, and supports title, content, and custom footer actions.",

  functionalAreas: [
    "Feedback",
    "Forms"
  ],

  userIntents: [
    "Focus on a critical task or message",
    "Complete a form or input task",
    "View detailed information",
    "Confirm important information"
  ],

  exampleUseCases: [
    "Login Modal",
    "Confirmation Dialog",
    "Form Submission",
    "Detailed Information View",
    "Settings Modal",
    "Welcome Dialog",
    "Alert Modal"
  ],

  useWhen: [
    "Use this component when users should focus on a specific task.",
    "Use this component when background content should be temporarily blocked.",
    "Use this component for forms that require dedicated screen space.",
    "Use this component when content is important enough to demand attention."
  ],

  avoidWhen: [
    "Avoid this component for supplementary content (use Drawer instead).",
    "Avoid this component for content that should be in the main page flow.",
    "Avoid this component for temporary notifications (use Toast instead).",
    "Avoid this component when users need to frequently reference background content."
  ],

  relatedComponents: [
    "Drawer",
    "Dialog",
    "ConfirmDialog",
    "Toast"
  ]
};
