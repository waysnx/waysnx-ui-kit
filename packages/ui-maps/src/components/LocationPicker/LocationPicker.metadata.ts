export default {
  purpose: "Enable selection of geographic location from map.",

  description: "An interactive component that allows users to select a location by clicking on a map. Updates location coordinates as user interacts. Often includes address display, zoom levels, and integration with search.",

  functionalAreas: [
    "Data Entry",
    "Navigation"
  ],

  userIntents: [
    "Select location on map",
    "Set delivery address",
    "Mark location",
    "Choose pickup point"
  ],

  exampleUseCases: [
    "Delivery Location Selection",
    "Pickup Point Selection",
    "Event Location",
    "Store Location",
    "Service Area Selection",
    "Place Finder",
    "Address Selection"
  ],

  useWhen: [
    "Use this component for geographic location input.",
    "Use this component in delivery or service applications.",
    "Use this component when map-based selection is intuitive.",
    "Use this component with address lookup integration."
  ],

  avoidWhen: [
    "Avoid this component without proper map integration.",
    "Avoid this component for simple address text input.",
    "Avoid this component on devices without map support.",
    "Avoid this component without location services support."
  ],

  relatedComponents: [
    "MapView",
    "AddressAutocomplete",
    "AddressSelector"
  ]
};
