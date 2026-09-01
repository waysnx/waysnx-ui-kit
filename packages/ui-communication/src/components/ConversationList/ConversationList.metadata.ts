export default {
  purpose: "Display a list of conversations for quick access.",

  description: "A sidebar or panel component that shows a list of conversations, chats, or discussion threads. Typically shows the most recent message, participant names, unread count, and timestamp. Enables quick switching between conversations.",

  functionalAreas: [
    "Communication",
    "Navigation"
  ],

  userIntents: [
    "See all conversations",
    "Switch between chats",
    "Know unread messages count",
    "Find conversations quickly"
  ],

  exampleUseCases: [
    "Chat List",
    "Conversation Sidebar",
    "Message Thread List",
    "Discussion Threads",
    "Direct Message List",
    "Channel List",
    "Recent Conversations"
  ],

  useWhen: [
    "Use this component to show list of conversations for selection.",
    "Use this component in chat applications with multiple conversations.",
    "Use this component with unread message indicators.",
    "Use this component to enable quick context switching."
  ],

  avoidWhen: [
    "Avoid this component without clear conversation context.",
    "Avoid this component for single conversation (show ChatWindow instead).",
    "Avoid this component without search or filtering for many conversations.",
    "Avoid this component without recent message preview."
  ],

  relatedComponents: [
    "ChatWindow",
    "MessageBubble",
    "UserPresenceList"
  ]
};
