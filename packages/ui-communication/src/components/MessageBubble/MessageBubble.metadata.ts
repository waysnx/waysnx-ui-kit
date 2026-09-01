export default {
  purpose: "Display a single message in a chat or messaging interface.",

  description: "A component that renders an individual message with sender information, content, timestamp, and optional status indicators. Typically styled as a bubble or box and used within ChatWindow. Supports different styling for user vs. other sender messages.",

  functionalAreas: [
    "Communication",
    "Visualization"
  ],

  userIntents: [
    "Read individual message",
    "Know who sent message",
    "See when message was sent",
    "Check message status"
  ],

  exampleUseCases: [
    "Chat Message",
    "Instant Message",
    "Conversation Message",
    "User Message",
    "System Message",
    "Bot Message",
    "Notification Message"
  ],

  useWhen: [
    "Use this component to display individual messages in chat.",
    "Use this component within ChatWindow or ConversationList.",
    "Use this component to show sender and timestamp information.",
    "Use this component with status indicators for delivered/read states."
  ],

  avoidWhen: [
    "Avoid this component without a chat or messaging context.",
    "Avoid this component for non-message content.",
    "Avoid this component without proper styling differentiation.",
    "Avoid this component without sender identification."
  ],

  relatedComponents: [
    "ChatWindow",
    "ChatInput",
    "Avatar"
  ]
};
