export default {
  purpose: "Enable users to select a specific time through a time picker interface.",

  description: "A time selection control that provides an interactive time picker for selecting hours and minutes. Supports configurable time intervals and 12-hour or 24-hour time formats. Displays the selected time in a readable format and enables keyboard navigation for efficient time entry.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Selection"
  ],

  userIntents: [
    "Select a time of day",
    "Set an alarm or reminder time",
    "Schedule a time slot",
    "Record working hours"
  ],

  exampleUseCases: [
    "Set Alarm",
    "Schedule Reminder",
    "Time Slot Selection",
    "Working Hours Entry",
    "Meeting Time",
    "Shift Schedule"
  ],

  useWhen: [
    "Use this component when users need to select only a time, not a date.",
    "Use this component when a time picker interface improves usability over text input.",
    "Use this component when configurable time intervals are required.",
    "Use this component when time format consistency is important."
  ],

  avoidWhen: [
    "Avoid this component when both date and time are needed (use DateTimePicker instead).",
    "Avoid this component when users typically enter times in a standard text format.",
    "Avoid this component when only preset times should be available.",
    "Avoid this component when second-level precision is required."
  ],

  relatedComponents: [
    "DatePicker",
    "DateRangePicker",
    "DateTimePicker"
  ]
};
