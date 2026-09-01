export default {
  purpose: "Play audio content with playback controls and progress tracking.",

  description: "A customizable audio player component with play/pause, volume, seek bar, and time display. Supports multiple audio formats and playlists. Used for music, podcasts, audiobooks, and other audio content.",

  functionalAreas: [
    "Visualization",
    "Communication"
  ],

  userIntents: [
    "Play audio content",
    "Control playback",
    "Adjust volume",
    "Skip through audio"
  ],

  exampleUseCases: [
    "Music Player",
    "Podcast Playback",
    "Audiobook Player",
    "Voice Recording",
    "Audio Upload Preview",
    "Sound Effect",
    "Background Music"
  ],

  useWhen: [
    "Use this component for audio playback and consumption.",
    "Use this component with standard audio controls.",
    "Use this component for music, podcasts, or audiobooks.",
    "Use this component when audio visualization is helpful."
  ],

  avoidWhen: [
    "Avoid this component for simple sound effects (use audio tag instead).",
    "Avoid this component without proper audio format support.",
    "Avoid this component for live streaming (use streaming solution).",
    "Avoid this component without bandwidth optimization."
  ],

  relatedComponents: [
    "VideoPlayer",
    "VoiceMessage",
    "Waveform"
  ]
};
