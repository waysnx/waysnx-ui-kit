export default {
  purpose: "Display security audit logs and activity history.",

  description: "A component for viewing security-related activities, changes, and events. Shows audit trail with timestamps, actions, and affected resources. Used for compliance and security monitoring.",

  functionalAreas: [
    "Security",
    "Visualization"
  ],

  userIntents: [
    "See account activity",
    "Review security events",
    "Detect unusual activity",
    "Verify changes"
  ],

  exampleUseCases: [
    "Audit Log",
    "Activity History",
    "Security Events",
    "Login History",
    "Change Log",
    "Compliance Log",
    "System Activity"
  ],

  useWhen: [
    "Use this component for security audit trails.",
    "Use this component in compliance applications.",
    "Use this component with filterable activity log.",
    "Use this component with searchable event history."
  ],

  avoidWhen: [
    "Avoid this component without audit data.",
    "Avoid this component for non-security contexts.",
    "Avoid this component without proper data protection.",
    "Avoid this component without clear event descriptions."
  ],

  relatedComponents: [
    "SecurityDashboard",
    "Log",
    "Analytics"
  ]
};
