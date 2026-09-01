export default {
  purpose: "Display the current navigation path and enable quick navigation to parent levels.",

  description: "A secondary navigation aid that shows the hierarchy of pages or locations in the application and current position within it. Each level is clickable for quick navigation back to parent pages. Helps users understand their location in the site structure and provides shortcuts for navigation.",

  functionalAreas: [
    "Navigation",
    "Layout"
  ],

  userIntents: [
    "Know where I am in the site",
    "Go back to parent page quickly",
    "Understand the navigation hierarchy",
    "See the path I took to get here"
  ],

  exampleUseCases: [
    "Page Navigation Hierarchy",
    "File System Path",
    "Document Hierarchy",
    "Category Navigation",
    "Multi-level Product Navigation",
    "Search Result Path",
    "Documentation Structure"
  ],

  useWhen: [
    "Use this component when your application has a hierarchical structure.",
    "Use this component to help users understand their location in a multi-level navigation.",
    "Use this component as a secondary navigation aid alongside primary navigation.",
    "Use this component in documentation or content-heavy sites with clear hierarchy."
  ],

  avoidWhen: [
    "Avoid this component in flat, non-hierarchical structures.",
    "Avoid this component as the primary navigation mechanism.",
    "Avoid this component on mobile when space is extremely limited.",
    "Avoid this component for single-level applications."
  ],

  relatedComponents: [
    "Navigation",
    "Tabs",
    "Menu"
  ]
};
