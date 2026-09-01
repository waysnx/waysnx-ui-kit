export default {
  purpose: "Display message history and enable real-time chat conversation.",

  description: "A container component that displays messages in chronological order with sender information and timestamps. Automatically scrolls to show new messages, supports message grouping, and integrates with ChatInput. Forms the core of chat interfaces.",

  functionalAreas: [
    "Communication",
    "Visualization"
  ],

  userIntents: [
    "See conversation history",
    "Read messages in order",
    "View sender information",
    "See newest messages"
  ],

  exampleUseCases: [
    "Chat Interface",
    "Instant Messaging",
    "Conversation Window",
    "Discussion Panel",
    "Support Chat",
    "Real-time Messaging",
    "Message History"
  ],

  useWhen: [
    "Use this component as the main chat display area.",
    "Use this component to show message history in chronological order.",
    "Use this component with ChatInput for complete chat interface.",
    "Use this component for real-time communication applications."
  ],

  avoidWhen: [
    "Avoid this component without a clear messaging context.",
    "Avoid this component for single messages (use MessageBubble instead).",
    "Avoid this component without auto-scroll functionality.",
    "Avoid this component without proper timestamp display."
  ],

  relatedComponents: [
    "ChatInput",
    "MessageBubble",
    "ConversationList"
  ]
};
