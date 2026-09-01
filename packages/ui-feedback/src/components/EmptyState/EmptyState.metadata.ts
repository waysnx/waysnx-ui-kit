export default {
  purpose: "Show a clear message when no data is available to display.",

  description: "A full-page or container-sized message displayed when a view has no content to show. Includes optional icon, title, description, and action to help users understand why the view is empty and what they can do next. Transforms an empty state into an opportunity to guide users or suggest next steps.",

  functionalAreas: [
    "Feedback",
    "Data Entry"
  ],

  userIntents: [
    "Understand why content is missing",
    "Find next action to populate content",
    "Create first item or start workflow",
    "Troubleshoot why data is absent"
  ],

  exampleUseCases: [
    "No Search Results",
    "Empty List Message",
    "No Data Available",
    "First Time User State",
    "Completed Task State",
    "Filter Returned Nothing",
    "Empty Inbox State"
  ],

  useWhen: [
    "Use this component when a list or data view contains no items.",
    "Use this component to guide users on how to populate the view.",
    "Use this component to explain why a view is empty (e.g., no search results).",
    "Use this component with an action button to help users get started."
  ],

  avoidWhen: [
    "Avoid this component when some content should still be visible.",
    "Avoid this component for error states (use Alert instead).",
    "Avoid this component when loading data (use Skeleton or Spinner instead).",
    "Avoid this component with overly complex explanations or too many actions."
  ],

  relatedComponents: [
    "Alert",
    "Button",
    "Skeleton"
  ]
};
