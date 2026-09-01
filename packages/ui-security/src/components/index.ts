/**
 * Security Components
 *
 * Reusable React components for security-related functionality
 *
 * Components are organized by domain for better maintainability:
 * - Authentication: Login, card, and password management
 * - Password: Input, strength, generation, and requirements
 * - OTP: One-Time Password input, verification, and resend
 * - Verification: Email, phone, device, and multi-step verification
 * - Authorization: Permission gates, role-based access, feature flags
 * - Session: Timeout, idle monitoring, concurrent sessions, active sessions
 * - SecureInputs: Enhanced inputs with validation, masking, secure handling
 * - MFA: Multi-factor authentication setup, verification, backup codes
 * - SecurityDashboard: Status cards, alerts, scores, health indicators
 * - Audit: Timeline, history tables, activity feeds, event logs
 * - SecuritySettings: Configuration panels for all security features
 * - Captcha: Google reCAPTCHA, Cloudflare Turnstile, hCaptcha
 * - SSO: OAuth buttons for Google, Microsoft, GitHub, Okta, Auth0
 */

// Re-export all domain components
export * from './Authentication';
export * from './Password';
export * from './OTP';
export * from './Verification';
export * from './Authorization';
export * from './Session';
export * from './SecureInputs';
export * from './MFA';
export * from './SecurityDashboard';
export * from './Audit';
export * from './SecuritySettings';
export * from './Captcha';
export * from './SSO';
