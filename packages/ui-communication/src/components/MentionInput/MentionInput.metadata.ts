export default {
  purpose: "Enable mentioning users or entities within text input.",

  description: "A text input component that detects @ mentions and provides autocomplete suggestions for users or entities. Displays matching results as user types and allows selection to insert mentions. Common in collaboration, social, and communication applications.",

  functionalAreas: [
    "Communication",
    "Data Entry"
  ],

  userIntents: [
    "Mention specific users",
    "Get suggestion list",
    "Notify users with mention",
    "Direct message or attention"
  ],

  exampleUseCases: [
    "Chat Message Mention",
    "Comment Mention",
    "Message User Mention",
    "Team Collaboration",
    "Task Assignment",
    "Discussion Mention",
    "Social Media Mention"
  ],

  useWhen: [
    "Use this component to enable user mentions in collaborative content.",
    "Use this component with autocomplete suggestions for users.",
    "Use this component in chat, comments, or team communication.",
    "Use this component when notifications should be triggered by mentions."
  ],

  avoidWhen: [
    "Avoid this component without user data to suggest.",
    "Avoid this component in non-collaborative contexts.",
    "Avoid this component without proper @ detection logic.",
    "Avoid this component for simple user selection (use Select instead)."
  ],

  relatedComponents: [
    "ChatInput",
    "TextArea",
    "Autocomplete"
  ]
};
