export default {
  purpose: "Allow users to select one or more options from a list of independent choices.",

  description: "A control that enables selecting multiple independent items. Supports both single-checkbox and checkbox-group modes for different use cases. Can be configured with dynamic options loaded from external sources or static predefined lists. Provides visual feedback of selected state and supports layout variations.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Selection"
  ],

  userIntents: [
    "Toggle a single condition or feature on or off",
    "Select multiple items from a list",
    "Agree to terms or conditions",
    "Enable or disable settings"
  ],

  exampleUseCases: [
    "Accept Terms",
    "Select Permissions",
    "Choose Interests",
    "Enable Features",
    "Select Multiple Categories",
    "Filter by Options"
  ],

  useWhen: [
    "Use this component when users can select zero, one, or multiple independent options.",
    "Use this component when all available choices should be visible without scrolling.",
    "Use this component when user agreement or enablement of features is required.",
    "Use this component when space permits displaying all options at once."
  ],

  avoidWhen: [
    "Avoid this component when only one option can be selected (use Radio instead).",
    "Avoid this component when there are many options that require scrolling.",
    "Avoid this component when space is extremely limited.",
    "Avoid this component when a dropdown would be more space-efficient."
  ],

  relatedComponents: [
    "Radio",
    "Switch",
    "Select"
  ]
};
