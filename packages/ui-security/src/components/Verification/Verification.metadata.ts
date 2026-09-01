export default {
  purpose: "Manage user verification processes and confirm identity.",

  description: "A component suite for handling identity verification workflows. Supports multiple verification methods (email, phone, biometric). Shows verification status and guides users through verification steps.",

  functionalAreas: [
    "Authentication",
    "Security"
  ],

  userIntents: [
    "Verify identity",
    "Confirm account",
    "Complete verification",
    "Know verification status"
  ],

  exampleUseCases: [
    "Email Verification",
    "Phone Verification",
    "Multi-factor Verification",
    "Identity Confirmation",
    "Account Activation",
    "Security Verification",
    "Access Verification"
  ],

  useWhen: [
    "Use this component for identity verification workflows.",
    "Use this component with multiple verification methods.",
    "Use this component with status feedback.",
    "Use this component in security-critical applications."
  ],

  avoidWhen: [
    "Avoid this component without proper security implementation.",
    "Avoid this component for optional verification.",
    "Avoid this component without clear process guidance.",
    "Avoid this component without proper backend validation."
  ],

  relatedComponents: [
    "Authentication",
    "OTP",
    "MFA"
  ]
};
