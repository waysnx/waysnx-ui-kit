export default {
  purpose: "Enable users to switch between multiple workspaces or environments.",

  description: "A navigation component that displays available workspaces and enables quick switching between them. Commonly shown in the header or sidebar. Useful in applications serving multiple teams, organizations, or contexts.",

  functionalAreas: [
    "Navigation",
    "Authentication"
  ],

  userIntents: [
    "Switch to different workspace",
    "See available workspaces",
    "Know current workspace",
    "Access workspace settings"
  ],

  exampleUseCases: [
    "Team Workspace Switcher",
    "Organization Switcher",
    "Project Switcher",
    "Context Switcher",
    "Account Switcher",
    "Environment Switcher",
    "Workspace Selector"
  ],

  useWhen: [
    "Use this component when users have access to multiple workspaces.",
    "Use this component in multi-tenant applications.",
    "Use this component to enable context switching.",
    "Use this component when workspaces are separate contexts or environments."
  ],

  avoidWhen: [
    "Avoid this component with only one workspace.",
    "Avoid this component without clear workspace concept.",
    "Avoid this component without proper access control.",
    "Avoid this component for temporary or secondary contexts."
  ],

  relatedComponents: [
    "Menu",
    "Header",
    "UserMenu"
  ]
};
