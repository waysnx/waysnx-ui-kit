export default {
  purpose: "Display threaded conversations branching from parent messages.",

  description: "A panel component that shows replies and discussions in a thread view, connected to a parent message. Enables nested conversations without cluttering the main chat. Common in team communication tools for organized discussions.",

  functionalAreas: [
    "Communication",
    "Visualization"
  ],

  userIntents: [
    "See thread of conversation",
    "Reply to specific message",
    "Keep related discussion organized",
    "Find threaded responses"
  ],

  exampleUseCases: [
    "Message Thread",
    "Discussion Thread",
    "Thread Replies",
    "Team Collaboration",
    "Message Response Thread",
    "Topic Discussion",
    "Conversation Branch"
  ],

  useWhen: [
    "Use this component to organize discussions into threads.",
    "Use this component in team or collaborative messaging.",
    "Use this component to keep main chat uncluttered.",
    "Use this component when topic branching is common."
  ],

  avoidWhen: [
    "Avoid this component for simple point-to-point messaging.",
    "Avoid this component without clear thread parent relationship.",
    "Avoid this component when all messages should be in main chat.",
    "Avoid this component without proper thread collection."
  ],

  relatedComponents: [
    "ChatWindow",
    "MessageBubble",
    "ConversationList"
  ]
};
