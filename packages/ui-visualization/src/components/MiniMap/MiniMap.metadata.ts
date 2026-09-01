export default {
  purpose: "Display a zoomed-out overview of large visualizations.",

  description: "A small preview/thumbnail view that shows the full extent of a larger visualization. Includes a viewport indicator showing the currently visible area. Allows quick navigation to different parts of the main visualization.",

  functionalAreas: [
    "Visualization",
    "Navigation"
  ],

  userIntents: [
    "See full extent",
    "Know current position",
    "Navigate quickly",
    "Context awareness"
  ],

  exampleUseCases: [
    "Map Overview",
    "Diagram Overview",
    "Canvas Preview",
    "Document Overview",
    "Zoom Context",
    "Navigation Aid",
    "Content Overview"
  ],

  useWhen: [
    "Use this component in zoomed/panned visualizations.",
    "Use this component to show current viewport position.",
    "Use this component to enable quick navigation.",
    "Use this component with clickable navigation to minimap areas."
  ],

  avoidWhen: [
    "Avoid this component for simple small visualizations.",
    "Avoid this component without zoom or pan capability.",
    "Avoid this component on small screens (adds clutter).",
    "Avoid this component without proper viewport indication."
  ],

  relatedComponents: [
    "MapView",
    "ZoomControls",
    "Visualization"
  ]
};
