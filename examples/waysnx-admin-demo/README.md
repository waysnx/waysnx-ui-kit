# WaysNX Admin Demo

The WaysNX Admin Demo is the reference application included with WaysNX UI Kit.

It demonstrates how multiple WaysNX UI Kit libraries can be composed to build a consistent admin-style React application.

The demo is intended for **reference, development, visual validation, and integration testing**. It is not intended to be a production application.

---

## What This Demo Demonstrates

The reference application currently includes three primary screens:

1. **Dashboard**
2. **Complete Form**
3. **Grid Listing**

These screens demonstrate common application patterns using WaysNX UI Kit components and libraries.

---

## Application Shell

The demo uses shared application-level elements across the reference screens.

These include:

- Header
- Sidebar navigation
- User menu
- Language selection
- Theme switching
- Accessibility controls
- Notifications and feedback

The purpose is to demonstrate how individual UI Kit libraries can work together as part of a consistent application shell.

---

## Dashboard

The Dashboard screen demonstrates the composition of UI Kit components for an application overview experience.

It is intended to demonstrate patterns such as:

- Dashboard layout
- Cards
- Metrics
- Visual information
- Navigation
- Responsive layout
- Theme-aware UI

The dashboard uses representative data rather than production data.

---

## Complete Form

The Complete Form screen demonstrates a realistic multi-field form.

It includes approximately **20–25 fields** and is intended to demonstrate:

- Form layout
- Input controls
- Select controls
- Date-related controls
- Validation
- Required fields
- Error states
- Feedback
- Field grouping
- Responsive form behavior
- Theme behavior
- Accessibility

The form demonstrates UI composition and validation patterns rather than a specific business workflow.

---

## Grid Listing

The Grid Listing screen demonstrates a data-oriented application interface.

It is intended to demonstrate:

- Grid layout
- Column configuration
- Data presentation
- Selection
- Pagination where applicable
- Sorting/filtering where applicable
- Loading and empty states
- Responsive behavior
- User interaction

The displayed data is synthetic.

---

## UI Kit Libraries

The demo is designed to demonstrate composition across multiple WaysNX UI Kit libraries.

Examples may include:

```text
@waysnx/ui-core
@waysnx/ui-layout
@waysnx/ui-feedback
@waysnx/ui-form-builder
@waysnx/ui-grid-builder