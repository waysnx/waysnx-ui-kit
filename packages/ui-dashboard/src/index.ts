/**
 * @file index.ts
 * Main barrel export for @waysnx/ui-dashboard
 */

// Styles
import "./styles/index.css";

// Types
export * from "./types";

// Context & Providers
export { DashboardProvider, DashboardContext } from "./context";

// Hooks (useDashboard is in hooks, not context)
export * from "./hooks";

// Components
export * from "./components";

// Utilities
export * from "./utils";
