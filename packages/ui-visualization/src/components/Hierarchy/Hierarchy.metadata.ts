export default {
  purpose: "Visualize organizational or hierarchical relationships.",

  description: "A component that displays hierarchical data in a structured visual format (org chart, family tree, etc.). Shows connections between nodes and relationships. Often includes customizable layout directions and styling.",

  functionalAreas: [
    "Visualization",
    "Data Entry"
  ],

  userIntents: [
    "See organizational structure",
    "Understand relationships",
    "View reporting structure",
    "See team organization"
  ],

  exampleUseCases: [
    "Organizational Chart",
    "Team Structure",
    "Reporting Hierarchy",
    "Family Tree",
    "Management Structure",
    "Workflow Steps",
    "Decision Tree"
  ],

  useWhen: [
    "Use this component to display organizational structures.",
    "Use this component when relationships are important.",
    "Use this component for org charts or hierarchical display.",
    "Use this component with customizable styling."
  ],

  avoidWhen: [
    "Avoid this component for simple lists (use List instead).",
    "Avoid this component without clear relationships.",
    "Avoid this component with very large hierarchies.",
    "Avoid this component without proper layout algorithms."
  ],

  relatedComponents: [
    "OrgChart",
    "Tree",
    "Connector"
  ]
};
