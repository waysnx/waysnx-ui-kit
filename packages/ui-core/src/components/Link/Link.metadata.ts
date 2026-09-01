export default {
  purpose: "Navigate users to a different page or external resource via a clickable text link.",

  description: "An interactive link element for page navigation and deep linking to external resources. Enforces safe URL protocols (https, mailto, relative paths) to prevent security issues. Supports disabled state, target window configuration, and active link highlighting. Provides optional prepend and append text for contextual information.",

  functionalAreas: [
    "Navigation",
    "Actions",
    "Communication"
  ],

  userIntents: [
    "Navigate to another page",
    "Open an external website",
    "Send an email",
    "Jump to a section",
    "Access related content"
  ],

  exampleUseCases: [
    "Navigation Menu",
    "Breadcrumb Trail",
    "Related Links",
    "Email Contact",
    "External Documentation",
    "Inline Text Link"
  ],

  useWhen: [
    "Use this component when navigation between pages is the primary action.",
    "Use this component when opening external resources is needed.",
    "Use this component for email links or other special protocols.",
    "Use this component when link state (active, visited, disabled) needs indication."
  ],

  avoidWhen: [
    "Avoid this component when the primary action is non-navigational (use Button instead).",
    "Avoid this component when opening untrusted URLs without validation.",
    "Avoid this component for form submission or data actions.",
    "Avoid this component when the target is not a real resource."
  ],

  relatedComponents: [
    "Button",
    "IFrame"
  ]
};
