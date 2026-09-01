export default {
  purpose: "Display formatted markdown content as rendered HTML.",

  description: "A component for rendering markdown content into formatted HTML output. Converts markdown syntax to visual elements like headings, lists, links, tables, and code blocks. Used for displaying documentation, blog posts, help content, or user-generated markdown.",

  functionalAreas: [
    "Visualization",
    "Data Entry"
  ],

  userIntents: [
    "Read formatted content",
    "View rendered markdown",
    "See formatted documentation",
    "Read blog posts or articles"
  ],

  exampleUseCases: [
    "Blog Post Display",
    "Documentation View",
    "README Display",
    "Help Content",
    "Comment Display",
    "Article View",
    "Formatted Content Display"
  ],

  useWhen: [
    "Use this component to display markdown content as formatted HTML.",
    "Use this component for documentation or content display.",
    "Use this component when markdown source is available.",
    "Use this component for user-generated markdown content."
  ],

  avoidWhen: [
    "Avoid this component for editing (use MarkdownEditor instead).",
    "Avoid this component for plain text (use Text instead).",
    "Avoid this component without proper HTML sanitization.",
    "Avoid this component for extremely large documents without pagination."
  ],

  relatedComponents: [
    "MarkdownEditor",
    "CodeViewer",
    "Text"
  ]
};
