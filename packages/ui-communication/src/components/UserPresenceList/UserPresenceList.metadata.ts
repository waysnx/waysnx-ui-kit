export default {
  purpose: "Display list of users with their presence or availability status.",

  description: "A component that shows a list of users with presence indicators, avatars, and status information. Used in real-time collaboration tools, chat applications, or team management interfaces to show who is active or available.",

  functionalAreas: [
    "Communication",
    "Visualization"
  ],

  userIntents: [
    "See who is online",
    "Check user availability",
    "Know active participants",
    "Identify available team members"
  ],

  exampleUseCases: [
    "Online Users List",
    "Team Availability Panel",
    "Chat Participants",
    "Active Users",
    "Presence List",
    "Team Status",
    "Collaboration Participants"
  ],

  useWhen: [
    "Use this component to show active users or team members.",
    "Use this component in real-time collaboration tools.",
    "Use this component with presence indicators and status.",
    "Use this component to enable quick communication with available users."
  ],

  avoidWhen: [
    "Avoid this component without real-time presence data.",
    "Avoid this component for single-user or static contexts.",
    "Avoid this component with extremely long user lists without filtering.",
    "Avoid this component without search or organization features."
  ],

  relatedComponents: [
    "PresenceIndicator",
    "UserMenu",
    "Avatar"
  ]
};
