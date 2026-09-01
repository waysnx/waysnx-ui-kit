export default {
  purpose: "Provide specialized dashboard widgets for displaying charts, HTML, and markdown content.",

  description: "A collection of pre-configured widget components including ChartWidget for data visualization, HtmlWidget for rendered HTML content, and MarkdownWidget for formatted markdown. These widgets wrap standard Widget container with specialized content rendering and are ready to integrate into dashboard layouts.",

  functionalAreas: [
    "Visualization",
    "Communication",
    "Feedback"
  ],

  userIntents: [
    "View charts and graphs",
    "Display formatted HTML content",
    "View markdown documentation",
    "See visualized analytics"
  ],

  exampleUseCases: [
    "Sales Chart",
    "Revenue Graph",
    "Help Documentation",
    "Formatted Content Display",
    "Analytics Report",
    "Data Visualization"
  ],

  useWhen: [
    "Use this component when specialized widget types simplify dashboard development.",
    "Use this component for charts, HTML, or markdown content display.",
    "Use this component when consistent widget styling across content types is needed.",
    "Use this component when widget state management is handled by container."
  ],

  avoidWhen: [
    "Avoid this component when custom widget rendering is required.",
    "Avoid this component when content types don't match available specializations.",
    "Avoid this component without dashboard context provider.",
    "Avoid this component when standard Widget component is sufficient."
  ],

  relatedComponents: [
    "Widget",
    "Dashboard",
    "Layout"
  ]
};
