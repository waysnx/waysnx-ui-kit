# WorkspaceSwitcher Quick Start

## 5-Minute Setup Guide

### Step 1: Import the Component

```tsx
import { WorkspaceSwitcher, useWorkspace } from '@waysnx/ui-navigation';
import type { Workspace } from '@waysnx/ui-navigation';
```

### Step 2: Define Your Workspaces

```tsx
const WORKSPACES: Workspace[] = [
  {
    id: 'dev',
    name: 'Development',
    icon: '🛠️',
    description: 'Local development',
  },
  {
    id: 'prod',
    name: 'Production',
    icon: '🚀',
    description: 'Live environment',
  },
];
```

### Step 3: Use the Hook

```tsx
function App() {
  const { workspaces, activeWorkspace, setActiveWorkspace } = useWorkspace(WORKSPACES);

  return (
    <WorkspaceSwitcher
      workspaces={workspaces}
      activeWorkspace={activeWorkspace}
      onWorkspaceChange={setActiveWorkspace}
    />
  );
}
```

Done! 🎉

## Common Configurations

### Dropdown (Default)
```tsx
<WorkspaceSwitcher
  variant="dropdown"
  workspaces={workspaces}
  activeWorkspace={activeWorkspace}
  onWorkspaceChange={setActiveWorkspace}
/>
```

### Pills
```tsx
<WorkspaceSwitcher
  variant="pills"
  workspaces={workspaces}
  activeWorkspace={activeWorkspace}
  onWorkspaceChange={setActiveWorkspace}
/>
```

### Minimal (Sidebar)
```tsx
<WorkspaceSwitcher
  variant="minimal"
  workspaces={workspaces}
  activeWorkspace={activeWorkspace}
  onWorkspaceChange={setActiveWorkspace}
/>
```

## With Descriptions

```tsx
<WorkspaceSwitcher
  variant="dropdown"
  workspaces={workspaces}
  activeWorkspace={activeWorkspace}
  onWorkspaceChange={setActiveWorkspace}
  showDescriptions={true}
  showIcons={true}
/>
```

## Size Options

```tsx
// Small
<WorkspaceSwitcher size="sm" {...props} />

// Medium (default)
<WorkspaceSwitcher size="md" {...props} />

// Large
<WorkspaceSwitcher size="lg" {...props} />
```

## In a Header

```tsx
import { Header } from '@waysnx/ui-navigation';

<Header
  title="Dashboard"
  left={<WorkspaceSwitcher variant="pills" {...props} />}
  right={<UserMenu />}
/>
```

## In a Sidebar

```tsx
import { Sidebar } from '@waysnx/ui-navigation';

<Sidebar
  header={<WorkspaceSwitcher variant="minimal" {...props} />}
  items={menuItems}
/>
```

## Customize Colors

Add to your CSS:

```css
:root {
  --color-primary: #0066cc;
  --color-background: #ffffff;
  --color-text: #333333;
}
```

## Full Props Reference

```tsx
interface WorkspaceSwitcherProps {
  workspaces: Workspace[];                    // Required
  activeWorkspace?: Workspace;                // Optional
  onWorkspaceChange?: (workspace: Workspace) => void;
  variant?: 'dropdown' | 'pills' | 'minimal'; // Default: 'dropdown'
  size?: 'sm' | 'md' | 'lg';                  // Default: 'md'
  showIcons?: boolean;                        // Default: true
  showDescriptions?: boolean;                 // Default: false
  enableKeyboardNav?: boolean;                // Default: true
  ariaLabel?: string;                         // Default: 'Switch workspace'
  className?: string;                         // Default: ''
  style?: React.CSSProperties;
  testId?: string;
}
```

## Tips

- Use **dropdown** variant for headers (saves space)
- Use **pills** variant for 3-5 workspaces
- Use **minimal** variant in sidebars
- Add icons with emoji or SVG components
- Use descriptions in dropdown variant for context
- Combine with `useWorkspace` hook for state management

## Need Help?

- See [README.md](./README.md) for full documentation
- Check [WorkspaceSwitcher.stories.tsx](./WorkspaceSwitcher.stories.tsx) for examples
- View [WorkspaceSwitcher.test.tsx](./WorkspaceSwitcher.test.tsx) for test examples
