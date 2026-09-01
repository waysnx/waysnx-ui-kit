export default {
  purpose: "Play video content with standard player controls.",

  description: "A customizable video player component with play/pause, volume control, progress bar, and fullscreen. Supports multiple video formats and quality options. Common in video hosting, education, and media applications.",

  functionalAreas: [
    "Visualization",
    "Communication"
  ],

  userIntents: [
    "Play video content",
    "Control playback",
    "Adjust volume",
    "View full screen"
  ],

  exampleUseCases: [
    "Video Playback",
    "Course Video",
    "Tutorial Video",
    "Video Upload Preview",
    "Media Streaming",
    "Product Demo Video",
    "Recorded Presentation"
  ],

  useWhen: [
    "Use this component for video playback and media consumption.",
    "Use this component with standard playback controls.",
    "Use this component when multiple video formats support is needed.",
    "Use this component for educational or training content."
  ],

  avoidWhen: [
    "Avoid this component for live streaming (use specialized streaming component).",
    "Avoid this component without proper video format support.",
    "Avoid this component for simple video embeds (use native video tag).",
    "Avoid this component without bandwidth optimization."
  ],

  relatedComponents: [
    "AudioPlayer",
    "ImageViewer",
    "MediaGallery"
  ]
};
