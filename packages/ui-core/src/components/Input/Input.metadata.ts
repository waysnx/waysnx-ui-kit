export default {
  purpose: "Collect single-line text and numeric input from users with validation and formatting support.",

  description: "A field for capturing user-entered data in a single line. Supports multiple input types including text, email, password, and numeric values. Provides built-in validation, field hints, error messaging, and optional masking for formatted input like phone numbers and currency amounts. Helps users understand what information is required and provides immediate feedback when input is invalid.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Feedback"
  ],

  userIntents: [
    "Enter text information",
    "Provide an email address",
    "Enter a password",
    "Input numeric values",
    "Enter a phone number",
    "Enter a currency amount",
    "Search for content",
    "Complete a required field"
  ],

  exampleUseCases: [
    "Login Form",
    "Registration Form",
    "Search Toolbar",
    "Settings Page",
    "Contact Form",
    "Payment Form",
    "Profile Page",
    "Filter Criteria"
  ],

  useWhen: [
    "Use this component when collecting single-line text or numeric input.",
    "Use this component when input validation is required to ensure data quality.",
    "Use this component when input needs formatting such as phone numbers or currency values.",
    "Use this component when password input needs optional visibility control.",
    "Use this component when field hints or error messages should guide the user."
  ],

  avoidWhen: [
    "Avoid this component when users need to enter multi-line content.",
    "Avoid this component when users must select from many predefined options.",
    "Avoid this component when collecting boolean values.",
    "Avoid this component when date or time selection is the primary interaction.",
    "Avoid this component when large amounts of structured data entry are required."
  ],

  relatedComponents: [
    "Textarea",
    "Select",
    "DatePicker",
    "Checkbox",
    "Radio"
  ]
};
