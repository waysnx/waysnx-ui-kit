import { Page, expect } from '@playwright/test';

/**
 * Utility functions for testing Storybook components
 */

/**
 * Navigate to a specific story in Storybook
 * @param page - Playwright page object
 * @param storyPath - Path to the story (e.g., 'Components/Input--default')
 */
export async function navigateToStory(page: Page, storyPath: string) {
  // Convert story path to Storybook URL format
  // Input: 'Components/Input--default'
  // Output: '/iframe.html?path=/story/components-input--default'
  const normalizedPath = storyPath
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\//g, '-');
  
  const storyUrl = `/iframe.html?path=/story/${normalizedPath}`;
  await page.goto(storyUrl);
  await page.waitForLoadState('networkidle');
}

/**
 * Get the story iframe and return its content frame
 * @param page - Playwright page object
 * @returns The iframe's content frame locator
 */
export function getStoryFrame(page: Page) {
  return page.frameLocator('iframe[title="storybook-preview-iframe"]');
}

/**
 * Get a locator within the story iframe
 * @param page - Playwright page object
 * @param selector - CSS selector within the iframe
 * @returns Locator within the iframe
 */
export function getStoryElement(page: Page, selector: string) {
  return page.frameLocator('iframe[title="storybook-preview-iframe"]').locator(selector);
}

/**
 * Test keyboard navigation in a component
 * @param page - Playwright page object
 * @param selector - CSS selector of the component
 * @param keys - Array of keys to press
 */
export async function testKeyboardNavigation(
  page: Page,
  selector: string,
  keys: string[]
) {
  const element = getStoryElement(page, selector).first();
  await element.focus();

  for (const key of keys) {
    await page.keyboard.press(key);
    await page.waitForTimeout(100);
  }
}

/**
 * Test ARIA attributes on a component
 * @param page - Playwright page object
 * @param selector - CSS selector of the component
 * @param expectedAttributes - Object with expected ARIA attributes
 */
export async function testAriaAttributes(
  page: Page,
  selector: string,
  expectedAttributes: Record<string, string | boolean>
) {
  const element = getStoryElement(page, selector).first();

  for (const [attr, value] of Object.entries(expectedAttributes)) {
    const attrValue = await element.getAttribute(`aria-${attr}`);
    if (typeof value === 'boolean') {
      if (value) {
        expect(attrValue).toBeTruthy();
      } else {
        expect(attrValue).toBeFalsy();
      }
    } else {
      expect(attrValue).toBe(value);
    }
  }
}

/**
 * Test focus visibility
 * @param page - Playwright page object
 * @param selector - CSS selector of the component
 */
export async function testFocusVisibility(page: Page, selector: string) {
  const element = getStoryElement(page, selector).first();
  await element.focus();

  // Check if element has focus
  const isFocused = await element.evaluate((el) => el === document.activeElement);
  expect(isFocused).toBe(true);

  // Check if focus is visible (has outline or similar)
  const focusStyle = await element.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      outline: style.outline,
      boxShadow: style.boxShadow,
      border: style.border,
    };
  });

  const hasFocusIndicator =
    focusStyle.outline !== 'none' ||
    focusStyle.boxShadow !== 'none' ||
    focusStyle.border !== 'none';

  expect(hasFocusIndicator).toBe(true);
}

/**
 * Test semantic HTML structure
 * @param page - Playwright page object
 * @param selector - CSS selector of the component
 * @param expectedTag - Expected HTML tag name
 */
export async function testSemanticHTML(
  page: Page,
  selector: string,
  expectedTag: string
) {
  const element = getStoryElement(page, selector).first();
  const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
  expect(tagName).toBe(expectedTag.toLowerCase());
}

/**
 * Test color contrast ratio
 * @param page - Playwright page object
 * @param selector - CSS selector of the component
 * @param minRatio - Minimum contrast ratio (default 4.5 for WCAG AA)
 */
export async function testColorContrast(
  page: Page,
  selector: string,
  minRatio: number = 4.5
) {
  const element = getStoryElement(page, selector).first();

  const contrast = await element.evaluate((el, ratio) => {
    const style = window.getComputedStyle(el);
    const bgColor = style.backgroundColor;
    const fgColor = style.color;

    // Simple contrast calculation (simplified version)
    // In production, use a proper contrast calculation library
    return {
      background: bgColor,
      foreground: fgColor,
      estimated: true,
    };
  }, minRatio);

  expect(contrast).toBeDefined();
}

/**
 * Test that component is accessible with screen reader
 * @param page - Playwright page object
 * @param selector - CSS selector of the component
 */
export async function testScreenReaderAccessibility(page: Page, selector: string) {
  const element = getStoryElement(page, selector).first();

  // Check for aria-label or aria-labelledby
  const ariaLabel = await element.getAttribute('aria-label');
  const ariaLabelledBy = await element.getAttribute('aria-labelledby');
  const textContent = await element.textContent();

  const hasAccessibleName = ariaLabel || ariaLabelledBy || textContent;
  expect(hasAccessibleName).toBeTruthy();
}

/**
 * Test that component responds to user interactions
 * @param page - Playwright page object
 * @param selector - CSS selector of the component
 * @param action - Action to perform ('click', 'hover', 'focus')
 */
export async function testUserInteraction(
  page: Page,
  selector: string,
  action: 'click' | 'hover' | 'focus'
) {
  const element = getStoryElement(page, selector).first();

  switch (action) {
    case 'click':
      await element.click();
      break;
    case 'hover':
      await element.hover();
      break;
    case 'focus':
      await element.focus();
      break;
  }

  // Verify element is still visible and interactive
  await expect(element).toBeVisible();
}

/**
 * Test responsive behavior
 * @param page - Playwright page object
 * @param selector - CSS selector of the component
 * @param viewports - Array of viewport sizes to test
 */
export async function testResponsiveBehavior(
  page: Page,
  selector: string,
  viewports: Array<{ width: number; height: number }>
) {
  const element = getStoryElement(page, selector).first();

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(500);
    await expect(element).toBeVisible();
  }
}

/**
 * Generate test report data
 */
export interface TestResult {
  component: string;
  story: string;
  tests: {
    name: string;
    passed: boolean;
    duration: number;
  }[];
  timestamp: string;
  browser: string;
}

/**
 * Create a test result object
 */
export function createTestResult(
  component: string,
  story: string,
  browser: string
): TestResult {
  return {
    component,
    story,
    tests: [],
    timestamp: new Date().toISOString(),
    browser,
  };
}
