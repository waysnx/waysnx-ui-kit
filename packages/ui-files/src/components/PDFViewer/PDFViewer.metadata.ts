export default {
  purpose: "Display and navigate PDF documents with page controls and zoom functionality.",

  description: "A PDF viewer component that renders PDF files with optional toolbar for page navigation and zoom controls. Supports jumping between pages, zooming in and out, and optional thumbnail display. Provides keyboard-accessible controls and displays current page information.",

  functionalAreas: [
    "Visualization",
    "Navigation",
    "Communication"
  ],

  userIntents: [
    "View PDF documents",
    "Navigate between pages",
    "Adjust zoom level for readability",
    "Review document content"
  ],

  exampleUseCases: [
    "PDF Document Viewer",
    "Report Display",
    "Document Review",
    "Invoice Viewer",
    "Form Preview",
    "Contract Review"
  ],

  useWhen: [
    "Use this component when displaying PDF files to users.",
    "Use this component when navigation between pages is needed.",
    "Use this component when zoom controls help readability.",
    "Use this component when you need a lightweight PDF viewer."
  ],

  avoidWhen: [
    "Avoid this component without PDF.js or similar PDF rendering library.",
    "Avoid this component for editing PDFs (viewing only).",
    "Avoid this component when advanced annotation features are required.",
    "Avoid this component when handling untrusted or large PDF files without security measures."
  ],

  relatedComponents: [
    "DocumentPreview",
    "Image",
    "HtmlContent"
  ]
};
