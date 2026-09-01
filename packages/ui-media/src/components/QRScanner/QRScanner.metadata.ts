export default {
  purpose: "Enable QR code scanning via device camera.",

  description: "A component that uses device camera to scan and decode QR codes. Provides real-time camera preview with scanning overlay and automatic detection. Used for mobile interactions, check-in, and data access.",

  functionalAreas: [
    "Data Entry",
    "Navigation"
  ],

  userIntents: [
    "Scan QR code",
    "Access linked content",
    "Check in at event",
    "Connect to WiFi"
  ],

  exampleUseCases: [
    "QR Code Scanning",
    "Event Check-in",
    "WiFi Connection",
    "URL Access",
    "Mobile Payment",
    "Contact Sharing",
    "Venue Navigation"
  ],

  useWhen: [
    "Use this component for QR code scanning in mobile applications.",
    "Use this component for event check-in or attendance.",
    "Use this component to bridge digital and physical experiences.",
    "Use this component with automatic QR detection."
  ],

  avoidWhen: [
    "Avoid this component without camera access permissions.",
    "Avoid this component on devices without cameras.",
    "Avoid this component without QR detection library.",
    "Avoid this component for desktop-only applications."
  ],

  relatedComponents: [
    "BarcodeScanner",
    "QRCode",
    "Camera"
  ]
};
