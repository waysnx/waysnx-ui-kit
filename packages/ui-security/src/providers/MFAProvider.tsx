/**
 * MFAProvider
 *
 * Context provider for multi-factor authentication
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { MFAConfiguration, MFAVerificationRequest } from '../types/mfa';

export interface MFAContextValue {
  mfaConfig: MFAConfiguration | null;
  isVerifying: boolean;
  verificationError: Error | null;
  setupMFA: (method: string) => Promise<void>;
  verifyMFA: (request: MFAVerificationRequest) => Promise<boolean>;
  disableMFA: () => Promise<void>;
  regenerateBackupCodes: () => Promise<string[]>;
  addTrustedDevice: (deviceName: string, trustDays?: number) => Promise<void>;
  removeTrustedDevice: (deviceId: string) => Promise<void>;
  clearVerificationError: () => void;
}

const MFAContext = createContext<MFAContextValue | undefined>(undefined);

export interface MFAProviderProps {
  children: ReactNode;
  initialConfig?: MFAConfiguration | null;
  onMFAStatusChange?: (config: MFAConfiguration | null) => void;
}

/**
 * MFAProvider - Manages MFA configuration and verification
 */
export const MFAProvider: React.FC<MFAProviderProps> = ({
  children,
  initialConfig = null,
  onMFAStatusChange,
}) => {
  const [mfaConfig, setMfaConfig] = useState<MFAConfiguration | null>(initialConfig);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<Error | null>(null);

  const setupMFA = useCallback(
    async (method: string) => {
      setIsVerifying(true);
      setVerificationError(null);

      try {
        const newConfig: MFAConfiguration = {
          id: '',
          userId: '',
          isEnabled: true,
          primaryMethod: method as any,
          backupMethods: [method as any],
          status: 'pending_verification',
          createdAt: new Date(),
        };
        setMfaConfig(newConfig);
        onMFAStatusChange?.(newConfig);
      } catch (error) {
        const err = error instanceof Error ? error : new Error('MFA setup failed');
        setVerificationError(err);
        throw err;
      } finally {
        setIsVerifying(false);
      }
    },
    [onMFAStatusChange]
  );

  const verifyMFA = useCallback(
    async (_request: MFAVerificationRequest): Promise<boolean> => {
      setIsVerifying(true);
      setVerificationError(null);

      try {
        // In production, call actual verification service
        return true;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('MFA verification failed');
        setVerificationError(err);
        throw err;
      } finally {
        setIsVerifying(false);
      }
    },
    []
  );

  const disableMFA = useCallback(async () => {
    setIsVerifying(true);
    setVerificationError(null);

    try {
      setMfaConfig(null);
      onMFAStatusChange?.(null);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('MFA disable failed');
      setVerificationError(err);
      throw err;
    } finally {
      setIsVerifying(false);
    }
  }, [onMFAStatusChange]);

  const regenerateBackupCodes = useCallback(async (): Promise<string[]> => {
    setIsVerifying(true);
    setVerificationError(null);

    try {
      const codes = Array.from({ length: 10 }, () =>
        Math.random().toString(36).substring(2, 10).toUpperCase()
      );
      return codes;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Backup codes generation failed');
      setVerificationError(err);
      throw err;
    } finally {
      setIsVerifying(false);
    }
  }, []);

  const addTrustedDevice = useCallback(
    async (_deviceName: string, _trustDays?: number) => {
      setIsVerifying(true);
      setVerificationError(null);

      try {
        // In production, call device management service
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Failed to trust device');
        setVerificationError(err);
        throw err;
      } finally {
        setIsVerifying(false);
      }
    },
    []
  );

  const removeTrustedDevice = useCallback(async (_deviceId: string) => {
    setIsVerifying(true);
    setVerificationError(null);

    try {
      // In production, call device management service
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to remove device');
      setVerificationError(err);
      throw err;
    } finally {
      setIsVerifying(false);
    }
  }, []);

  const clearVerificationError = useCallback(() => {
    setVerificationError(null);
  }, []);

  const value: MFAContextValue = {
    mfaConfig,
    isVerifying,
    verificationError,
    setupMFA,
    verifyMFA,
    disableMFA,
    regenerateBackupCodes,
    addTrustedDevice,
    removeTrustedDevice,
    clearVerificationError,
  };

  return <MFAContext.Provider value={value}>{children}</MFAContext.Provider>;
};

/**
 * useMFA - Hook to access MFA context
 */
export const useMFA = (): MFAContextValue => {
  const context = useContext(MFAContext);

  if (!context) {
    throw new Error('useMFA must be used within MFAProvider');
  }

  return context;
};

export default MFAProvider;
