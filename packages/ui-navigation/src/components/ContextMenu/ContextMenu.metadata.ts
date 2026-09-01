export default {
  purpose: "Display context-sensitive actions triggered by right-click or long-press.",

  description: "A floating menu that appears when users right-click (or long-press on mobile) on a UI element. Contains contextual actions specific to that element or content. Provides quick access to common actions without needing to navigate menus or toolbars.",

  functionalAreas: [
    "Navigation",
    "Actions"
  ],

  userIntents: [
    "Quickly access item-specific actions",
    "Perform actions without navigation",
    "Copy, delete, or edit items",
    "See available options for content"
  ],

  exampleUseCases: [
    "File Management Actions",
    "Item Delete/Edit Menu",
    "Copy/Paste Menu",
    "Element Inspector Menu",
    "Data Row Actions",
    "Text Selection Menu",
    "Item Context Menu"
  ],

  useWhen: [
    "Use this component for item or element-specific actions.",
    "Use this component to provide quick access to secondary actions.",
    "Use this component when power users benefit from right-click menus.",
    "Use this component in applications with complex interactions on elements."
  ],

  avoidWhen: [
    "Avoid this component for primary navigation or critical actions.",
    "Avoid this component without keyboard accessibility alternatives.",
    "Avoid this component on touch-only devices without long-press support.",
    "Avoid this component for actions that should always be visible."
  ],

  relatedComponents: [
    "Menu",
    "Drawer",
    "PopoverMenu"
  ]
};
