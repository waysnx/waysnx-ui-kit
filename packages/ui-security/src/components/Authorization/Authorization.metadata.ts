export default {
  purpose: "Manage permissions and control access to features.",

  description: "A component for enforcing authorization and permission-based access control. Hides or disables UI elements based on user permissions. Used for role-based access control (RBAC) and feature flags.",

  functionalAreas: [
    "Security",
    "Configuration"
  ],

  userIntents: [
    "See available features",
    "Access permitted content",
    "Understand restrictions",
    "Know permissions"
  ],

  exampleUseCases: [
    "Permission-based UI",
    "Role-based Access",
    "Feature Flags",
    "Admin Features",
    "Access Control",
    "Capability Management",
    "Permission Display"
  ],

  useWhen: [
    "Use this component to control feature access by permission.",
    "Use this component with role-based access control.",
    "Use this component to hide restricted features.",
    "Use this component with feature flags."
  ],

  avoidWhen: [
    "Avoid this component for client-side-only security.",
    "Avoid this component without server-side validation.",
    "Avoid this component to hide sensitive logic.",
    "Avoid this component without proper permission system."
  ],

  relatedComponents: [
    "Authentication",
    "Settings",
    "Admin"
  ]
};
