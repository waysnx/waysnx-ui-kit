import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// WaysNX CSS imports (required for all packages)
import '@waysnx/ui-core/dist/index.css';
import '@waysnx/ui-form-builder/dist/index.css';
import '@waysnx/ui-layout/dist/index.css';
import '@waysnx/ui-feedback/dist/index.css';
import '@waysnx/ui-grid-builder/dist/index.css';
import '@waysnx/ui-navigation/dist/index.css';
import '@waysnx/ui-dashboard/dist/index.css';
import '@waysnx/ui-accessibility/dist/index.css';
import '@waysnx/ui-security/dist/index.css';

// Third-party CSS
import 'react-datepicker/dist/react-datepicker.css';

// App styles
import './styles/theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
