export default {
  purpose: "Enable users to select one or more options from a dropdown list with optional search.",

  description: "A dropdown control that displays a collapsible list of selectable options. Supports single and multi-select modes with optional search filtering to quickly find options. Displays a visual count of selected items in multi-select mode and provides keyboard navigation for efficient interaction. Options can be static or dynamically loaded from external sources.",

  functionalAreas: [
    "Data Entry",
    "Filtering",
    "Selection"
  ],

  userIntents: [
    "Select one option from a list",
    "Select multiple items",
    "Find an option by searching",
    "Apply filters to a view"
  ],

  exampleUseCases: [
    "Choose Department",
    "Select Multiple Tags",
    "Filter by Status",
    "Choose Time Zone",
    "Select Categories",
    "Filter by Type"
  ],

  useWhen: [
    "Use this component when there are many options that should not all be visible at once.",
    "Use this component when users need to select one or multiple options.",
    "Use this component when search capability helps users find options quickly.",
    "Use this component when vertical space needs to be preserved."
  ],

  avoidWhen: [
    "Avoid this component when there are very few options (use Radio or Checkbox instead).",
    "Avoid this component when all options should be visible for comparison.",
    "Avoid this component when multi-select is not needed and options are few (use Radio).",
    "Avoid this component when users should not be able to search options."
  ],

  relatedComponents: [
    "Autocomplete",
    "Radio",
    "Checkbox"
  ]
};
