export default {
  purpose: "Provide quick access to frequent actions in a compact menu.",

  description: "A floating or dropdown menu containing frequently used or recommended actions. Appears in a convenient location (often corner or top) and provides one-click access to common tasks. Used to reduce navigation steps for power users and frequent operations.",

  functionalAreas: [
    "Navigation",
    "Actions"
  ],

  userIntents: [
    "Access frequent actions quickly",
    "Perform common tasks",
    "See recommended next actions",
    "Reduce navigation steps"
  ],

  exampleUseCases: [
    "Floating Action Button Menu",
    "Quick Actions Dropdown",
    "Frequent Tasks Menu",
    "Recommendations Menu",
    "Quick Create Menu",
    "Shortcut Actions",
    "Fast Access Menu"
  ],

  useWhen: [
    "Use this component to provide fast access to frequent actions.",
    "Use this component when power users benefit from shortcuts.",
    "Use this component to surface recommended next actions.",
    "Use this component to reduce clicks for common workflows."
  ],

  avoidWhen: [
    "Avoid this component without clear frequent actions.",
    "Avoid this component when actions are already easily accessible.",
    "Avoid this component in mobile apps without careful placement.",
    "Avoid this component for one-off or rarely used actions."
  ],

  relatedComponents: [
    "Menu",
    "FloatingButton",
    "Navigation"
  ]
};
