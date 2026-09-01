export default {
  purpose: "Display security status and manage account security settings.",

  description: "A dashboard showing security overview, active sessions, connected devices, and security status. Enables users to manage security settings and view security history.",

  functionalAreas: [
    "Security",
    "Configuration",
    "Visualization"
  ],

  userIntents: [
    "See security status",
    "Manage security",
    "View active sessions",
    "Understand threats"
  ],

  exampleUseCases: [
    "Account Security Page",
    "Security Overview",
    "Session Management",
    "Device Management",
    "Activity Log",
    "Security Settings",
    "Protection Status"
  ],

  useWhen: [
    "Use this component to show security status.",
    "Use this component for security management.",
    "Use this component with session and device list.",
    "Use this component in security-conscious applications."
  ],

  avoidWhen: [
    "Avoid this component without proper security data.",
    "Avoid this component in non-security contexts.",
    "Avoid this component without clear visualization.",
    "Avoid this component without security update capability."
  ],

  relatedComponents: [
    "SecuritySettings",
    "Audit",
    "Settings"
  ]
};
