export default {
  purpose: "Collect multi-line text input from users with optional length limits and formatting.",

  description: "A multi-line text field for capturing longer text entries. Supports maximum character limits with character counter display and resizable dimensions. Provides clear error messaging and optional hints to guide users in entering valid content. Helps users understand input requirements and current progress.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Feedback"
  ],

  userIntents: [
    "Enter longer text or comments",
    "Write notes or descriptions",
    "Provide feedback or messages",
    "Complete open-ended form questions"
  ],

  exampleUseCases: [
    "Feedback Form",
    "Comment Section",
    "Description Field",
    "Bio or Profile Section",
    "Message Box",
    "Issue Description"
  ],

  useWhen: [
    "Use this component when users need to enter multiple lines of text.",
    "Use this component when character limits need to be visible and tracked.",
    "Use this component when longer natural language input is expected.",
    "Use this component when error messaging should be prominent."
  ],

  avoidWhen: [
    "Avoid this component when single-line input is sufficient (use Input instead).",
    "Avoid this component when HTML formatting is needed (use HtmlEditor instead).",
    "Avoid this component when rich text editing is required.",
    "Avoid this component when space is severely limited."
  ],

  relatedComponents: [
    "Input",
    "HtmlEditor",
    "SpeechToTextTextarea"
  ]
};
