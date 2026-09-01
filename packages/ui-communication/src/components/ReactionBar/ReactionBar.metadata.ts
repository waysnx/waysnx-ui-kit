export default {
  purpose: "Enable quick reactions to messages through emoji selections.",

  description: "A compact toolbar showing quick reaction options (usually emoji) that users can click to react to messages or content. Displays reaction counts and shows which users reacted. Common in modern messaging and collaboration apps.",

  functionalAreas: [
    "Communication",
    "Feedback"
  ],

  userIntents: [
    "React to message",
    "Express sentiment",
    "See who reacted",
    "View reaction counts"
  ],

  exampleUseCases: [
    "Message Reaction",
    "Message Feedback",
    "Emoji Reactions",
    "Post Reactions",
    "Quick Feedback",
    "Content Reactions",
    "Message Engagement"
  ],

  useWhen: [
    "Use this component for quick emoji reactions to messages.",
    "Use this component in chat or messaging applications.",
    "Use this component when emoji reactions are primary feedback.",
    "Use this component with reaction counts and user lists."
  ],

  avoidWhen: [
    "Avoid this component in formal or professional-only contexts.",
    "Avoid this component without emoji support.",
    "Avoid this component when detailed feedback is needed (use comments).",
    "Avoid this component without proper backend support."
  ],

  relatedComponents: [
    "EmojiPicker",
    "MessageBubble",
    "ChatWindow"
  ]
};
