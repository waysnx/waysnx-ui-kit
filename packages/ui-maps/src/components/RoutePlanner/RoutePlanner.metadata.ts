export default {
  purpose: "Display and manage routes with turn-by-turn directions.",

  description: "A component for displaying navigation routes on a map with directions, distance, and estimated time. Users can input origin and destination, see alternative routes, and get turn-by-turn guidance.",

  functionalAreas: [
    "Navigation",
    "Visualization"
  ],

  userIntents: [
    "See route to destination",
    "Get directions",
    "Know distance and time",
    "Choose alternative route"
  ],

  exampleUseCases: [
    "Navigation Route",
    "Delivery Route",
    "Turn-by-turn Directions",
    "Trip Planning",
    "Route Optimization",
    "Directions Display",
    "Transportation Route"
  ],

  useWhen: [
    "Use this component for route visualization and navigation.",
    "Use this component to display directions with distance/time.",
    "Use this component for delivery or logistics applications.",
    "Use this component with alternative route suggestions."
  ],

  avoidWhen: [
    "Avoid this component without routing service integration.",
    "Avoid this component for simple address display.",
    "Avoid this component on devices without GPS.",
    "Avoid this component without proper real-time updates."
  ],

  relatedComponents: [
    "MapView",
    "LocationPicker",
    "DistanceCalculator"
  ]
};
