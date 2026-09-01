export default {
  purpose: "Display a contextual message that requires user attention.",

  description: "A container for communicating important information with semantic styling that indicates the message type. Supports multiple severity levels (info, success, warning, error) to help users understand the nature and importance of the message. Commonly used for feedback, status updates, and system notifications.",

  functionalAreas: [
    "Feedback",
    "Communication"
  ],

  userIntents: [
    "Understand system status or messages",
    "Receive validation feedback",
    "View error or warning information",
    "Acknowledge important updates"
  ],

  exampleUseCases: [
    "Form Validation Error",
    "Success Confirmation",
    "System Warning",
    "Information Notice",
    "API Error Message",
    "Status Update",
    "Data Warning",
    "Deprecation Notice"
  ],

  useWhen: [
    "Use this component when you need to display contextual information to the user.",
    "Use this component when the message requires the user's attention or acknowledgment.",
    "Use this component when you need to communicate different severity levels of messages.",
    "Use this component when the message is temporary or contextual to the current view."
  ],

  avoidWhen: [
    "Avoid this component when the message requires user action (use Dialog or Modal instead).",
    "Avoid this component when the content should be presented as part of the normal page flow.",
    "Avoid this component when multiple complex interactions are needed.",
    "Avoid this component for critical system errors that block user workflow (use Modal instead)."
  ],

  relatedComponents: [
    "Toast",
    "Modal",
    "ConfirmDialog",
    "EmptyState"
  ]
};
