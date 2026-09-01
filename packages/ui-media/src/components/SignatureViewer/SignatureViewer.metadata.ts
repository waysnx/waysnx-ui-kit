export default {
  purpose: "Display captured signatures for verification or review.",

  description: "A component that displays previously captured or uploaded signature images. Used for viewing signatures in documents, approval records, or verification processes. Often includes zoom and download capabilities.",

  functionalAreas: [
    "Visualization",
    "Data Entry"
  ],

  userIntents: [
    "View signature",
    "Verify signature",
    "Review approval",
    "See signature image"
  ],

  exampleUseCases: [
    "Signature Review",
    "Approval Record",
    "Document Signature View",
    "Contract Review",
    "Authorization Record",
    "Signature Verification",
    "Audit Trail"
  ],

  useWhen: [
    "Use this component to display captured signatures.",
    "Use this component for signature verification or review.",
    "Use this component in approval workflows.",
    "Use this component with zoom and interaction capabilities."
  ],

  avoidWhen: [
    "Avoid this component for signature capture (use SignaturePad instead).",
    "Avoid this component without image display capabilities.",
    "Avoid this component for simple text display.",
    "Avoid this component without proper image handling."
  ],

  relatedComponents: [
    "SignaturePad",
    "ImageViewer",
    "Document"
  ]
};
