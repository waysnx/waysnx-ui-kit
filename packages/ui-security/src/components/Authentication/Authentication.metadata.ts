export default {
  purpose: "Manage user authentication and login workflows.",

  description: "A comprehensive component for handling user authentication including login forms, credential validation, session management, and error handling. Integrates with auth backends.",

  functionalAreas: [
    "Authentication",
    "Security",
    "Forms"
  ],

  userIntents: [
    "Log in to account",
    "Access application",
    "Authenticate identity",
    "Start session"
  ],

  exampleUseCases: [
    "Login Form",
    "User Authentication",
    "Access Control",
    "Session Start",
    "Credential Validation",
    "Auth Workflow",
    "Identity Verification"
  ],

  useWhen: [
    "Use this component for primary authentication workflows.",
    "Use this component with credential validation.",
    "Use this component with error handling and feedback.",
    "Use this component with secure credential transmission."
  ],

  avoidWhen: [
    "Avoid this component without proper HTTPS/secure transmission.",
    "Avoid this component with stored plain-text passwords.",
    "Avoid this component without proper rate limiting.",
    "Avoid this component for sensitive operations without MFA."
  ],

  relatedComponents: [
    "Login",
    "MFA",
    "OTP",
    "Captcha"
  ]
};
