export default {
  purpose: "Enable selection from list of available addresses.",

  description: "A dropdown or list component that displays selectable addresses (saved addresses, recent, suggested). Allows quick selection without typing. Often includes favorite/starred addresses for frequently used locations.",

  functionalAreas: [
    "Data Entry",
    "Navigation"
  ],

  userIntents: [
    "Select saved address",
    "Choose recent address",
    "Pick favorite location",
    "Quick address selection"
  ],

  exampleUseCases: [
    "Saved Address Selection",
    "Recent Address",
    "Favorite Locations",
    "Frequently Used Addresses",
    "Address List",
    "Quick Address Selection",
    "Profile Address"
  ],

  useWhen: [
    "Use this component for selecting from saved addresses.",
    "Use this component to speed up address entry.",
    "Use this component in delivery or checkout workflows.",
    "Use this component with favorite address management."
  ],

  avoidWhen: [
    "Avoid this component without existing addresses.",
    "Avoid this component for first-time address entry.",
    "Avoid this component with very large address lists (add search).",
    "Avoid this component for one-time-only address input."
  ],

  relatedComponents: [
    "AddressAutocomplete",
    "LocationPicker",
    "Select"
  ]
};
