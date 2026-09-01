export default {
  purpose: "Enable users to select a numeric value from a continuous range using a draggable control.",

  description: "A range input control that lets users select a value by dragging a thumb along a track. Displays the current value numerically and supports configurable minimum, maximum, and step values. Provides keyboard arrow key support for precise value adjustment and visual feedback during interaction.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Selection"
  ],

  userIntents: [
    "Adjust volume or intensity level",
    "Select a price range",
    "Set quality or resolution",
    "Adjust brightness or opacity"
  ],

  exampleUseCases: [
    "Volume Control",
    "Price Range Filter",
    "Quality Selection",
    "Brightness Adjustment",
    "Zoom Level",
    "Opacity Control"
  ],

  useWhen: [
    "Use this component when selecting from a continuous numeric range.",
    "Use this component when visual feedback of value within a range is helpful.",
    "Use this component when approximate values are acceptable.",
    "Use this component for settings like volume, brightness, or quality levels."
  ],

  avoidWhen: [
    "Avoid this component when exact numeric input is preferred.",
    "Avoid this component when selecting from a discrete list of options.",
    "Avoid this component when precision beyond available steps is needed.",
    "Avoid this component when users prefer typing values directly."
  ],

  relatedComponents: [
    "Input",
    "Currency",
    "Select"
  ]
};
