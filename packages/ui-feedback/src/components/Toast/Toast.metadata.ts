export default {
  purpose: "Display a temporary notification message that auto-dismisses.",

  description: "A transient notification that appears briefly at the edge of the screen and automatically disappears after a set duration. Supports semantic variants (success, error, warning, info) to communicate message importance. Used for non-critical feedback like confirmation messages, operation status, or subtle alerts that don't require immediate action.",

  functionalAreas: [
    "Feedback",
    "Communication"
  ],

  userIntents: [
    "Receive confirmation of action",
    "See brief status updates",
    "Get notified of background events",
    "Dismiss or ignore non-critical messages"
  ],

  exampleUseCases: [
    "Copy to Clipboard Confirmation",
    "Save Success Message",
    "Network Connection Status",
    "Background Operation Complete",
    "Auto-Save Confirmation",
    "Brief Error Notification",
    "System Update Notice"
  ],

  useWhen: [
    "Use this component for non-critical feedback that doesn't require action.",
    "Use this component when the message should disappear automatically.",
    "Use this component for confirmation messages that are secondary to the main workflow.",
    "Use this component to notify users of background operations or status changes."
  ],

  avoidWhen: [
    "Avoid this component when users must act on the message.",
    "Avoid this component for critical errors (use Modal or Alert instead).",
    "Avoid this component for messages that require user confirmation.",
    "Avoid this component when the message should persist permanently in the view."
  ],

  relatedComponents: [
    "Alert",
    "Modal",
    "ConfirmDialog"
  ]
};
