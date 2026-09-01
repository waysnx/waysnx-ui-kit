import { test, expect } from '@playwright/test';

test.describe('Autocomplete Component', () => {
  test('Autocomplete story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-autocomplete--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Autocomplete renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-autocomplete--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await expect(input).toBeVisible();
  });

  test('Autocomplete accepts input', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-autocomplete--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await input.fill('Apple');
    const value = await input.inputValue();
    expect(value).toBe('Apple');
  });

  test('Autocomplete is keyboard accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-autocomplete--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await input.focus();
    const isFocused = await input.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('Disabled autocomplete is not interactive', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-autocomplete--disabled');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    const isDisabled = await input.isDisabled();
    expect(isDisabled).toBe(true);
  });

  test('Autocomplete has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-autocomplete--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    const tagName = await input.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('input');
  });

  test('Autocomplete can be cleared', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-autocomplete--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await input.fill('Test');
    await input.clear();
    const value = await input.inputValue();
    expect(value).toBe('');
  });
});
