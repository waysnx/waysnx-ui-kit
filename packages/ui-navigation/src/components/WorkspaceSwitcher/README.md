# WorkspaceSwitcher Component

A flexible workspace switcher component for navigating between different workspaces or environments in your application.

## Features

- **Multiple Variants**: Dropdown, pills, and minimal list layouts
- **Customizable**: Icons, descriptions, and size options
- **Accessible**: Full ARIA support and keyboard navigation
- **Responsive**: Works seamlessly on all screen sizes
- **Type-Safe**: Complete TypeScript support
- **Well-Tested**: Comprehensive test coverage

## Installation

The WorkspaceSwitcher component is part of the `ui-navigation` package:

```bash
npm install @waysnx/ui-navigation
```

## Usage

### Basic Example

```tsx
import { WorkspaceSwitcher } from '@waysnx/ui-navigation';
import { useWorkspace } from '@waysnx/ui-navigation';

function Header() {
  const { workspaces, activeWorkspace, setActiveWorkspace } = useWorkspace();

  return (
    <WorkspaceSwitcher
      workspaces={workspaces}
      activeWorkspace={activeWorkspace}
      onWorkspaceChange={setActiveWorkspace}
    />
  );
}
```

### With Dropdown Variant (Default)

```tsx
<WorkspaceSwitcher
  variant="dropdown"
  workspaces={workspaces}
  activeWorkspace={activeWorkspace}
  onWorkspaceChange={handleWorkspaceChange}
  showDescriptions
  showIcons
/>
```

### With Pills Variant

```tsx
<WorkspaceSwitcher
  variant="pills"
  workspaces={workspaces}
  activeWorkspace={activeWorkspace}
  onWorkspaceChange={handleWorkspaceChange}
/>
```

### With Minimal Variant

```tsx
<WorkspaceSwitcher
  variant="minimal"
  workspaces={workspaces}
  activeWorkspace={activeWorkspace}
  onWorkspaceChange={handleWorkspaceChange}
/>
```

## Props

### WorkspaceSwitcherProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `workspaces` | `Workspace[]` | Required | Array of available workspaces |
| `activeWorkspace` | `Workspace \| undefined` | `undefined` | Currently active workspace |
| `onWorkspaceChange` | `(workspace: Workspace) => void` | `undefined` | Callback fired when workspace is selected |
| `variant` | `'dropdown' \| 'pills' \| 'minimal'` | `'dropdown'` | Display variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the component |
| `showIcons` | `boolean` | `true` | Display workspace icons |
| `showDescriptions` | `boolean` | `false` | Display workspace descriptions |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | `undefined` | Inline styles |
| `enableKeyboardNav` | `boolean` | `true` | Enable keyboard navigation (Escape to close) |
| `ariaLabel` | `string` | `'Switch workspace'` | Accessibility label |
| `testId` | `string` | `undefined` | Test ID for testing |

## Workspace Type

```typescript
interface Workspace {
  id: string;              // Unique identifier
  name: string;            // Display name
  icon?: React.ReactNode;  // Optional icon (emoji, SVG, etc.)
  description?: string;    // Optional description
  active?: boolean;        // Optional active flag (for reference)
  metadata?: Record<string, any>; // Optional metadata
}
```

## Variants

### Dropdown Variant

A button that opens a dropdown menu with workspace options. Best for tight spaces.

**Features:**
- Opens/closes on click
- Shows active workspace in trigger
- Optional descriptions for each workspace
- Scrollable menu for many workspaces
- Keyboard accessible (Escape to close)

### Pills Variant

Display workspaces as horizontal pill buttons. Good for when you have 3-5 workspaces.

**Features:**
- All workspaces visible at once
- Active state is highlighted
- Responsive wrapping
- Minimal visual footprint

### Minimal Variant

A simple vertical list with left border indicator. Best for sidebars.

**Features:**
- Clear hierarchy
- Active item highlighted with left border
- Compact layout
- Great for navigation sidebars

## Size Options

- `sm`: Small size, best for dense layouts
- `md`: Medium size, default and recommended
- `lg`: Large size, for prominent placement

