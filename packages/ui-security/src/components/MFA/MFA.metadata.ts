export default {
  purpose: "Orchestrate multi-factor authentication workflows.",

  description: "A component that manages multi-factor authentication (MFA) flows. Coordinates multiple verification methods, tracks completion, and enforces MFA policies. Commonly used in security-critical applications.",

  functionalAreas: [
    "Authentication",
    "Security"
  ],

  userIntents: [
    "Complete authentication",
    "Verify with multiple factors",
    "Secure account access",
    "Follow security requirements"
  ],

  exampleUseCases: [
    "Two-factor Authentication",
    "Multi-factor Login",
    "Enhanced Security",
    "Account Protection",
    "Admin Access",
    "Sensitive Action",
    "Security Verification"
  ],

  useWhen: [
    "Use this component for multi-factor authentication.",
    "Use this component in security-critical applications.",
    "Use this component with multiple factor options.",
    "Use this component with proper factor coordination."
  ],

  avoidWhen: [
    "Avoid this component for low-security contexts.",
    "Avoid this component without proper backend support.",
    "Avoid this component with confusing factor workflows.",
    "Avoid this component without clear user guidance."
  ],

  relatedComponents: [
    "Authentication",
    "OTP",
    "Verification"
  ]
};
