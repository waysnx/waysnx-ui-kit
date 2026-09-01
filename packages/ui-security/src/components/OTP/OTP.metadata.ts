export default {
  purpose: "Enable one-time password entry for multi-factor authentication.",

  description: "A specialized input component for entering one-time passwords (OTP) sent via SMS, email, or authenticator apps. Provides secure input with masked characters and paste detection.",

  functionalAreas: [
    "Authentication",
    "Security",
    "Data Entry"
  ],

  userIntents: [
    "Enter OTP code",
    "Complete verification",
    "Authenticate",
    "Verify identity"
  ],

  exampleUseCases: [
    "SMS OTP Input",
    "Email OTP",
    "Multi-factor Auth",
    "Account Recovery",
    "Login Verification",
    "Security Verification",
    "Two-factor Auth"
  ],

  useWhen: [
    "Use this component for OTP entry in multi-factor authentication.",
    "Use this component with secure input masking.",
    "Use this component with auto-fill support.",
    "Use this component in security-critical authentication."
  ],

  avoidWhen: [
    "Avoid this component without OTP generation backend.",
    "Avoid this component for non-authentication uses.",
    "Avoid this component without proper security practices.",
    "Avoid this component without time limit and expiration."
  ],

  relatedComponents: [
    "MFA",
    "Authentication",
    "Input"
  ]
};
