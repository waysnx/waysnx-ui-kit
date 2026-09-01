export default {
  purpose: "Enable quick access to current device location.",

  description: "A button component that retrieves the user's current GPS location and centers the map or populates location input. Often includes loading state and error handling for location services.",

  functionalAreas: [
    "Navigation",
    "Actions"
  ],

  userIntents: [
    "Use current location",
    "Center map on position",
    "Quick location input",
    "Find nearby services"
  ],

  exampleUseCases: [
    "Current Location Button",
    "Map Centering",
    "Quick Location Selection",
    "Find Nearby",
    "Location Reset",
    "Device Location",
    "GPS Location Button"
  ],

  useWhen: [
    "Use this component to provide quick current location access.",
    "Use this component with GPS or geolocation API.",
    "Use this component in maps or location-based features.",
    "Use this component with proper permission handling."
  ],

  avoidWhen: [
    "Avoid this component without location services support.",
    "Avoid this component without user permission handling.",
    "Avoid this component in privacy-sensitive contexts without disclosure.",
    "Avoid this component on devices without GPS."
  ],

  relatedComponents: [
    "MapView",
    "LocationPicker",
    "Button"
  ]
};
