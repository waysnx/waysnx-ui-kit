/**
 * Package-local type augmentation for @waysnx/ui-security.
 *
 * Historically, many security components pass style-system-style props
 * (e.g. `padding`, `fontSize`, `color`) directly onto intrinsic `<div>` /
 * `<span>` elements. As confirmed by the runtime investigation, these props
 * are inert at runtime: they are not backed by a styling primitive, CSS
 * attribute selectors, or a styling framework, and the visible styling comes
 * from existing WaysNX primitives, legitimate `style={{ ... }}` usage, and
 * existing CSS classes. React passes unknown props through without applying
 * any styling.
 *
 * This declaration lets those existing, inert props type-check so the package
 * can emit declaration files, WITHOUT changing runtime behavior, without
 * introducing a styling primitive/framework, and without touching the call
 * sites. The keys are enumerated explicitly (no `[key: string]: any`) and the
 * augmentation is scoped to this package's compilation only — it lives under
 * `src/@types` which is included solely by this package's tsconfig, so it does
 * not affect the public API or the typings used by other packages.
 */

import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    // Layout / box
    display?: string | number;
    position?: string;
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
    overflow?: string;
    overflowX?: string;
    flex?: string | number;
    flexDirection?: string;
    flexWrap?: string;
    gap?: string | number;
    justifyContent?: string;
    alignItems?: string;

    // Spacing
    margin?: string | number;
    marginTop?: string | number;
    marginBottom?: string | number;
    padding?: string | number;
    paddingTop?: string | number;
    paddingLeft?: string | number;

    // Sizing
    width?: string | number;
    height?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    minHeight?: string | number;
    maxHeight?: string | number;

    // Border / radius
    border?: string | number;
    borderTop?: string;
    borderLeft?: string;
    borderColor?: string;
    borderLeftColor?: string;
    borderRadius?: string | number;

    // Typography
    fontSize?: string | number;
    fontWeight?: string | number;
    fontFamily?: string;
    lineHeight?: string | number;
    textAlign?: string;
    wordBreak?: string;

    // Color / surface
    color?: string;
    backgroundColor?: string;

    // Misc presentational
    cursor?: string;
    transition?: string;

    /**
     * Polymorphic element hint used by some legacy security components
     * (e.g. `<span as="h3">`). Inert at runtime.
     */
    as?: string;
  }
}
