export default {
  purpose: "Enable barcode scanning via device camera.",

  description: "A component that uses device camera to scan and decode barcodes. Provides real-time camera preview with scanning overlay and automatic detection. Used in inventory, checkout, and asset tracking applications.",

  functionalAreas: [
    "Data Entry",
    "Visualization"
  ],

  userIntents: [
    "Scan barcode",
    "Capture product info",
    "Track item",
    "Perform checkout"
  ],

  exampleUseCases: [
    "Inventory Scanning",
    "Checkout Process",
    "Asset Tracking",
    "Warehouse Management",
    "Library Check-in",
    "Retail Scanning",
    "Mobile Scanning"
  ],

  useWhen: [
    "Use this component for barcode scanning in mobile applications.",
    "Use this component in inventory or point-of-sale systems.",
    "Use this component when hands-free scanning is beneficial.",
    "Use this component with automatic barcode detection."
  ],

  avoidWhen: [
    "Avoid this component without camera access permissions.",
    "Avoid this component on devices without cameras.",
    "Avoid this component without barcode detection library.",
    "Avoid this component for desktop-only applications (use upload instead)."
  ],

  relatedComponents: [
    "QRScanner",
    "Barcode",
    "Camera"
  ]
};
