export default {
  purpose: "Display and navigate XML data with hierarchical tree view.",

  description: "A component for viewing XML content with syntax highlighting and collapsible tree structure. Shows XML hierarchy visually, making it easier to understand structure. Supports expand/collapse of nodes and optional search or filtering.",

  functionalAreas: [
    "Data Entry",
    "Visualization"
  ],

  userIntents: [
    "View XML structure",
    "Navigate XML hierarchy",
    "Understand XML content",
    "Find specific elements"
  ],

  exampleUseCases: [
    "XML Response Viewer",
    "Configuration File View",
    "XML Data Display",
    "Document Structure View",
    "API Response Viewer",
    "Feed Viewer",
    "Markup Viewer"
  ],

  useWhen: [
    "Use this component to display XML with hierarchical structure.",
    "Use this component when users need to navigate XML tree.",
    "Use this component for read-only XML display.",
    "Use this component to help understand XML document structure."
  ],

  avoidWhen: [
    "Avoid this component for editing XML (use CodeEditor instead).",
    "Avoid this component when flat code display is sufficient.",
    "Avoid this component for extremely large XML files.",
    "Avoid this component without proper tree expansion performance."
  ],

  relatedComponents: [
    "CodeViewer",
    "JSONEditor",
    "TreeMenu"
  ]
};
