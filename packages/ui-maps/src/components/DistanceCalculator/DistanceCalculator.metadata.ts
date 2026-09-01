export default {
  purpose: "Calculate and display distance between two locations.",

  description: "A component that calculates distance between two geographic points. Displays distance in user-preferred units and often includes estimated travel time. Used for delivery cost estimation, routing, and location comparison.",

  functionalAreas: [
    "Visualization",
    "Navigation"
  ],

  userIntents: [
    "Know distance to location",
    "Calculate delivery cost",
    "Estimate travel time",
    "Compare locations"
  ],

  exampleUseCases: [
    "Distance Calculation",
    "Delivery Fee Estimate",
    "Travel Time Estimation",
    "Location Distance",
    "Service Radius",
    "Proximity Search",
    "Distance Display"
  ],

  useWhen: [
    "Use this component to display distance between locations.",
    "Use this component in delivery or logistics.",
    "Use this component for service radius or availability.",
    "Use this component with distance-based pricing."
  ],

  avoidWhen: [
    "Avoid this component without proper distance calculation service.",
    "Avoid this component for simple coordinate comparison.",
    "Avoid this component without location data.",
    "Avoid this component without clear units of measurement."
  ],

  relatedComponents: [
    "MapView",
    "LocationPicker",
    "RoutePlanner"
  ]
};
