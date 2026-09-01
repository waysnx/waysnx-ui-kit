export default {
  purpose: "Store and submit form field values that should not be visible to users.",

  description: "A hidden form input field that stores data to be submitted with a form without displaying it to users. Used for tracking internal identifiers, system values, or data that should persist without user modification. Maintains form integrity while keeping sensitive or system-generated values out of view.",

  functionalAreas: [
    "Forms",
    "Data Entry"
  ],

  userIntents: [
    "Submit internal identifiers with form",
    "Maintain system values with form submission",
    "Track session or context information"
  ],

  exampleUseCases: [
    "Record Parent ID",
    "Store Session Token",
    "Maintain Form Context",
    "Track Record Version",
    "Store System Identifier",
    "Include CSRF Token"
  ],

  useWhen: [
    "Use this component when form data must be submitted without user visibility.",
    "Use this component when system-generated values must accompany form submission.",
    "Use this component when tracking internal identifiers for backend processing."
  ],

  avoidWhen: [
    "Avoid this component when data should be visible or user-editable.",
    "Avoid this component for sensitive data that should never be transmitted.",
    "Avoid this component when form data encryption is the actual security need."
  ],

  relatedComponents: [
    "Input",
    "Button"
  ]
};
