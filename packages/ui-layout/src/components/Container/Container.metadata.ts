export default {
  purpose: "Constrain content width and provide consistent margins.",

  description: "A wrapper component that provides a maximum width for content and centers it with consistent padding on the sides. Ensures readable line lengths and consistent margins across different screen sizes. Commonly used as the top-level layout container for entire pages or sections.",

  functionalAreas: [
    "Layout"
  ],

  userIntents: [
    "Constrain content to readable width",
    "Center content on the page",
    "Apply consistent margins",
    "Maintain visual hierarchy through spacing"
  ],

  exampleUseCases: [
    "Page Container",
    "Section Container",
    "Content Width Limiter",
    "Page Layout Wrapper",
    "Responsive Content Container",
    "Main Content Wrapper",
    "Article Content Container"
  ],

  useWhen: [
    "Use this component as the outer wrapper for page content.",
    "Use this component to constrain content to a readable width.",
    "Use this component for consistent margins and padding.",
    "Use this component to center content horizontally on wide screens."
  ],

  avoidWhen: [
    "Avoid this component for full-width content.",
    "Avoid this component for layout primitives (use Stack or Flex instead).",
    "Avoid this component when content naturally fits the viewport.",
    "Avoid this component for nested containers (use one top-level container)."
  ],

  relatedComponents: [
    "Stack",
    "Grid",
    "Section"
  ]
};
