import type { Preview } from '@storybook/react';

// WaysNX package CSS
import '@waysnx/ui-core/dist/styles/index.css';
import '@waysnx/ui-form-builder/dist/index.css';
import '@waysnx/ui-layout/dist/index.css';
import '@waysnx/ui-feedback/dist/index.css';
import '@waysnx/ui-grid-builder/dist/index.css';
import '@waysnx/ui-visualization/dist/index.css';
import '@waysnx/ui-accessibility/dist/index.css';
import '@waysnx/ui-navigation/dist/index.css';
import '@waysnx/ui-dashboard/dist/index.css';
import '@waysnx/ui-security/dist/index.css';
import '@waysnx/ui-communication/dist/index.css';
import '@waysnx/ui-maps/dist/index.css';
import '@waysnx/ui-media/dist/index.css';
import '@waysnx/ui-files/dist/index.css';
import '@waysnx/ui-data/dist/index.css';
import 'react-datepicker/dist/react-datepicker.css';

import './storybook-global.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    docs: {
      toc: true,
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    options: {
      // Ordering only — this does NOT change story titles or story IDs, so
      // existing Playwright story-id references remain valid. It surfaces the
      // "WaysNX UI Kit" overview/catalog first, then lists the component
      // sections in a predictable order. Sections not listed here fall back to
      // alphabetical after the named ones.
      storySort: {
        order: [
          'WaysNX UI Kit',
          ['Overview', 'Libraries'],
          'Components',
          'Accessibility',
          'Communication',
          'Dashboard',
          'Data',
          'Diagnostics',
          'Docs',
          'Files',
          'Maps',
          'Media',
          'Navigation',
          'Enterprise',
          'Security',
          'Visualization',
          '*',
        ],
      },
    },
  },
};

export default preview;