## Accessibility

The component is fully accessible:

- Semantic HTML (`<button>`, `role="listbox"`, `role="option"`)
- Full keyboard navigation support
- ARIA labels and attributes
- Focus management
- High contrast support
- Works with screen readers

### Keyboard Navigation

**Dropdown variant:**
- `Enter/Space` - Open/close menu
- `Escape` - Close menu
- Click outside to close

**Pills and Minimal variants:**
- `Tab` - Navigate between items
- `Enter/Space` - Select item

## Styling & Customization

### CSS Variables

The component uses CSS variables for theming:

```css
--color-primary: #0066cc;
--color-text: #333333;
--color-text-muted: #666666;
--color-text-inverse: #ffffff;
--color-background: #ffffff;
--color-background-hover: #f9f9f9;
--color-background-selected: #e8f0ff;
--color-background-active: #f0f6ff;
--color-border: #e0e0e0;
--color-border-hover: #b0b0b0;
--color-focus: #0066cc;
```

### Custom Styling Example

```tsx
<WorkspaceSwitcher
  workspaces={workspaces}
  activeWorkspace={activeWorkspace}
  onWorkspaceChange={handleWorkspaceChange}
  className="my-custom-class"
  style={{ marginBottom: '20px' }}
/>
```

Override with CSS:

```css
.my-custom-class .wx-workspace-switcher__trigger {
  background-color: #f0f0f0;
  border-radius: 8px;
}
```

## Examples

### With Icons and Descriptions

```tsx
const workspaces = [
  {
    id: 'dev',
    name: 'Development',
    icon: '🛠️',
    description: 'Local development environment',
  },
  {
    id: 'prod',
    name: 'Production',
    icon: '🚀',
    description: 'Live production environment',
  },
];

<WorkspaceSwitcher
  variant="dropdown"
  workspaces={workspaces}
  activeWorkspace={workspaces[0]}
  onWorkspaceChange={handleChange}
  showIcons
  showDescriptions
/>
```

### In a Header

```tsx
import { Header } from '@waysnx/ui-navigation';
import { WorkspaceSwitcher } from '@waysnx/ui-navigation';

<Header
  title="Dashboard"
  left={<WorkspaceSwitcher variant="pills" {...props} />}
  right={<UserMenu />}
/>
```

### In a Sidebar

```tsx
import { Sidebar } from '@waysnx/ui-navigation';
import { WorkspaceSwitcher } from '@waysnx/ui-navigation';

<Sidebar
  header={
    <WorkspaceSwitcher
      variant="minimal"
      {...props}
    />
  }
  items={menuItems}
/>
```

## Testing

The component includes a comprehensive test suite. When testing:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WorkspaceSwitcher } from '@waysnx/ui-navigation';

test('changes workspace on selection', async () => {
  const user = userEvent.setup();
  const handleChange = jest.fn();

  render(
    <WorkspaceSwitcher
      variant="dropdown"
      workspaces={workspaces}
      activeWorkspace={workspaces[0]}
      onWorkspaceChange={handleChange}
    />
  );

  const trigger = screen.getByRole('button', { name: /switch workspace/i });
  await user.click(trigger);

  const option = screen.getByRole('option', { name: /Production/i });
  await user.click(option);

  expect(handleChange).toHaveBeenCalledWith(workspaces[1]);
});
```

Use the `testId` prop for easier element selection:

```tsx
const element = screen.getByTestId('workspace-switcher-main');
const option = screen.getByTestId('workspace-option-prod');
```

## Performance

The component is optimized for performance:

- Efficient event handling with proper cleanup
- Memoized handlers where appropriate
- No unnecessary re-renders
- Proper ref forwarding for external integrations

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android latest

## Migration from Previous Versions

This is the first version of the WorkspaceSwitcher component. No migration needed.

## Related Components

- [`Header`](../Header/README.md) - Page header component
- [`Sidebar`](../Sidebar/README.md) - Navigation sidebar
- [`useWorkspace`](../../hooks/useWorkspace.ts) - Workspace state management hook

## Support

For issues, feature requests, or contributions, please refer to the main UI Kit repository.
