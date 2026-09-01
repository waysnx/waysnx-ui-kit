export default {
  purpose: "Enable users to enter text through voice input combined with traditional text editing.",

  description: "A textarea component enhanced with voice-to-text capability using the Web Speech API. Displays a microphone button that toggles speech recognition recording and appends recognized text to the textarea. Supports character count limits and provides visual feedback of active recording state.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Communication"
  ],

  userIntents: [
    "Enter text using voice",
    "Create accessible text input",
    "Dictate longer content",
    "Combine typing and dictation"
  ],

  exampleUseCases: [
    "Accessibility-First Input",
    "Hands-Free Entry",
    "Dictation Support",
    "Accessible Notes",
    "Voice Comments",
    "Dictated Messages"
  ],

  useWhen: [
    "Use this component when voice input improves accessibility for users.",
    "Use this component when users should be able to dictate content.",
    "Use this component when hands-free input is beneficial.",
    "Use this component when browser speech recognition is available."
  ],

  avoidWhen: [
    "Avoid this component when speech recognition is not supported in target browsers.",
    "Avoid this component in noisy environments where accuracy is critical.",
    "Avoid this component when privacy concerns prevent audio capture.",
    "Avoid this component when text input must be precise and dictation may add errors."
  ],

  relatedComponents: [
    "Textarea",
    "Input",
    "FileUpload"
  ]
};
