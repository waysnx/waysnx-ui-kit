export default {
  purpose: "Visualize numeric progress as a linear bar.",

  description: "A horizontal progress indicator that shows the completion percentage of a task or process. Displays progress as a filled bar that grows from 0% to 100%, with optional percentage text. Commonly used for downloads, uploads, form completion, and other time-bound operations where users benefit from seeing progress.",

  functionalAreas: [
    "Feedback",
    "Visualization"
  ],

  userIntents: [
    "Track task completion status",
    "Monitor file transfer progress",
    "See form completion percentage",
    "Understand remaining time or work"
  ],

  exampleUseCases: [
    "File Download Progress",
    "File Upload Progress",
    "Installation Progress",
    "Form Completion Status",
    "Page Load Progress",
    "Task Completion Bar",
    "Storage Usage Bar"
  ],

  useWhen: [
    "Use this component when you need to display determinate progress.",
    "Use this component in horizontal layouts where a linear bar fits naturally.",
    "Use this component for tasks that take a noticeable but bounded amount of time.",
    "Use this component when users need frequent updates on progress."
  ],

  avoidWhen: [
    "Avoid this component for indeterminate progress (use Spinner instead).",
    "Avoid this component in compact spaces where circular progress is more suitable.",
    "Avoid this component when progress information requires detailed breakdown.",
    "Avoid this component for animations or transitions (use animation libraries instead)."
  ],

  relatedComponents: [
    "CircularProgress",
    "Spinner",
    "Skeleton"
  ]
};
