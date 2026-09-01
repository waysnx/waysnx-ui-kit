export default {
  purpose: "Collect and display monetary amounts with automatic currency formatting.",

  description: "A specialized numeric input field for currency values that enforces proper formatting with decimal places, thousand separators, and currency symbols. Provides visual formatting as users type without requiring manual format entry. Supports configurable currency symbols and positioning to accommodate different locales and requirements.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Feedback"
  ],

  userIntents: [
    "Enter a price or payment amount",
    "View properly formatted currency values",
    "Input monetary amounts with validation",
    "Complete financial transactions"
  ],

  exampleUseCases: [
    "Purchase Amount",
    "Invoice Total",
    "Budget Entry",
    "Price Input",
    "Payment Form",
    "Cost Estimation"
  ],

  useWhen: [
    "Use this component when collecting monetary values from users.",
    "Use this component when automatic formatting improves data entry experience.",
    "Use this component when currency symbol positioning must match regional conventions.",
    "Use this component when precision to two decimal places is required."
  ],

  avoidWhen: [
    "Avoid this component when collecting non-monetary numeric values.",
    "Avoid this component when the system requires raw numeric input without formatting.",
    "Avoid this component when negative values are valid (component restricts to non-negative).",
    "Avoid this component when custom decimal precision is needed beyond two places."
  ],

  relatedComponents: [
    "Input",
    "Slider",
    "Textarea"
  ]
};
