export default {
  purpose: "Enable users to upload files with drag-and-drop support and validation.",

  description: "A file upload control supporting both click-to-browse and drag-and-drop interactions. Validates files by size and type before acceptance and displays validation errors clearly. Supports both single and multiple file uploads with preview thumbnails for images. Can operate in auto-upload or manual upload mode with progress tracking.",

  functionalAreas: [
    "Data Entry",
    "Forms",
    "Communication"
  ],

  userIntents: [
    "Upload a document or file",
    "Attach files to a form",
    "Share images or media",
    "Backup or store files"
  ],

  exampleUseCases: [
    "Document Submission",
    "Profile Picture Upload",
    "Attachment Form",
    "Media Gallery",
    "Bulk File Import",
    "Resume Upload"
  ],

  useWhen: [
    "Use this component when users need to upload files with drag-and-drop convenience.",
    "Use this component when file validation by size and type is required.",
    "Use this component when file previews are helpful for user confirmation.",
    "Use this component when progress tracking improves upload experience."
  ],

  avoidWhen: [
    "Avoid this component when no file uploads are needed.",
    "Avoid this component without clear file type restrictions.",
    "Avoid this component when file size limits are not enforced.",
    "Avoid this component for security-sensitive file types without backend validation."
  ],

  relatedComponents: [
    "Input",
    "Button",
    "ErrorMessage"
  ]
};
