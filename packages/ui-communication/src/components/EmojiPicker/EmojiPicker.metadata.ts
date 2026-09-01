export default {
  purpose: "Enable selection and insertion of emoji characters.",

  description: "A component that displays a collection of emojis organized by category with search functionality. Users can browse or search for emojis and select them for insertion into text or forms. Common in chat, messaging, and social applications.",

  functionalAreas: [
    "Communication",
    "Data Entry"
  ],

  userIntents: [
    "Find emoji to insert",
    "Browse emoji categories",
    "Search emoji by name",
    "Add personality to messages"
  ],

  exampleUseCases: [
    "Chat Message Emoji",
    "Message Reaction",
    "Comment Emoji",
    "Emoticon Picker",
    "Status Emoji",
    "Post Emoji",
    "Reaction Selector"
  ],

  useWhen: [
    "Use this component to enable emoji insertion in messaging.",
    "Use this component with organized emoji categories.",
    "Use this component with search functionality for discoverability.",
    "Use this component in social or communication applications."
  ],

  avoidWhen: [
    "Avoid this component without clear messaging or social context.",
    "Avoid this component in formal or professional-only applications.",
    "Avoid this component without search when many emojis exist.",
    "Avoid this component for non-text content."
  ],

  relatedComponents: [
    "ChatInput",
    "MessageBubble",
    "ReactionBar"
  ]
};
