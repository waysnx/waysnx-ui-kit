export default {
  purpose: "Create a two-panel layout with resizable divider.",

  description: "A layout component that divides the screen into two adjustable panels separated by a resizable divider. Users can drag the divider to adjust panel sizes while maintaining responsive behavior. Useful for comparison views, split-pane editors, or master-detail layouts.",

  functionalAreas: [
    "Layout"
  ],

  userIntents: [
    "View two panels side by side",
    "Adjust panel sizes flexibly",
    "Compare content side by side",
    "Use split-pane editing interface"
  ],

  exampleUseCases: [
    "Master-detail View",
    "Code Editor with Preview",
    "Document Editor with Preview",
    "File Tree with Content",
    "Settings with Preview",
    "Source Code Comparison",
    "Image Editor with Toolbar"
  ],

  useWhen: [
    "Use this component when users need to view two panels simultaneously.",
    "Use this component when panel size adjustment is important.",
    "Use this component for comparison or master-detail relationships.",
    "Use this component for applications like code editors or document viewers."
  ],

  avoidWhen: [
    "Avoid this component when one panel should be primary and dominant.",
    "Avoid this component on mobile or small screens where split view doesn't work.",
    "Avoid this component when tabs would suffice for switching views.",
    "Avoid this component when panels are unrelated or don't need simultaneous viewing."
  ],

  relatedComponents: [
    "Container",
    "Drawer",
    "SidebarLayout"
  ]
};
