/**
 * useSecureStorage Hook
 *
 * Provides secure access to localStorage and sessionStorage with encryption
 */

import { useState, useCallback } from 'react';

export type StorageType = 'local' | 'session';

export interface UseSecureStorageOptions {
  /**
   * Storage type to use
   */
  storageType?: StorageType;
  /**
   * Encrypt stored values
   */
  encrypt?: boolean;
  /**
   * Default value if key not found
   */
  defaultValue?: any;
}

/**
 * useSecureStorage - Hook for secure storage access
 */
export const useSecureStorage = <T = any>(
  key: string,
  options: UseSecureStorageOptions = {}
) => {
  const {
    storageType = 'local',
    encrypt = true,
    defaultValue = null,
  } = options;

  const storage = storageType === 'local' ? localStorage : sessionStorage;
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storage.getItem(key);
      if (item === null) {
        return defaultValue;
      }

      let value = item;
      // Simple encryption simulation (in production, use actual encryption)
      if (encrypt && item.startsWith('ENC:')) {
        value = atob(item.substring(4));
      }

      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Failed to read from ${storageType} storage:`, error);
      return defaultValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        let serialized = JSON.stringify(valueToStore);
        if (encrypt) {
          serialized = 'ENC:' + btoa(serialized);
        }

        storage.setItem(key, serialized);
        setStoredValue(valueToStore);

        // Dispatch storage event for other tabs/windows
        window.dispatchEvent(
          new StorageEvent('storage', {
            key,
            newValue: serialized,
            storageArea: storage,
          })
        );
      } catch (error) {
        console.error(`Failed to write to ${storageType} storage:`, error);
      }
    },
    [key, storage, storedValue, encrypt, storageType]
  );

  const removeValue = useCallback(() => {
    try {
      storage.removeItem(key);
      setStoredValue(defaultValue);

      window.dispatchEvent(
        new StorageEvent('storage', {
          key,
          newValue: null,
          storageArea: storage,
        })
      );
    } catch (error) {
      console.error(`Failed to remove from ${storageType} storage:`, error);
    }
  }, [key, storage, defaultValue, storageType]);

  const clear = useCallback(() => {
    try {
      storage.clear();
      setStoredValue(defaultValue);
    } catch (error) {
      console.error(`Failed to clear ${storageType} storage:`, error);
    }
  }, [storage, defaultValue, storageType]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    clear,
  };
};

export default useSecureStorage;
