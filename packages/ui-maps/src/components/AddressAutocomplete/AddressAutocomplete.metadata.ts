export default {
  purpose: "Enable rapid address input with autocomplete suggestions.",

  description: "A text input component that suggests addresses as the user types, using geocoding services. Integrates with location services to validate and standardize addresses. Common in delivery, booking, and location-based applications.",

  functionalAreas: [
    "Data Entry",
    "Navigation"
  ],

  userIntents: [
    "Enter address quickly",
    "See address suggestions",
    "Autocomplete address",
    "Validate address"
  ],

  exampleUseCases: [
    "Delivery Address Input",
    "Pickup Location",
    "Shipping Address",
    "Event Location",
    "Place Search",
    "Store Finder",
    "Address Entry"
  ],

  useWhen: [
    "Use this component for address input with autocomplete.",
    "Use this component with geocoding service integration.",
    "Use this component to improve address accuracy and speed.",
    "Use this component in delivery or booking applications."
  ],

  avoidWhen: [
    "Avoid this component without geocoding service.",
    "Avoid this component for simple text input.",
    "Avoid this component without address database.",
    "Avoid this component on offline-only applications."
  ],

  relatedComponents: [
    "LocationPicker",
    "AddressSelector",
    "MapView"
  ]
};
