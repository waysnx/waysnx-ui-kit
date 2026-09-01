/**
 * Verification Domain Components
 * 
 * Components for email, phone, device, and multi-step verification workflows
 */

export { EmailVerificationCard } from './EmailVerificationCard';
export type { EmailVerificationCardProps } from './EmailVerificationCard';

export { PhoneVerificationCard } from './PhoneVerificationCard';
export type { PhoneVerificationCardProps } from './PhoneVerificationCard';

export { DeviceVerificationDialog } from './DeviceVerificationDialog';
export type { DeviceVerificationDialogProps } from './DeviceVerificationDialog';

export { VerificationStatus } from './VerificationStatus';
export type {
  VerificationStatusProps,
  VerificationStep,
  VerificationStepStatus,
  VerificationStepInfo,
} from './VerificationStatus';
