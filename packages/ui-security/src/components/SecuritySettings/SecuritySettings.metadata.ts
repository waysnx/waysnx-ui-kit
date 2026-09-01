export default {
  purpose: "Enable users to configure security preferences and policies.",

  description: "A settings interface for security preferences including password policies, 2FA options, session timeout, trusted devices, and security notifications.",

  functionalAreas: [
    "Security",
    "Configuration"
  ],

  userIntents: [
    "Configure security",
    "Enable 2FA",
    "Set preferences",
    "Manage security options"
  ],

  exampleUseCases: [
    "Security Preferences",
    "2FA Setup",
    "Password Policy",
    "Session Timeout Config",
    "Device Trust",
    "Notification Settings",
    "Security Options"
  ],

  useWhen: [
    "Use this component for security preference configuration.",
    "Use this component with multiple security options.",
    "Use this component with clear descriptions.",
    "Use this component with confirmation for critical changes."
  ],

  avoidWhen: [
    "Avoid this component without clear security implications.",
    "Avoid this component with confusing options.",
    "Avoid this component without proper server validation.",
    "Avoid this component for non-security settings."
  ],

  relatedComponents: [
    "SecurityDashboard",
    "Settings",
    "Configuration"
  ]
};
