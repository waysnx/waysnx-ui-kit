import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

// The 18 focused WaysNX UI libraries. Storybook resolves the bare package
// specifier (e.g. `@waysnx/ui-core`) to the package SOURCE entry rather than
// the built, minified `dist`. This is required so that:
//   1. Component display names are correct in generated docs source snippets
//      (the minified dist renames `Button` -> `dt`, which leaked into examples).
//   2. react-docgen can read the real TypeScript prop interfaces (the minified
//      dist has no types, which produced `unknown` in Props tables).
// Subpath imports such as `@waysnx/ui-core/dist/styles/index.css` are left
// untouched (the aliases below only match the exact bare specifier), so the
// existing CSS imports in preview.ts continue to resolve from the built dist.
const WAYSNX_LIBRARIES = [
  'ui-accessibility',
  'ui-communication',
  'ui-core',
  'ui-dashboard',
  'ui-data',
  'ui-diagnostics',
  'ui-docs',
  'ui-feedback',
  'ui-files',
  'ui-form-builder',
  'ui-grid-builder',
  'ui-i18n',
  'ui-layout',
  'ui-maps',
  'ui-media',
  'ui-navigation',
  'ui-security',
  'ui-visualization',
];

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    // Use react-docgen-typescript so Props tables read real TS interfaces from
    // source (fixes `unknown` prop metadata). Applies generically to all
    // components, not a per-component patch.
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // Keep the WaysNX component props; drop noise inherited from node_modules
      // (e.g. every intrinsic HTML attribute) unless declared in a WaysNX file.
      propFilter: (prop) => {
        if (prop.parent) {
          return !/node_modules/.test(prop.parent.fileName);
        }
        return true;
      },
    },
  },
  viteFinal: async (config) => {
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = [
      ...(config.server.fs.allow || []),
      path.resolve(__dirname, '..'),
      path.resolve(__dirname, '../..'),
    ];

    // Resolve the bare `@waysnx/ui-*` specifier to the package source entry.
    // Use an exact-match RegExp so subpath imports (…/dist/…css) are not aliased.
    config.resolve = config.resolve || {};
    const existingAlias = config.resolve.alias;
    const aliasArray = Array.isArray(existingAlias)
      ? existingAlias
      : Object.entries(existingAlias || {}).map(([find, replacement]) => ({
          find,
          replacement: replacement as string,
        }));

    for (const lib of WAYSNX_LIBRARIES) {
      aliasArray.push({
        find: new RegExp(`^@waysnx/${lib}$`),
        replacement: path.resolve(__dirname, `../../packages/${lib}/src/index.ts`),
      });
    }
    config.resolve.alias = aliasArray;

    return config;
  },
};

export default config;
