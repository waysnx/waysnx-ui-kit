export default {
  purpose: "Enable users to select a specific date and time through an interactive calendar interface.",

  description: "A combined date and time selection control that presents both a calendar interface and time picker. Allows users to select a precise point in time with month and year navigation. Provides time interval selection and supports keyboard navigation for efficient interaction.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Selection"
  ],

  userIntents: [
    "Schedule an appointment with specific time",
    "Set a reminder with date and time",
    "Book a meeting or time slot",
    "Record a timestamp event"
  ],

  exampleUseCases: [
    "Meeting Scheduling",
    "Appointment Booking",
    "Event Registration",
    "Task Scheduling",
    "Notification Setup",
    "Time Clock Entry"
  ],

  useWhen: [
    "Use this component when users must select both a specific date and time.",
    "Use this component when scheduling events with precise timing requirements.",
    "Use this component when timestamp recording is needed.",
    "Use this component when appointment or meeting scheduling is the primary task."
  ],

  avoidWhen: [
    "Avoid this component when only a date is needed (use DatePicker instead).",
    "Avoid this component when only a time is needed (use TimePicker instead).",
    "Avoid this component when users prefer entering datetime as text.",
    "Avoid this component when time precision beyond 15-minute intervals is not useful."
  ],

  relatedComponents: [
    "DatePicker",
    "DateRangePicker",
    "TimePicker"
  ]
};
