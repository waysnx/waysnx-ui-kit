export default {
  purpose: "Enable drawing and editing geographic boundaries on a map.",

  description: "An interactive component that allows users to draw, edit, and manage geofences (geographic boundaries) on a map. Supports polygon, circle, and other shape tools. Used for service areas, delivery zones, and location-based features.",

  functionalAreas: [
    "Data Entry",
    "Visualization"
  ],

  userIntents: [
    "Define service area",
    "Draw boundary",
    "Edit service zone",
    "Set delivery area"
  ],

  exampleUseCases: [
    "Service Area Definition",
    "Delivery Zone",
    "Geofence Management",
    "Coverage Area",
    "Territory Management",
    "Zone Editor",
    "Location Boundary"
  ],

  useWhen: [
    "Use this component for defining geographic boundaries.",
    "Use this component in location-based service applications.",
    "Use this component for service area or territory management.",
    "Use this component with drawing tools and shape editing."
  ],

  avoidWhen: [
    "Avoid this component without proper map library.",
    "Avoid this component without drawing tool support.",
    "Avoid this component for simple location marking (use MapMarker instead).",
    "Avoid this component without backend geofence processing."
  ],

  relatedComponents: [
    "MapView",
    "LocationPicker",
    "MapMarker"
  ]
};
