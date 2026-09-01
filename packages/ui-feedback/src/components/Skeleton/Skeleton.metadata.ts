export default {
  purpose: "Display a placeholder while content is loading.",

  description: "An animated placeholder shape that mimics the size and structure of actual content while data is being fetched or processed. Creates a perception of faster loading and provides visual continuity by showing users what content is coming. Available in multiple shapes to match different content types like text lines, images, and components.",

  functionalAreas: [
    "Feedback",
    "Data Entry"
  ],

  userIntents: [
    "Know content is loading",
    "See what type of content will appear",
    "Experience faster perceived performance",
    "Anticipate page content structure"
  ],

  exampleUseCases: [
    "Content Loading Placeholder",
    "List Item Skeleton",
    "Card Loading State",
    "Image Loading Placeholder",
    "Text Block Skeleton",
    "Avatar Loading State",
    "Table Row Placeholder"
  ],

  useWhen: [
    "Use this component when content takes noticeable time to load.",
    "Use this component to match the shape and size of the expected content.",
    "Use this component to provide visual continuity during data loading.",
    "Use this component as an alternative to spinners for content-aware loading states."
  ],

  avoidWhen: [
    "Avoid this component when loading is instant or imperceptible.",
    "Avoid this component for simple operations that show a spinner instead.",
    "Avoid this component when the content structure is complex and skeleton would be confusing.",
    "Avoid this component for streaming content that updates gradually."
  ],

  relatedComponents: [
    "Spinner",
    "Progress",
    "EmptyState"
  ]
};
