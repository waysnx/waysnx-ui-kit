export default {
  purpose: "Embed external web content within a sandboxed iframe with security restrictions.",

  description: "A secure container for embedding external web content with enforced HTTPS requirement and sandboxing to prevent script injection. Supports fullscreen mode and configurable sandbox restrictions for fine-grained security control. Lazy loads embedded content to improve page performance and requires both src and title for accessibility.",

  functionalAreas: [
    "Visualization",
    "Communication",
    "Navigation"
  ],

  userIntents: [
    "View embedded web content",
    "Watch embedded videos",
    "Display external forms",
    "Show third-party widgets"
  ],

  exampleUseCases: [
    "Embedded Video Player",
    "External Form",
    "Third-party Widget",
    "Embedded Map",
    "Documentation Viewer",
    "Live Demo Display"
  ],

  useWhen: [
    "Use this component when embedding external web content securely.",
    "Use this component when HTTPS-only URLs are available.",
    "Use this component when script sandboxing requirements are critical.",
    "Use this component when third-party widgets must be isolated from main content."
  ],

  avoidWhen: [
    "Avoid this component without HTTPS URLs (security requirement).",
    "Avoid this component when embedding untrusted content without sandbox restrictions.",
    "Avoid this component for content that requires direct DOM access.",
    "Avoid this component when full JavaScript execution is needed."
  ],

  relatedComponents: [
    "HtmlContent",
    "Link",
    "Image"
  ]
};
