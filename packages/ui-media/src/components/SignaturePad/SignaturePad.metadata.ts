export default {
  purpose: "Enable users to draw or write signatures.",

  description: "An interactive canvas component where users can draw signatures using mouse or touch input. Captures freehand drawing for signature capture, approval workflows, or form signing. Supports clearing, resizing, and saving as image.",

  functionalAreas: [
    "Data Entry",
    "Forms"
  ],

  userIntents: [
    "Sign document",
    "Provide approval",
    "Create signature",
    "Draw on canvas"
  ],

  exampleUseCases: [
    "Digital Signature",
    "Document Signing",
    "Approval Workflow",
    "Contract Signature",
    "Authorization",
    "Consent Form",
    "Legal Document"
  ],

  useWhen: [
    "Use this component for digital signature capture.",
    "Use this component in approval or workflow processes.",
    "Use this component for document signing.",
    "Use this component when signature authentication is needed."
  ],

  avoidWhen: [
    "Avoid this component for typed signatures (use text input instead).",
    "Avoid this component without proper legal/compliance review.",
    "Avoid this component without secure signature handling.",
    "Avoid this component on devices without touch or mouse input."
  ],

  relatedComponents: [
    "SignatureViewer",
    "Cropper",
    "Canvas"
  ]
};
