export default {
  purpose: "Display point of interest markers on a map.",

  description: "A component for displaying markers, pins, or icons at geographic locations on a map. Supports custom icons, clustering, and pop-up information windows. Used for marking destinations, stores, or points of interest.",

  functionalAreas: [
    "Visualization",
    "Navigation"
  ],

  userIntents: [
    "See location markers",
    "Know points of interest",
    "Identify destinations",
    "Find nearby places"
  ],

  exampleUseCases: [
    "Store Location",
    "Destination Marker",
    "Point of Interest",
    "Delivery Location",
    "Event Location",
    "Parking Spot",
    "Landmark Marker"
  ],

  useWhen: [
    "Use this component to mark locations on a map.",
    "Use this component for store locators or POI display.",
    "Use this component with custom icons or styling.",
    "Use this component with marker clustering for many points."
  ],

  avoidWhen: [
    "Avoid this component without map integration.",
    "Avoid this component for single location (use MapView instead).",
    "Avoid this component without clear marker styling.",
    "Avoid this component with thousands of markers without clustering."
  ],

  relatedComponents: [
    "MapView",
    "LocationPicker",
    "RoutePlanner"
  ]
};
