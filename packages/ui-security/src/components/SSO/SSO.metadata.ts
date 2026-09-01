export default {
  purpose: "Enable single sign-on authentication via external providers.",

  description: "A component that integrates with SSO providers (OAuth, SAML, etc.) for seamless authentication. Shows available SSO options and handles provider authentication flows.",

  functionalAreas: [
    "Authentication",
    "Security"
  ],

  userIntents: [
    "Log in with existing account",
    "Use corporate authentication",
    "Quick sign-on",
    "Multi-provider access"
  ],

  exampleUseCases: [
    "OAuth Login",
    "Corporate SSO",
    "Social Login",
    "Enterprise Authentication",
    "Multi-provider Auth",
    "Federated Login",
    "Identity Provider Login"
  ],

  useWhen: [
    "Use this component for SSO authentication integration.",
    "Use this component with external identity providers.",
    "Use this component for enterprise applications.",
    "Use this component with multiple authentication options."
  ],

  avoidWhen: [
    "Avoid this component without proper provider configuration.",
    "Avoid this component for internal-only applications.",
    "Avoid this component without server-side validation.",
    "Avoid this component without fallback authentication."
  ],

  relatedComponents: [
    "Authentication",
    "Login",
    "MFA"
  ]
};
