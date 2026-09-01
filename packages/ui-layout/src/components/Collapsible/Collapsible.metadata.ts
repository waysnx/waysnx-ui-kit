export default {
  purpose: "Show or hide content with a click or interaction.",

  description: "A simple collapsible component that toggles the visibility of content based on user interaction. Often used for revealing optional details, advanced options, or secondary information without occupying permanent space. Simpler than Accordion when only one section needs to expand or collapse.",

  functionalAreas: [
    "Layout",
    "Navigation"
  ],

  userIntents: [
    "Show or hide optional details",
    "Expand advanced options",
    "View more information when needed",
    "Keep interface clean by hiding less-used options"
  ],

  exampleUseCases: [
    "Show More Details",
    "Advanced Options Toggle",
    "Comments Section Expand",
    "Additional Information",
    "Related Items Reveal",
    "Details Expansion",
    "Options Panel Toggle"
  ],

  useWhen: [
    "Use this component for toggling single sections of content.",
    "Use this component when you want to progressively disclose information.",
    "Use this component for optional or advanced content that doesn't clutter the main view.",
    "Use this component when a simple on/off visibility state is needed."
  ],

  avoidWhen: [
    "Avoid this component when multiple sections need independent toggle (use Accordion instead).",
    "Avoid this component for critical content that users should see by default.",
    "Avoid this component when frequent toggling is part of normal workflow.",
    "Avoid this component for content that should always be visible."
  ],

  relatedComponents: [
    "Accordion",
    "Drawer",
    "Modal"
  ]
};
