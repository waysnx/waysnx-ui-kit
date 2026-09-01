export default {
  purpose: "Display error messages to users with prominent visual and semantic prominence.",

  description: "A component for displaying error feedback to users with semantic HTML markup and accessibility support. Renders as an alert region that automatically announces to screen reader users. Displays conditional error messages based on validation or processing failures. Used throughout form components for consistent error presentation.",

  functionalAreas: [
    "Feedback",
    "Forms",
    "Communication"
  ],

  userIntents: [
    "Understand why an action failed",
    "Learn what needs to be corrected",
    "Receive validation feedback",
    "Get error recovery guidance"
  ],

  exampleUseCases: [
    "Form Field Error",
    "Validation Message",
    "Action Failure",
    "Data Processing Error",
    "Permission Denied",
    "Input Requirement"
  ],

  useWhen: [
    "Use this component when displaying error states for form fields.",
    "Use this component when users need immediate error feedback.",
    "Use this component when errors should be announced to screen reader users.",
    "Use this component for conditional error message display."
  ],

  avoidWhen: [
    "Avoid this component when the error is not user-actionable.",
    "Avoid this component when displaying non-error feedback (use Feedback components instead).",
    "Avoid this component without context about the error or how to fix it.",
    "Avoid this component for success or informational messages."
  ],

  relatedComponents: [
    "Input",
    "Textarea",
    "Select"
  ]
};
