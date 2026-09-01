export default {
  purpose: "Provide user input for composing chat or message content.",

  description: "A specialized text input component designed for composing messages in chat interfaces. Typically grows as user types, supports multiline input, emoji insertion, file attachments, and send button. Often integrated with message history or chat windows.",

  functionalAreas: [
    "Communication",
    "Data Entry"
  ],

  userIntents: [
    "Compose messages",
    "Add attachments to message",
    "Insert emojis",
    "Send messages"
  ],

  exampleUseCases: [
    "Chat Message Input",
    "Messaging App Input",
    "Comment Input",
    "Chat Box",
    "Instant Message Input",
    "Discussion Message",
    "Conversation Input"
  ],

  useWhen: [
    "Use this component for message composition in chat interfaces.",
    "Use this component when multiline input and attachments are needed.",
    "Use this component to provide emoji picker and formatting options.",
    "Use this component in real-time communication applications."
  ],

  avoidWhen: [
    "Avoid this component for simple text input without chat context.",
    "Avoid this component without accompanying chat window.",
    "Avoid this component for single-line-only input (use TextInput instead).",
    "Avoid this component without proper send/submit handling."
  ],

  relatedComponents: [
    "ChatWindow",
    "MessageBubble",
    "EmojiPicker",
    "TextArea"
  ]
};
