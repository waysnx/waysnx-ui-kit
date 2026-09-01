export default {
  purpose: "Show message delivery and read status indicators.",

  description: "Status indicators that show whether messages have been sent, delivered, or read. Typically displayed as small icons next to messages (checkmarks, double-checkmarks). Provides sender feedback on message status.",

  functionalAreas: [
    "Communication",
    "Feedback"
  ],

  userIntents: [
    "Know if message was sent",
    "See if message was delivered",
    "Check if message was read",
    "Understand message status"
  ],

  exampleUseCases: [
    "Message Status Indicator",
    "Sent/Delivered/Read Status",
    "Message Delivery Status",
    "Read Status Indicator",
    "Message Receipt",
    "Delivery Confirmation",
    "Message Tracking"
  ],

  useWhen: [
    "Use this component to show message delivery status.",
    "Use this component with sent, delivered, and read states.",
    "Use this component in messaging applications.",
    "Use this component to provide sender confidence on message status."
  ],

  avoidWhen: [
    "Avoid this component without backend tracking.",
    "Avoid this component in non-messaging contexts.",
    "Avoid this component when detailed status history isn't needed.",
    "Avoid this component without clear status icon semantics."
  ],

  relatedComponents: [
    "MessageBubble",
    "PresenceIndicator",
    "TypingIndicator"
  ]
};
