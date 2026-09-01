export default {
  purpose: "Enable users to select a start and end date range through an interactive calendar.",

  description: "A date range selection control that displays a calendar interface for picking both start and end dates. Provides month and year dropdown selectors for efficient navigation and highlights the selected range on the calendar. Respects minimum and maximum date constraints and displays both dates in the input field.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Selection"
  ],

  userIntents: [
    "Select a date range for filtering",
    "Define project duration or timeline",
    "Specify vacation or leave dates",
    "Set report period or interval"
  ],

  exampleUseCases: [
    "Analytics Date Range",
    "Vacation Dates",
    "Project Timeline",
    "Report Period",
    "Booking Dates",
    "Historical Data Range"
  ],

  useWhen: [
    "Use this component when users need to select both start and end dates.",
    "Use this component when visualizing the date range on a calendar is helpful.",
    "Use this component when filtering data by a specific time period.",
    "Use this component when date range constraints need visual representation."
  ],

  avoidWhen: [
    "Avoid this component when only a single date is needed (use DatePicker instead).",
    "Avoid this component when both date and time selection is required (use DateTimePicker twice or similar).",
    "Avoid this component when users typically enter date ranges as text.",
    "Avoid this component when only preset date ranges should be available."
  ],

  relatedComponents: [
    "DatePicker",
    "DateTimePicker",
    "TimePicker"
  ]
};
