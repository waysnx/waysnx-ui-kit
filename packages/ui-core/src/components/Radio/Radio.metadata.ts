export default {
  purpose: "Enable users to select exactly one option from a list of mutually exclusive choices.",

  description: "A control for selecting a single value from a predefined set of mutually exclusive options. Options are displayed together for quick comparison and selection. Supports dynamic option loading and layout variations including single or multi-column arrangements. Visual feedback immediately shows the selected option.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Selection"
  ],

  userIntents: [
    "Select one option from a list",
    "Choose a preference or setting",
    "Indicate a status or classification",
    "Make a binary or multi-option choice"
  ],

  exampleUseCases: [
    "Choose Shipment Method",
    "Select Priority Level",
    "Choose Account Type",
    "Select Gender",
    "Choose Notification Preference",
    "Select Availability"
  ],

  useWhen: [
    "Use this component when users must select exactly one option from a list.",
    "Use this component when all options should be visible for comparison.",
    "Use this component when there are typically 3-5 mutually exclusive choices.",
    "Use this component when space permits displaying all options without scrolling."
  ],

  avoidWhen: [
    "Avoid this component when multiple selections are allowed (use Checkbox instead).",
    "Avoid this component when there are many options (use Select instead).",
    "Avoid this component when options need to be hidden until selected.",
    "Avoid this component when space is severely limited."
  ],

  relatedComponents: [
    "Checkbox",
    "Select",
    "Switch"
  ]
};
