export default {
  purpose: "Display and play audio/voice messages in chat or messaging.",

  description: "A component for rendering audio messages with a playback control and visual waveform or progress indicator. Typically includes play/pause button, duration, and often integrates with message bubbles. Used in messaging and communication apps.",

  functionalAreas: [
    "Communication",
    "Visualization"
  ],

  userIntents: [
    "Play voice message",
    "See message duration",
    "Control playback",
    "Know message content"
  ],

  exampleUseCases: [
    "Voice Message Player",
    "Audio Message",
    "Voice Note",
    "Chat Audio",
    "Message Audio",
    "Voice Recording Playback",
    "Audio Clip Display"
  ],

  useWhen: [
    "Use this component to display playable voice or audio messages.",
    "Use this component in messaging applications with audio support.",
    "Use this component with progress indication and playback controls.",
    "Use this component with message information (sender, time)."
  ],

  avoidWhen: [
    "Avoid this component without audio file support.",
    "Avoid this component for non-message audio content (use AudioPlayer instead).",
    "Avoid this component without proper audio playback implementation.",
    "Avoid this component on devices without audio capabilities."
  ],

  relatedComponents: [
    "MessageBubble",
    "ChatWindow",
    "AudioPlayer"
  ]
};
