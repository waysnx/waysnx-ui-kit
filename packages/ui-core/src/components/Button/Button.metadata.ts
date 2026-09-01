export default {
  purpose: "Enable users to trigger actions by pressing a clickable element.",

  description: "A clickable control that initiates an action when activated by the user. Supports semantic variants to communicate action importance and context, helping users understand the consequence or priority of the action they are about to take. Enables consistent interaction patterns across different types of actions.",

  functionalAreas: [
    "Actions",
    "Workflow"
  ],

  userIntents: [
    "Submit a form",
    "Execute an action",
    "Navigate to another location",
    "Confirm or cancel an operation",
    "Delete or remove content",
    "Save or apply changes"
  ],

  exampleUseCases: [
    "Submit Form",
    "Search Trigger",
    "Confirm Dialog",
    "Delete Confirmation",
    "Save Changes",
    "Close Panel",
    "Clear Form",
    "Apply Filter"
  ],

  useWhen: [
    "Use this component when users need to trigger an immediate action.",
    "Use this component when you need to communicate action importance through semantic variants.",
    "Use this component when the action is optional and user-initiated.",
    "Use this component when you need multiple action options at different semantic levels."
  ],

  avoidWhen: [
    "Avoid this component when the primary purpose is navigation between pages.",
    "Avoid this component when content should be static or read-only.",
    "Avoid this component when the interaction requires complex multi-step workflows.",
    "Avoid this component when the action is automatic or system-initiated."
  ],

  relatedComponents: [
    "Link",
    "IconButton"
  ]
};
