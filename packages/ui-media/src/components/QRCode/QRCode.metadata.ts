export default {
  purpose: "Generate and display QR codes for sharing or scanning.",

  description: "A component that generates QR code images from data (URLs, text, etc.) and displays them. Supports customization of size, color, and error correction level. Users can scan with mobile devices for quick access.",

  functionalAreas: [
    "Visualization",
    "Data Entry"
  ],

  userIntents: [
    "Generate QR code",
    "Share scannable link",
    "Display quick access code",
    "Share contact info"
  ],

  exampleUseCases: [
    "URL Sharing QR",
    "Contact Card QR",
    "Event Registration",
    "Payment QR",
    "WiFi Sharing",
    "App Download Link",
    "Product Information"
  ],

  useWhen: [
    "Use this component when you need to share URLs or data via QR code.",
    "Use this component for mobile-first interactions.",
    "Use this component for event check-in or registration.",
    "Use this component to bridge digital and physical experiences."
  ],

  avoidWhen: [
    "Avoid this component without clear scanning use case.",
    "Avoid this component for desktop-only experiences.",
    "Avoid this component when short URLs would suffice.",
    "Avoid this component without reliable QR generation library."
  ],

  relatedComponents: [
    "Barcode",
    "ImageViewer",
    "QRScanner"
  ]
};
