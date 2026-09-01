export default {
  purpose: "Display and manage system notifications in a centralized location.",

  description: "A dedicated notification hub that collects all system notifications, alerts, and messages in one place. Provides filtering, sorting, and clearing options to help users manage notifications. Often includes notification count badge and quick action buttons.",

  functionalAreas: [
    "Navigation",
    "Communication"
  ],

  userIntents: [
    "See all notifications",
    "Review past notifications",
    "Filter notifications by type",
    "Clear or dismiss notifications"
  ],

  exampleUseCases: [
    "System Notifications Hub",
    "Message Center",
    "Alert Center",
    "Notification Inbox",
    "Activity Feed",
    "Notification Management",
    "System Alert Panel"
  ],

  useWhen: [
    "Use this component to centralize notification management.",
    "Use this component when system sends frequent notifications.",
    "Use this component to provide notification history and filtering.",
    "Use this component for complex notification scenarios."
  ],

  avoidWhen: [
    "Avoid this component for simple, infrequent notifications (use Toast instead).",
    "Avoid this component without clear notification history needs.",
    "Avoid this component for time-sensitive alerts (show prominently).",
    "Avoid this component without filtering or organization options."
  ],

  relatedComponents: [
    "Toast",
    "Alert",
    "Badge"
  ]
};
