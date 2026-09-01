export default {
  purpose: "Display a list of notifications for review and management.",

  description: "A component that shows a collection of notifications with content, timestamps, and actions. Users can mark as read, archive, or act on notifications. Often used in notification center or as dropdown from notification icon.",

  functionalAreas: [
    "Communication",
    "Visualization"
  ],

  userIntents: [
    "See all notifications",
    "Review notification content",
    "Mark notifications as read",
    "Take action on notifications"
  ],

  exampleUseCases: [
    "Notification Inbox",
    "Notification Center",
    "Notification Dropdown",
    "Alert List",
    "Notification Panel",
    "Notification History",
    "Message Notifications"
  ],

  useWhen: [
    "Use this component to display notifications in list format.",
    "Use this component in notification center or dropdown.",
    "Use this component when users need to manage notifications.",
    "Use this component with marking as read and clearing actions."
  ],

  avoidWhen: [
    "Avoid this component for single temporary notifications (use Toast instead).",
    "Avoid this component without clear notification management actions.",
    "Avoid this component for non-notification content.",
    "Avoid this component without proper timestamp and content display."
  ],

  relatedComponents: [
    "NotificationCenter",
    "NotificationBadge",
    "Toast"
  ]
};
