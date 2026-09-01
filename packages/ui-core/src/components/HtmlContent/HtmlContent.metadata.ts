export default {
  purpose: "Display sanitized HTML content safely within the application interface.",

  description: "A component for rendering HTML content that has been sanitized to prevent security vulnerabilities. Automatically strips dangerous HTML tags and attributes while preserving safe formatting elements like headings, lists, and links. Useful for displaying user-generated or dynamic HTML content with controlled markup support.",

  functionalAreas: [
    "Visualization",
    "Communication",
    "Feedback"
  ],

  userIntents: [
    "View formatted content with structure",
    "Read documents with rich formatting",
    "Display styled information",
    "View previews of HTML content"
  ],

  exampleUseCases: [
    "Display Blog Post",
    "Show User Guide",
    "Render Help Documentation",
    "Display Email Content Preview",
    "Show API Documentation",
    "Display Formatted Descriptions"
  ],

  useWhen: [
    "Use this component when displaying HTML content with security concerns.",
    "Use this component when safe HTML formatting enhances readability.",
    "Use this component when user-generated HTML must be displayed safely.",
    "Use this component when dynamic content requires rich formatting."
  ],

  avoidWhen: [
    "Avoid this component when plain text is sufficient.",
    "Avoid this component when complex styling or scripting is required.",
    "Avoid this component without proper sanitization configuration.",
    "Avoid this component for interactive HTML requiring script execution."
  ],

  relatedComponents: [
    "HtmlEditor",
    "Image",
    "Link"
  ]
};
