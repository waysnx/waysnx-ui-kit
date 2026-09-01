export default {
  purpose: "Generate and display barcodes for identification or tracking.",

  description: "A component that generates barcode images from data (product codes, tracking numbers, etc.) in various formats (Code128, EAN, etc.). Supports customization of size and styling. Used for product labeling and inventory systems.",

  functionalAreas: [
    "Visualization",
    "Data Entry"
  ],

  userIntents: [
    "Generate barcode",
    "Scan product",
    "Track inventory",
    "Print label"
  ],

  exampleUseCases: [
    "Product Barcode",
    "Inventory Label",
    "Shipping Label",
    "Tracking Number",
    "Retail Label",
    "Asset Tag",
    "Package Label"
  ],

  useWhen: [
    "Use this component to generate barcodes for products or items.",
    "Use this component in inventory or point-of-sale systems.",
    "Use this component for printing labels.",
    "Use this component for asset tracking."
  ],

  avoidWhen: [
    "Avoid this component without barcode generation library.",
    "Avoid this component for simple text display (use Text instead).",
    "Avoid this component for mobile-only experiences (use QR Code instead).",
    "Avoid this component without proper barcode format support."
  ],

  relatedComponents: [
    "QRCode",
    "BarcodeScanner",
    "ImageViewer"
  ]
};
