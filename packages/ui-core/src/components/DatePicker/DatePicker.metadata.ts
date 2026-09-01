export default {
  purpose: "Enable users to select a specific date through an interactive calendar interface.",

  description: "A date selection control that presents an interactive calendar popup for picking individual dates. Provides month and year dropdown selectors for quick navigation and respects minimum and maximum date constraints. Displays the selected date in a readable format within the input field and supports keyboard navigation.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Selection"
  ],

  userIntents: [
    "Choose a specific date from a calendar",
    "Enter a birth date or anniversary",
    "Set an appointment or event date",
    "Select a deadline or due date"
  ],

  exampleUseCases: [
    "Birth Date Selection",
    "Meeting Scheduler",
    "Task Deadline",
    "Event Date",
    "Project Start Date",
    "Report Date Range Selection"
  ],

  useWhen: [
    "Use this component when users need to select a single specific date.",
    "Use this component when a calendar view helps date selection.",
    "Use this component when date format consistency across the application is important.",
    "Use this component when users may need to navigate between months and years."
  ],

  avoidWhen: [
    "Avoid this component when users are selecting a date range (use DateRangePicker instead).",
    "Avoid this component when both date and time selection is needed (use DateTimePicker instead).",
    "Avoid this component when only time selection is required (use TimePicker instead).",
    "Avoid this component when users typically enter dates manually in a known format."
  ],

  relatedComponents: [
    "DateRangePicker",
    "DateTimePicker",
    "TimePicker"
  ]
};
