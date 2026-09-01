export default {
  purpose: "Display user online status or availability.",

  description: "A small visual indicator (typically a dot) that shows whether a user is online, away, offline, or in a specific status. Often overlaid on avatars or displayed next to usernames. Provides real-time presence information.",

  functionalAreas: [
    "Communication",
    "Feedback"
  ],

  userIntents: [
    "Know if user is online",
    "See user availability",
    "Know if user is active",
    "Check contact status"
  ],

  exampleUseCases: [
    "Online Status Indicator",
    "Availability Dot",
    "User Status Badge",
    "Contact Status",
    "Presence Dot",
    "User Availability",
    "Activity Status"
  ],

  useWhen: [
    "Use this component to show user presence or availability.",
    "Use this component on avatars, user lists, or headers.",
    "Use this component with multiple status states (online, away, offline).",
    "Use this component in collaborative or real-time applications."
  ],

  avoidWhen: [
    "Avoid this component without real-time presence data.",
    "Avoid this component in non-collaborative contexts.",
    "Avoid this component with unclear status meanings.",
    "Avoid this component without proper performance optimization."
  ],

  relatedComponents: [
    "Avatar",
    "UserPresenceList",
    "Badge"
  ]
};
