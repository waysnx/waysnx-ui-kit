export default {
  purpose: "Show that another user is currently typing a message.",

  description: "An animated indicator that shows when other participants are composing messages. Typically displayed in chat windows or message areas with animated dots or text. Improves user experience by providing real-time feedback.",

  functionalAreas: [
    "Communication",
    "Feedback"
  ],

  userIntents: [
    "Know someone is typing",
    "Understand response is coming",
    "See real-time activity",
    "Feel engaged in conversation"
  ],

  exampleUseCases: [
    "Chat Typing Indicator",
    "Message Compose Activity",
    "Typing Status",
    "Real-time Indicator",
    "Presence Activity",
    "Live Conversation Feedback",
    "Active User Indicator"
  ],

  useWhen: [
    "Use this component to show typing activity in chat.",
    "Use this component to provide real-time feedback in messaging.",
    "Use this component when multiple users are in conversation.",
    "Use this component to reduce perceived latency."
  ],

  avoidWhen: [
    "Avoid this component without real-time communication infrastructure.",
    "Avoid this component for non-messaging contexts.",
    "Avoid this component with distracting animations.",
    "Avoid this component without proper performance optimization."
  ],

  relatedComponents: [
    "ChatWindow",
    "PresenceIndicator",
    "MessageBubble"
  ]
};
