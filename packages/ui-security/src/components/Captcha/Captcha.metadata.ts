export default {
  purpose: "Verify users are human and prevent bot abuse.",

  description: "A CAPTCHA component that presents challenges to verify human users. Supports various challenge types (image, text, puzzle). Protects forms and actions from automated abuse and brute force attacks.",

  functionalAreas: [
    "Security",
    "Authentication"
  ],

  userIntents: [
    "Prove I'm human",
    "Complete verification",
    "Access form",
    "Unlock action"
  ],

  exampleUseCases: [
    "Form CAPTCHA",
    "Login Protection",
    "Account Recovery",
    "Comment Form",
    "Signup Form",
    "API Protection",
    "Abuse Prevention"
  ],

  useWhen: [
    "Use this component to prevent automated abuse on forms.",
    "Use this component for public-facing authentication.",
    "Use this component to protect account recovery.",
    "Use this component with proper accessibility alternatives."
  ],

  avoidWhen: [
    "Avoid this component for internal or low-risk forms.",
    "Avoid this component without accessible alternatives.",
    "Avoid this component with confusing challenge types.",
    "Avoid this component without rate limiting fallback."
  ],

  relatedComponents: [
    "Authentication",
    "Login",
    "Form"
  ]
};
