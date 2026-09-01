export default {
  purpose: "Enable users to create and format HTML content with a visual text editor toolbar.",

  description: "A content-editable text editor with formatting toolbar for bold, italic, links, lists, and heading styles. Provides real-time content preview as users type and sanitizes content on input to prevent injection attacks. Supports configurable minimum height and toolbar button selection for flexible formatting options.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Communication"
  ],

  userIntents: [
    "Write formatted content",
    "Create documents with styling",
    "Add rich text to forms",
    "Format email or message content"
  ],

  exampleUseCases: [
    "Email Composer",
    "Blog Post Editor",
    "Description Editor",
    "Comment with Formatting",
    "News Article Entry",
    "Help Article Creator"
  ],

  useWhen: [
    "Use this component when users need to format text content.",
    "Use this component when rich text improves content quality.",
    "Use this component when a visual editor simplifies formatting.",
    "Use this component when HTML output is required from user input."
  ],

  avoidWhen: [
    "Avoid this component when plain text input is sufficient.",
    "Avoid this component for highly structured or complex HTML.",
    "Avoid this component when real-time collaboration is needed.",
    "Avoid this component for content requiring CSS or style customization."
  ],

  relatedComponents: [
    "Textarea",
    "HtmlContent",
    "Input"
  ]
};
