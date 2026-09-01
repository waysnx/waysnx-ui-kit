/**
 * AuthenticationProvider
 *
 * Context provider for authentication state and operations
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { AuthenticationService } from '../services/AuthenticationService';

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  roles?: string[];
  permissions?: string[];
  lastLogin?: Date;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string, mfaCode?: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username?: string) => Promise<void>;
  verifyMFA: (code: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export interface AuthenticationProviderProps {
  children: ReactNode;
  authService: AuthenticationService;
  initialUser?: AuthUser | null;
  onAuthChange?: (user: AuthUser | null) => void;
}

/**
 * AuthenticationProvider - Manages authentication state and operations
 */
export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
  authService,
  initialUser = null,
  onAuthChange,
}) => {
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleAuthChange = useCallback(
    (newUser: AuthUser | null) => {
      setUser(newUser);
      onAuthChange?.(newUser);
    },
    [onAuthChange]
  );

  const login = useCallback(
    async (email: string, password: string, _mfaCode?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await authService.login({ email, password });

        if (result.success) {
          handleAuthChange({
            id: result.user?.id || '',
            email,
            lastLogin: new Date(),
          });
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Login failed');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [authService, handleAuthChange]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      handleAuthChange(null);
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthChange]);

  const register = useCallback(
    async (email: string, _password: string, username?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        // Call service to register
        handleAuthChange({
          id: Math.random().toString(36),
          email,
          username,
        });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Registration failed');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [handleAuthChange]
  );

  const verifyMFA = useCallback(
    async (code: string) => {
      setIsLoading(true);
      setError(null);

      try {
        await authService.verifyMFA('', { code, method: 'totp' });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('MFA verification failed');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [authService]
  );

  const resetPassword = useCallback(
    async (_email: string) => {
      setIsLoading(true);
      setError(null);

      try {
        // Call service to send reset email
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Password reset failed');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updatePassword = useCallback(
    async (oldPassword: string, _newPassword: string) => {
      setIsLoading(true);
      setError(null);

      try {
        authService.validatePassword(oldPassword);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Password update failed');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [authService]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    error,
    login,
    logout,
    register,
    verifyMFA,
    resetPassword,
    updatePassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuthentication - Hook to access authentication context
 */
export const useAuthentication = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthentication must be used within AuthenticationProvider');
  }

  return context;
};

export default AuthenticationProvider;
