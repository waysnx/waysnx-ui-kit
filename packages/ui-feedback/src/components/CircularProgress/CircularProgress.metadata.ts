export default {
  purpose: "Visualize numeric progress in a circular format.",

  description: "A circular progress indicator that shows the completion percentage of a task or process. Displays progress as an arc that fills from 0% to 100%, with optional text in the center and label below. Useful for compact spaces where traditional linear progress bars don't fit well, such as downloads, uploads, or multi-step processes.",

  functionalAreas: [
    "Feedback",
    "Visualization"
  ],

  userIntents: [
    "Monitor task completion status",
    "Track upload or download progress",
    "See processing completion",
    "Understand remaining work percentage"
  ],

  exampleUseCases: [
    "File Upload Progress",
    "File Download Progress",
    "Task Completion Status",
    "Skill Level Display",
    "Storage Usage Visualization",
    "Page Load Progress",
    "Form Completion Percentage"
  ],

  useWhen: [
    "Use this component when you need to display progress in a compact circular format.",
    "Use this component in dashboards or settings where space is limited.",
    "Use this component when the visual impact of a circular design enhances the interface.",
    "Use this component to show progress for tasks that take a noticeable but bounded amount of time."
  ],

  avoidWhen: [
    "Avoid this component when precise progress information requires detailed breakdown.",
    "Avoid this component for indeterminate progress (use Spinner instead).",
    "Avoid this component in horizontal layouts where a linear progress bar fits better.",
    "Avoid this component when multiple concurrent progress indicators need comparison."
  ],

  relatedComponents: [
    "Progress",
    "Spinner",
    "Skeleton"
  ]
};
