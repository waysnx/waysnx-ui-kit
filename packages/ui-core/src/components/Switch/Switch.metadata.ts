export default {
  purpose: "Enable users to toggle a setting or feature on or off with a visual switch.",

  description: "A toggle control that represents a binary on/off state change. Provides immediate visual feedback of the current state through animation and position. More intuitive than checkboxes for boolean settings and preferences. Supports optional label and accessibility attributes for screen readers.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Configuration"
  ],

  userIntents: [
    "Enable or disable a feature",
    "Toggle a setting on or off",
    "Activate or deactivate functionality",
    "Set a preference"
  ],

  exampleUseCases: [
    "Dark Mode Toggle",
    "Notifications Setting",
    "Email Subscriptions",
    "Feature Toggle",
    "Privacy Setting",
    "Automatic Updates"
  ],

  useWhen: [
    "Use this component when toggling a feature or setting on or off.",
    "Use this component when binary choices need immediate visual feedback.",
    "Use this component when space is limited and a compact control is preferred.",
    "Use this component for settings that activate or deactivate functionality."
  ],

  avoidWhen: [
    "Avoid this component when multiple independent selections are needed (use Checkbox instead).",
    "Avoid this component when three or more states need to be represented.",
    "Avoid this component when the action requires explicit confirmation.",
    "Avoid this component when the on/off metaphor is unclear to users."
  ],

  relatedComponents: [
    "Checkbox",
    "Radio",
    "Button"
  ]
};
