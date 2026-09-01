export default {
  purpose: "Display notification count or alert status on UI elements.",

  description: "A small badge or indicator that shows unread notification counts or highlights alert status. Usually overlaid on icons (bell, inbox) or in navigation elements. Provides at-a-glance notification awareness.",

  functionalAreas: [
    "Communication",
    "Feedback"
  ],

  userIntents: [
    "Know there are notifications",
    "See notification count",
    "Know alert status",
    "Find notifications quickly"
  ],

  exampleUseCases: [
    "Unread Message Count",
    "Notification Alert",
    "Inbox Badge",
    "Alert Badge",
    "Notification Icon Badge",
    "Unread Count",
    "Activity Badge"
  ],

  useWhen: [
    "Use this component to show notification counts or status.",
    "Use this component on notification icons or navigation.",
    "Use this component with numbers or alert indicators.",
    "Use this component to draw attention to notifications."
  ],

  avoidWhen: [
    "Avoid this component without clear notification count.",
    "Avoid this component in non-messaging contexts.",
    "Avoid this component without proper update mechanism.",
    "Avoid this component for non-urgent information."
  ],

  relatedComponents: [
    "Badge",
    "NotificationCenter",
    "Toast"
  ]
};
