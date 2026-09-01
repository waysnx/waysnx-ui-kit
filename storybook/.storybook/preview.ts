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
  },
};

export default preview;
