export default {
  purpose: "Display interactive map with markers, overlays, and navigation.",

  description: "A map display component that renders geographic maps with markers, overlays, and interactive controls. Supports zooming, panning, and marker clustering. Used for location-based features, routing, and geographic visualization.",

  functionalAreas: [
    "Visualization",
    "Navigation"
  ],

  userIntents: [
    "View map",
    "See location",
    "Navigate map",
    "Find place"
  ],

  exampleUseCases: [
    "Location Display",
    "Store Locator",
    "Delivery Map",
    "Route Display",
    "Geographic Data",
    "Asset Location",
    "Service Area Map"
  ],

  useWhen: [
    "Use this component to display geographic locations and maps.",
    "Use this component for location-based features.",
    "Use this component with markers and overlays for points of interest.",
    "Use this component for route visualization or navigation."
  ],

  avoidWhen: [
    "Avoid this component without proper map library integration.",
    "Avoid this component for simple direction display (use Breadcrumb instead).",
    "Avoid this component without proper API keys or services.",
    "Avoid this component on devices without map support."
  ],

  relatedComponents: [
    "LocationPicker",
    "MapMarker",
    "RoutePlanner"
  ]
};
