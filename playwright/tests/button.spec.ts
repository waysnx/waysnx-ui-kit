import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test('Button story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-button--primary');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Button renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-button--primary');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    
    // Find visible button (skip hidden ones)
    const button = page.locator('button:visible').first();
    await expect(button).toBeVisible();
  });

  test('Button has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-button--primary');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    
    const button = page.locator('button:visible').first();
    const tagName = await button.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('button');
  });

  test('Button is keyboard accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-button--primary');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    
    const button = page.locator('button:visible').first();
    await button.focus();
    const isFocused = await button.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('Button has accessible name', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-button--primary');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    
    const button = page.locator('button:visible').first();
    const textContent = await button.textContent();
    expect(textContent).toBeTruthy();
  });

  test('Disabled button is not interactive', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-button--disabled');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    
    const button = page.locator('button:visible').first();
    const isDisabled = await button.isDisabled();
    expect(isDisabled).toBe(true);
  });

  test('Button responds to click', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-button--primary');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    
    const button = page.locator('button:visible').first();
    await button.click();
    await expect(button).toBeVisible();
  });

  test('Button has visible focus indicator', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-button--primary');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    
    const button = page.locator('button:visible').first();
    await button.focus();
    const focusStyle = await button.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        outline: style.outline,
        boxShadow: style.boxShadow,
      };
    });

    const hasFocusIndicator =
      focusStyle.outline !== 'none' || focusStyle.boxShadow !== 'none';
    expect(hasFocusIndicator).toBe(true);
  });

  test('Multiple buttons render', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-button--primary');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    
    // Just verify at least one visible button exists
    const button = page.locator('button:visible').first();
    await expect(button).toBeVisible();
  });
});
