export default {
  purpose: "Provide persistent access to important features via floating button.",

  description: "A button that floats above page content, typically in a corner, providing constant access to important features or actions. Often used for accessibility features, live chat, or frequent actions. Should be non-intrusive and dismissible.",

  functionalAreas: [
    "Actions",
    "Accessibility"
  ],

  userIntents: [
    "Access features quickly",
    "Get help easily",
    "Start action",
    "Find accessibility features"
  ],

  exampleUseCases: [
    "Accessibility Button",
    "Help Button",
    "Chat Button",
    "Feedback Button",
    "Action Button",
    "Floating Action Button",
    "Quick Access Button"
  ],

  useWhen: [
    "Use this component for persistent access to important features.",
    "Use this component for accessibility feature access.",
    "Use this component with clear, obvious placement.",
    "Use this component with dismissible or movable capability."
  ],

  avoidWhen: [
    "Avoid this component without important feature justification.",
    "Avoid this component that covers essential content.",
    "Avoid this component without accessibility consideration.",
    "Avoid this component with too many floating buttons."
  ],

  relatedComponents: [
    "Button",
    "FloatingMenu",
    "QuickActions"
  ]
};
