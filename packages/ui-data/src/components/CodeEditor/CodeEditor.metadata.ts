export default {
  purpose: "Enable editing and authoring of source code with syntax support.",

  description: "An interactive code editor component with syntax highlighting, line numbers, code completion, and keyboard shortcuts. Supports multiple languages and themes. Used for writing code, scripts, queries, or any text that benefits from code-aware editing.",

  functionalAreas: [
    "Data Entry",
    "Forms"
  ],

  userIntents: [
    "Write or edit code",
    "Author scripts or queries",
    "Benefit from syntax highlighting",
    "Use keyboard shortcuts"
  ],

  exampleUseCases: [
    "SQL Query Editor",
    "JavaScript Editor",
    "Configuration File Editor",
    "Script Editor",
    "Code Snippet Editor",
    "Transformation Code",
    "Filter Expression Editor"
  ],

  useWhen: [
    "Use this component when users need to edit code or scripts.",
    "Use this component for configuration or query input.",
    "Use this component when syntax highlighting improves usability.",
    "Use this component with keyboard shortcuts for power users."
  ],

  avoidWhen: [
    "Avoid this component for simple text input (use TextField instead).",
    "Avoid this component for read-only code (use CodeViewer instead).",
    "Avoid this component without proper language support setup.",
    "Avoid this component on mobile (limited space and keyboard challenges)."
  ],

  relatedComponents: [
    "CodeViewer",
    "JSONEditor",
    "TextArea"
  ]
};
