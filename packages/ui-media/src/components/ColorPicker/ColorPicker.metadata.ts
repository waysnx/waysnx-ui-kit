export default {
  purpose: "Enable selection and input of colors.",

  description: "A component that allows users to select colors through a color picker interface with multiple input methods (color wheel, sliders, hex input). Supports various color formats (HEX, RGB, HSL) and provides accessible color selection.",

  functionalAreas: [
    "Data Entry",
    "Visualization"
  ],

  userIntents: [
    "Select color",
    "Input color value",
    "See color options",
    "Copy color code"
  ],

  exampleUseCases: [
    "Theme Color Selection",
    "Design Tool Color",
    "Background Color",
    "Text Color",
    "Highlight Color",
    "Custom Theme",
    "Design Color"
  ],

  useWhen: [
    "Use this component when users need to select or input colors.",
    "Use this component in design tools or theme customization.",
    "Use this component with multiple color format support.",
    "Use this component when precise color selection is needed."
  ],

  avoidWhen: [
    "Avoid this component for simple preset color selection (use Select instead).",
    "Avoid this component without proper color format conversion.",
    "Avoid this component for non-color data entry.",
    "Avoid this component without accessible keyboard navigation."
  ],

  relatedComponents: [
    "Input",
    "Select",
    "Palette"
  ]
};
