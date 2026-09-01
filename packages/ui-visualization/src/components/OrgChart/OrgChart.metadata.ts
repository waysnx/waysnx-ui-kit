export default {
  purpose: "Display organizational structure and reporting relationships.",

  description: "A specialized component for visualizing organizational hierarchies with employee cards and reporting lines. Shows manager-subordinate relationships visually. Used for team management, HR systems, and organizational planning.",

  functionalAreas: [
    "Visualization",
    "Data Entry"
  ],

  userIntents: [
    "See organization structure",
    "Know reporting relationships",
    "View team members",
    "Understand org hierarchy"
  ],

  exampleUseCases: [
    "Company Organization Chart",
    "Department Structure",
    "Team Hierarchy",
    "Leadership Structure",
    "Management Chain",
    "Employee Reporting",
    "Organizational Planning"
  ],

  useWhen: [
    "Use this component for organizational structure visualization.",
    "Use this component in HR or management applications.",
    "Use this component to show reporting relationships.",
    "Use this component with employee information display."
  ],

  avoidWhen: [
    "Avoid this component for non-organizational hierarchies (use Hierarchy instead).",
    "Avoid this component without clear org structure.",
    "Avoid this component for very large organizations (provide search/filter).",
    "Avoid this component without proper layout for hierarchy."
  ],

  relatedComponents: [
    "Hierarchy",
    "Tree",
    "Card"
  ]
};
