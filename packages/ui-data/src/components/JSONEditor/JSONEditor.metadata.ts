export default {
  purpose: "Enable editing and validation of JSON data.",

  description: "A specialized code editor for JSON with syntax highlighting, validation, error reporting, and pretty-printing capabilities. Helps users author valid JSON with visual feedback on structure and errors. Often includes tree view and formatting options.",

  functionalAreas: [
    "Data Entry",
    "Forms"
  ],

  userIntents: [
    "Edit JSON data",
    "Validate JSON structure",
    "Format JSON nicely",
    "Fix JSON errors"
  ],

  exampleUseCases: [
    "Configuration File Editor",
    "API Request Body",
    "Data Import Form",
    "Settings Editor",
    "Metadata Editor",
    "Schema Viewer",
    "JSON Data Entry"
  ],

  useWhen: [
    "Use this component when users need to edit JSON data.",
    "Use this component for configuration or settings in JSON format.",
    "Use this component when JSON validation is important.",
    "Use this component when pretty-printing improves usability."
  ],

  avoidWhen: [
    "Avoid this component for simple configuration (use form fields instead).",
    "Avoid this component without proper JSON syntax validation.",
    "Avoid this component for very large JSON files (performance issues).",
    "Avoid this component on mobile without careful layout considerations."
  ],

  relatedComponents: [
    "CodeEditor",
    "XMLViewer",
    "CodeViewer"
  ]
};
