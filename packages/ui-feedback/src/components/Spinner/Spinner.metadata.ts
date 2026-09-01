export default {
  purpose: "Show indeterminate progress or loading activity.",

  description: "An animated spinning icon that indicates a background process is running or data is loading, without showing specific progress. Used when the duration of an operation is unknown or progress cannot be measured. Available in multiple sizes and colors to fit various contexts and layout requirements.",

  functionalAreas: [
    "Feedback",
    "Visualization"
  ],

  userIntents: [
    "Know that loading is happening",
    "Understand system is processing",
    "Wait for async operation to complete",
    "See visual feedback during latency"
  ],

  exampleUseCases: [
    "Page Loading",
    "Data Fetching",
    "API Request Processing",
    "Background Task Indicator",
    "Form Submission Loading",
    "Modal Content Loading",
    "Search Results Loading"
  ],

  useWhen: [
    "Use this component when progress duration or percentage cannot be determined.",
    "Use this component for background processes or async operations.",
    "Use this component to indicate that the application is responsive and processing.",
    "Use this component in small, compact spaces where a spinner fits better than a progress bar."
  ],

  avoidWhen: [
    "Avoid this component when you can measure and display specific progress (use Progress instead).",
    "Avoid this component for operations that complete instantly.",
    "Avoid this component without accompanying text explaining what is loading.",
    "Avoid this component in places where user input is still expected."
  ],

  relatedComponents: [
    "Progress",
    "CircularProgress",
    "Skeleton"
  ]
};
