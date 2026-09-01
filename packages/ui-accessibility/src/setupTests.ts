import '@testing-library/jest-dom';
import { expect, afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  localStorage.clear();
  sessionStorage.clear();
});

// Setup localStorage with working implementation
let localStorageData: Record<string, string> = {};

const localStorageMock = {
  getItem: vi.fn((key: string) => localStorageData[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    localStorageData[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete localStorageData[key];
  }),
  clear: vi.fn(() => {
    localStorageData = {};
  }),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Setup sessionStorage with working implementation
let sessionStorageData: Record<string, string> = {};

const sessionStorageMock = {
  getItem: vi.fn((key: string) => sessionStorageData[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    sessionStorageData[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete sessionStorageData[key];
  }),
  clear: vi.fn(() => {
    sessionStorageData = {};
  }),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true,
});

// Reset storage before each test
beforeEach(() => {
  localStorageData = {};
  sessionStorageData = {};
  vi.mocked(localStorage.getItem).mockImplementation((key: string) => localStorageData[key] || null);
  vi.mocked(localStorage.setItem).mockImplementation((key: string, value: string) => {
    localStorageData[key] = value;
  });
  vi.mocked(localStorage.removeItem).mockImplementation((key: string) => {
    delete localStorageData[key];
  });
  vi.mocked(localStorage.clear).mockImplementation(() => {
    localStorageData = {};
  });
  vi.mocked(sessionStorage.getItem).mockImplementation((key: string) => sessionStorageData[key] || null);
  vi.mocked(sessionStorage.setItem).mockImplementation((key: string, value: string) => {
    sessionStorageData[key] = value;
  });
  vi.mocked(sessionStorage.removeItem).mockImplementation((key: string) => {
    delete sessionStorageData[key];
  });
  vi.mocked(sessionStorage.clear).mockImplementation(() => {
    sessionStorageData = {};
  });
});

// Mock CSS variables
const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
const originalRemoveProperty = CSSStyleDeclaration.prototype.removeProperty;

CSSStyleDeclaration.prototype.setProperty = vi.fn(function(
  prop: string,
  value: string,
  priority?: string
) {
  return originalSetProperty.call(this, prop, value, priority);
});

CSSStyleDeclaration.prototype.removeProperty = vi.fn(function(prop: string) {
  return originalRemoveProperty.call(this, prop);
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Create mock announcements API
if (!document.getElementById('__accessibility-announcements')) {
  const mockAriaLiveElement = document.createElement('div');
  mockAriaLiveElement.id = '__accessibility-announcements';
  mockAriaLiveElement.setAttribute('role', 'region');
  mockAriaLiveElement.setAttribute('aria-live', 'polite');
  mockAriaLiveElement.setAttribute('aria-atomic', 'true');
  mockAriaLiveElement.setAttribute('aria-label', 'Announcements');
  document.body.appendChild(mockAriaLiveElement);
}

// Suppress specific console errors in tests (optional)
const originalError = console.error;
const originalWarn = console.warn;

beforeEach(() => {
  console.error = vi.fn((...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
       args[0].includes('QuotaExceededError'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  });
  
  console.warn = vi.fn((...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning:')) {
      return;
    }
    originalWarn.call(console, ...args);
  });
});

afterEach(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

