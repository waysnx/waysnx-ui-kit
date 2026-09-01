export default {
  purpose: "Scan and extract text from images or documents.",

  description: "A component that uses optical character recognition (OCR) to extract text from camera input or uploaded images. Converts images of text into editable text. Used in document digitization, form automation, and accessibility.",

  functionalAreas: [
    "Data Entry",
    "Visualization"
  ],

  userIntents: [
    "Extract text from image",
    "Digitize document",
    "Scan receipt",
    "Convert image to text"
  ],

  exampleUseCases: [
    "Document Scanning",
    "Receipt Digitization",
    "Business Card Extraction",
    "Form Automation",
    "Text Recognition",
    "Document Upload",
    "Accessibility"
  ],

  useWhen: [
    "Use this component to extract text from images or documents.",
    "Use this component for document digitization workflows.",
    "Use this component when users need to input text from images.",
    "Use this component with automatic text detection."
  ],

  avoidWhen: [
    "Avoid this component without OCR library.",
    "Avoid this component for manual text input (use text field instead).",
    "Avoid this component without proper accuracy for use case.",
    "Avoid this component for highly formatted documents."
  ],

  relatedComponents: [
    "BarcodeScanner",
    "ImageViewer",
    "Upload"
  ]
};
