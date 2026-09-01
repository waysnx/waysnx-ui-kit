export default {
  purpose: "Request explicit user confirmation before performing a consequential action.",

  description: "A modal dialog that prompts the user to confirm or cancel an action. Displays a title, message, and action buttons with semantic styling to indicate action importance (default, warning, or danger). Prevents accidental actions by requiring intentional user confirmation, commonly used before deletions or destructive operations.",

  functionalAreas: [
    "Feedback",
    "Workflow"
  ],

  userIntents: [
    "Confirm before deleting content",
    "Verify before proceeding with action",
    "Understand consequences before acting",
    "Cancel unintended operations"
  ],

  exampleUseCases: [
    "Delete Confirmation",
    "Discard Changes Dialog",
    "Override Warning",
    "Irreversible Action Alert",
    "Permission Request",
    "Large Operation Warning",
    "Logout Confirmation"
  ],

  useWhen: [
    "Use this component when an action is consequential or potentially destructive.",
    "Use this component when the action is difficult or impossible to undo.",
    "Use this component to prevent accidental deletions or data loss.",
    "Use this component for actions that may have significant business impact."
  ],

  avoidWhen: [
    "Avoid this component for reversible or low-consequence actions.",
    "Avoid this component when the action is required and has no cancel option.",
    "Avoid this component for simple informational messages (use Alert instead).",
    "Avoid this component when multiple complex steps are needed (use Wizard instead)."
  ],

  relatedComponents: [
    "Modal",
    "Alert",
    "Button"
  ]
};
