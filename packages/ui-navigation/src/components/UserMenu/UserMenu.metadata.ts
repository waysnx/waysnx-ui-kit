export default {
  purpose: "Display user profile and account-related options.",

  description: "A specialized menu component typically in the header or top-right corner showing user name/avatar and account options. Provides quick access to profile, settings, and logout functionality. Usually triggered by clicking user avatar or name.",

  functionalAreas: [
    "Navigation",
    "Authentication"
  ],

  userIntents: [
    "See current user",
    "Access user profile",
    "Change account settings",
    "Log out"
  ],

  exampleUseCases: [
    "User Account Menu",
    "Profile Dropdown",
    "Account Options",
    "User Settings Menu",
    "Avatar Menu",
    "Account Switcher",
    "User Actions Menu"
  ],

  useWhen: [
    "Use this component for user account and profile options.",
    "Use this component in application header for persistent access.",
    "Use this component to provide quick access to settings and logout.",
    "Use this component when users need to switch accounts."
  ],

  avoidWhen: [
    "Avoid this component without user authentication.",
    "Avoid this component without clear triggering element.",
    "Avoid this component with too many unrelated options.",
    "Avoid this component without proper security for sensitive actions."
  ],

  relatedComponents: [
    "Menu",
    "Header",
    "Navigation"
  ]
};
