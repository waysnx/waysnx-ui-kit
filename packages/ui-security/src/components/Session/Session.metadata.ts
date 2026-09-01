export default {
  purpose: "Manage user sessions and handle timeouts.",

  description: "A component that manages user sessions, tracks activity, handles session timeouts, and prompts for re-authentication. Shows session status and remaining time.",

  functionalAreas: [
    "Security",
    "Authentication"
  ],

  userIntents: [
    "Know session status",
    "Extend session",
    "Receive timeout warning",
    "Maintain secure access"
  ],

  exampleUseCases: [
    "Session Timeout",
    "Activity Tracker",
    "Re-authentication",
    "Session Warning",
    "Idle Timeout",
    "Security Session",
    "Access Protection"
  ],

  useWhen: [
    "Use this component for session management.",
    "Use this component with timeout protection.",
    "Use this component with inactivity tracking.",
    "Use this component in security-critical applications."
  ],

  avoidWhen: [
    "Avoid this component for casual applications.",
    "Avoid this component with excessive timeout prompts.",
    "Avoid this component without proper session storage.",
    "Avoid this component without server-side validation."
  ],

  relatedComponents: [
    "Authentication",
    "Authorization",
    "UserMenu"
  ]
};
