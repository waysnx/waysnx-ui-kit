export default {
  purpose: "Provide zoom in/out controls for interactive visualizations.",

  description: "A component that displays zoom controls (plus/minus buttons or slider) to adjust magnification of visualizations, maps, or drawings. Often includes fit-to-view and reset options.",

  functionalAreas: [
    "Visualization",
    "Actions"
  ],

  userIntents: [
    "Zoom in to details",
    "Zoom out for overview",
    "Fit content to view",
    "Reset zoom level"
  ],

  exampleUseCases: [
    "Map Zoom",
    "Diagram Zoom",
    "Image Zoom",
    "Canvas Zoom",
    "Visualization Zoom",
    "Drawing Canvas",
    "Document Zoom"
  ],

  useWhen: [
    "Use this component for interactive zoom functionality.",
    "Use this component in maps, diagrams, or drawings.",
    "Use this component with fit-to-view and reset options.",
    "Use this component when users need to zoom frequently."
  ],

  avoidWhen: [
    "Avoid this component without interactive zoom capability.",
    "Avoid this component when zoom is not beneficial.",
    "Avoid this component without proper zoom bounds.",
    "Avoid this component without good performance."
  ],

  relatedComponents: [
    "MapView",
    "ImageViewer",
    "Canvas"
  ]
};
