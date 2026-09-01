export default {
  purpose: "Display and allow interaction with images in fullscreen or modal.",

  description: "A component for viewing images with zoom, pan, rotation, and fullscreen capabilities. Often used for displaying galleries or product images with lightbox functionality. Supports keyboard navigation and touch gestures.",

  functionalAreas: [
    "Visualization",
    "Data Entry"
  ],

  userIntents: [
    "View image in detail",
    "Zoom into image",
    "See full size image",
    "Navigate through images"
  ],

  exampleUseCases: [
    "Image Lightbox",
    "Gallery Viewer",
    "Product Image",
    "Document Image",
    "Photo Viewer",
    "Preview Fullscreen",
    "Media Gallery"
  ],

  useWhen: [
    "Use this component for detailed image viewing.",
    "Use this component in galleries or lightbox interfaces.",
    "Use this component when zoom and pan are important.",
    "Use this component for high-resolution image display."
  ],

  avoidWhen: [
    "Avoid this component for simple thumbnail display (use Image instead).",
    "Avoid this component without proper image loading optimization.",
    "Avoid this component without zoom/pan functionality.",
    "Avoid this component for extremely large image files."
  ],

  relatedComponents: [
    "Cropper",
    "Barcode",
    "QRCode"
  ]
};
