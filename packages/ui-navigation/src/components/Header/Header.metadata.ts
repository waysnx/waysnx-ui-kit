export default {
  purpose: "Display application or site header with branding and navigation.",

  description: "The top-level header component for applications and websites containing logo, site name, and navigation elements. Often includes user profile access, search, and other utility functions. Sets the context and provides key navigation entry points.",

  functionalAreas: [
    "Navigation",
    "Layout"
  ],

  userIntents: [
    "See application name or branding",
    "Access main navigation",
    "Return to home",
    "Access user account options"
  ],

  exampleUseCases: [
    "Website Header",
    "Application Header",
    "Site Navigation Header",
    "App Top Bar",
    "Header with Logo",
    "Navigation Header",
    "Branded Header"
  ],

  useWhen: [
    "Use this component at the top of pages as the main header.",
    "Use this component to establish branding and navigation context.",
    "Use this component to include logo, navigation, and user options.",
    "Use this component as a persistent page element across sections."
  ],

  avoidWhen: [
    "Avoid this component for sub-pages without branding needs.",
    "Avoid this component when space is extremely limited.",
    "Avoid this component for temporary or contextual headers.",
    "Avoid this component for footer or secondary headers."
  ],

  relatedComponents: [
    "Navbar",
    "Navigation",
    "Menu"
  ]
};
