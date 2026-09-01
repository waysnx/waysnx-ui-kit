export default {
  purpose: "Enable cropping and editing of images.",

  description: "An interactive component that allows users to crop, resize, and rotate images. Provides visual feedback with draggable handles and adjustable crop area. Often used in image upload workflows or photo editing applications.",

  functionalAreas: [
    "Data Entry",
    "Visualization"
  ],

  userIntents: [
    "Crop image",
    "Resize image",
    "Rotate image",
    "Edit image"
  ],

  exampleUseCases: [
    "Profile Picture Upload",
    "Avatar Cropping",
    "Image Editing",
    "Photo Adjustment",
    "Thumbnail Generation",
    "Document Scanning",
    "Image Refinement"
  ],

  useWhen: [
    "Use this component in image upload workflows.",
    "Use this component when users need to refine image composition.",
    "Use this component for avatar or profile picture selection.",
    "Use this component with crop preset dimensions or aspect ratios."
  ],

  avoidWhen: [
    "Avoid this component without proper image library.",
    "Avoid this component for read-only image display (use ImageViewer instead).",
    "Avoid this component without preview functionality.",
    "Avoid this component for complex image editing (use full editor instead)."
  ],

  relatedComponents: [
    "ImageViewer",
    "Upload",
    "SignaturePad"
  ]
};
