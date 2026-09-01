export default {
  purpose: "Enable users to search and select from a filtered list of options as they type.",

  description: "A text input field that filters available options in real-time as the user types, narrowing down choices to matching values. Supports dynamic option loading from external sources and keyboard navigation for efficient selection. Helps users quickly find the right option without scrolling through entire lists.",

  functionalAreas: [
    "Data Entry",
    "Filtering",
    "Search"
  ],

  userIntents: [
    "Find an option by typing a partial value",
    "Quickly narrow down a large list of choices",
    "Select from dynamically loaded options",
    "Complete a field with predictive suggestions"
  ],

  exampleUseCases: [
    "Country Selection",
    "Search Product Catalog",
    "Select User from Directory",
    "Find Team Member",
    "Lookup Organization",
    "Search Location"
  ],

  useWhen: [
    "Use this component when users need to select from a large list and benefit from search.",
    "Use this component when filtering options in real-time improves usability.",
    "Use this component when options may need to be loaded dynamically from a server.",
    "Use this component when users are familiar with autocomplete patterns."
  ],

  avoidWhen: [
    "Avoid this component when the list of options is very short (use Select instead).",
    "Avoid this component when options are frequently updated or highly dynamic without caching.",
    "Avoid this component when users cannot type to filter (use Select with manual navigation).",
    "Avoid this component when exact matches are not typical user inputs."
  ],

  relatedComponents: [
    "Select",
    "Input",
    "Link"
  ]
};
