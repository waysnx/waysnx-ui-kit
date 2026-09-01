export default {
  purpose: "Display collapsible sections of content that expand or collapse.",

  description: "A stack of sections where only one or multiple can be open at a time, depending on configuration. Each section has a clickable header that toggles the visibility of its content. Useful for organizing related information into manageable sections, reducing visual clutter while maintaining easy access to content.",

  functionalAreas: [
    "Layout",
    "Navigation"
  ],

  userIntents: [
    "Organize content into expandable sections",
    "Hide less important information initially",
    "Focus on one topic at a time",
    "Save screen space while showing all options"
  ],

  exampleUseCases: [
    "FAQ Section",
    "Settings Panel",
    "Filters Group",
    "Documentation Outline",
    "Feature List",
    "Expandable Form Sections",
    "Content Outline"
  ],

  useWhen: [
    "Use this component when you have multiple sections of content that don't all need to be visible simultaneously.",
    "Use this component to organize information hierarchically without taking up excessive vertical space.",
    "Use this component when users need to focus on one section at a time.",
    "Use this component when you want to reduce cognitive load by showing only relevant sections."
  ],

  avoidWhen: [
    "Avoid this component when all content must be visible or easily scannable.",
    "Avoid this component for critical information that should always be visible.",
    "Avoid this component when the number of sections exceeds 8-10.",
    "Avoid this component for simple yes/no toggles (use Collapsible instead)."
  ],

  relatedComponents: [
    "Collapsible",
    "Tabs",
    "Drawer"
  ]
};
