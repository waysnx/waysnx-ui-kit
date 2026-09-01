export default {
  purpose: "Display documents and files with automatic type detection and appropriate viewers.",

  description: "A flexible document preview component that automatically detects file types and renders appropriate viewers. Supports PDFs, images, videos, audio, markdown, and code files with fallback handling for unknown types. Routes to specialized viewers from ui-media and ui-data libraries based on detected file type.",

  functionalAreas: [
    "Visualization",
    "Communication",
    "Feedback"
  ],

  userIntents: [
    "Preview document contents",
    "View file before download",
    "Display document with appropriate viewer",
    "Verify file types and content"
  ],

  exampleUseCases: [
    "Document Library",
    "File Browser",
    "Email Attachment Preview",
    "Report Viewer",
    "Content Management",
    "File Sharing Interface"
  ],

  useWhen: [
    "Use this component when displaying various file types with automatic detection.",
    "Use this component when users need to preview documents before opening.",
    "Use this component when file type varies and appropriate viewers are needed.",
    "Use this component when fallback content helps users understand unsupported types."
  ],

  avoidWhen: [
    "Avoid this component when specialized viewers should be used directly.",
    "Avoid this component without knowing supported file types.",
    "Avoid this component when embedding untrusted or unvalidated file sources.",
    "Avoid this component for binary files or unsupported formats."
  ],

  relatedComponents: [
    "PDFViewer",
    "Image",
    "HtmlContent"
  ]
};
