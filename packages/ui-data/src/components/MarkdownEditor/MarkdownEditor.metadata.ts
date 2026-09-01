export default {
  purpose: "Enable authoring of markdown content with visual preview.",

  description: "A markdown editor component with split-pane view showing markdown source and live preview. Supports common markdown formatting with toolbar buttons or keyboard shortcuts. Useful for writing documentation, blog posts, comments, or any markdown content.",

  functionalAreas: [
    "Data Entry",
    "Forms"
  ],

  userIntents: [
    "Write markdown content",
    "Preview formatted output",
    "Use formatting helpers",
    "Author rich text"
  ],

  exampleUseCases: [
    "Blog Post Editor",
    "Documentation Editor",
    "Comment Editor",
    "Note Taker",
    "README Editor",
    "Rich Text Input",
    "Content Editor"
  ],

  useWhen: [
    "Use this component when users need to author markdown content.",
    "Use this component when live preview helps understanding formatting.",
    "Use this component for documentation or content creation.",
    "Use this component when markdown is preferred over WYSIWYG."
  ],

  avoidWhen: [
    "Avoid this component for simple text input (use TextField instead).",
    "Avoid this component when users prefer WYSIWYG editing (use RichEditor instead).",
    "Avoid this component without markdown syntax knowledge.",
    "Avoid this component on mobile without proper responsive design."
  ],

  relatedComponents: [
    "MarkdownViewer",
    "CodeEditor",
    "RichTextEditor"
  ]
};
