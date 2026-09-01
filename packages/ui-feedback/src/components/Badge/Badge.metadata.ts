export default {
  purpose: "Display a small numeric or dot indicator to convey status or count information.",

  description: "A small label element that presents count information, status, or notification indicators. Typically overlaid on other UI elements (like icons or avatars) to quickly communicate unread items, active status, or other discrete values. Supports both numeric displays and dot indicators for space-constrained layouts.",

  functionalAreas: [
    "Feedback",
    "Data Entry"
  ],

  userIntents: [
    "See how many unread items exist",
    "Identify active or new items",
    "Recognize status at a glance",
    "Track item count or notifications"
  ],

  exampleUseCases: [
    "Unread Message Count",
    "Notification Indicator",
    "New Item Indicator",
    "Active Status Badge",
    "Item Counter",
    "Active Tab Count",
    "Online Status Dot"
  ],

  useWhen: [
    "Use this component when you need to display a small numeric count or status indicator.",
    "Use this component to overlay on other UI elements like icons or avatars.",
    "Use this component when you need to communicate count overflow (e.g., 99+).",
    "Use this component when a simple dot indicator is sufficient to convey status."
  ],

  avoidWhen: [
    "Avoid this component when the count requires more detailed explanation or interaction.",
    "Avoid this component when the information is primary content (use Text instead).",
    "Avoid this component when the count should be displayed in tabular format.",
    "Avoid this component for large, complex data that requires filtering or sorting."
  ],

  relatedComponents: [
    "Avatar",
    "Icon",
    "Chip"
  ]
};
