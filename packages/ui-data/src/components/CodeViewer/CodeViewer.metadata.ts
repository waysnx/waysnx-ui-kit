export default {
  purpose: "Display read-only source code with syntax highlighting.",

  description: "A code display component that shows source code with syntax highlighting, line numbers, and optional copy-to-clipboard functionality. Used for documentation, code examples, logs, and other read-only code display needs. Supports multiple languages and themes.",

  functionalAreas: [
    "Data Entry",
    "Visualization"
  ],

  userIntents: [
    "View source code",
    "See code examples",
    "Copy code snippet",
    "Understand code structure"
  ],

  exampleUseCases: [
    "Code Example Display",
    "Syntax-Highlighted Code",
    "Documentation Code",
    "API Response Viewer",
    "Log Viewer",
    "Snippet Display",
    "Code Snippet Preview"
  ],

  useWhen: [
    "Use this component to display read-only code with syntax highlighting.",
    "Use this component in documentation or educational content.",
    "Use this component for logs, responses, or other code output.",
    "Use this component when users need to copy code examples."
  ],

  avoidWhen: [
    "Avoid this component when code should be editable (use CodeEditor instead).",
    "Avoid this component for inline code (use code tag instead).",
    "Avoid this component without proper syntax highlighting setup.",
    "Avoid this component for extremely long files (consider pagination)."
  ],

  relatedComponents: [
    "CodeEditor",
    "JSONEditor",
    "MarkdownViewer"
  ]
};
