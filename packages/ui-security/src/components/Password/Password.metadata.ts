export default {
  purpose: "Manage password input, validation, and strength assessment.",

  description: "A component suite for password handling including secure input, strength meter, validation, and generation. Provides visual feedback on password quality and requirements.",

  functionalAreas: [
    "Security",
    "Data Entry",
    "Forms"
  ],

  userIntents: [
    "Create strong password",
    "Know password requirements",
    "See password strength",
    "Generate secure password"
  ],

  exampleUseCases: [
    "Password Input",
    "Password Strength",
    "Password Generator",
    "Registration Form",
    "Password Change",
    "Security Setup",
    "Credential Creation"
  ],

  useWhen: [
    "Use this component for secure password input.",
    "Use this component with strength meter.",
    "Use this component with requirement validation.",
    "Use this component with password generator integration."
  ],

  avoidWhen: [
    "Avoid this component without proper encryption.",
    "Avoid this component with weak requirements.",
    "Avoid this component without server-side validation.",
    "Avoid this component without show/hide toggle."
  ],

  relatedComponents: [
    "Input",
    "Form",
    "Authentication"
  ]
};
