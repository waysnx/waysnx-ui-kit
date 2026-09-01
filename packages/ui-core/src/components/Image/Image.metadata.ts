export default {
  purpose: "Display images with responsive sizing, fallback handling, and accessibility support.",

  description: "A component for rendering images with automatic lazy loading and responsive sizing. Supports multiple object-fit options for controlling how images fill their containers. Includes fallback image support when the primary image fails to load and optional caption display. Requires alt text for accessibility.",

  functionalAreas: [
    "Visualization",
    "Communication",
    "Feedback"
  ],

  userIntents: [
    "View a photograph or illustration",
    "See a diagram or chart",
    "View product images",
    "Display profile pictures"
  ],

  exampleUseCases: [
    "Product Gallery",
    "Profile Avatar",
    "Diagram Display",
    "Screenshot Preview",
    "Logo Display",
    "Hero Image"
  ],

  useWhen: [
    "Use this component when displaying images with responsive sizing needs.",
    "Use this component when lazy loading improves page performance.",
    "Use this component when fallback images should be displayed on load failure.",
    "Use this component when captions or additional context are needed."
  ],

  avoidWhen: [
    "Avoid this component when images should not be accessible to all users.",
    "Avoid this component without providing meaningful alt text.",
    "Avoid this component when decorative images alone convey critical information.",
    "Avoid this component when HTML img tag direct control is required."
  ],

  relatedComponents: [
    "HtmlContent",
    "Link"
  ]
};
