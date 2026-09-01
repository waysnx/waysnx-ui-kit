import { test, expect } from '@playwright/test';

test.describe('Currency Component', () => {
  test('Currency story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-currency--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Currency renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-currency--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await expect(input).toBeVisible();
  });

  test('Currency accepts numeric input', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-currency--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await input.fill('1000');
    const value = await input.inputValue();
    expect(value).toBeTruthy();
  });

  test('Currency is keyboard accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-currency--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await input.focus();
    const isFocused = await input.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('Currency has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-currency--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    const tagName = await input.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('input');
  });

  test('Currency can be cleared', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-currency--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await input.fill('500');
    await input.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    const value = await input.inputValue();
    expect(value).toBe('');
  });
});
