import { test, expect } from '@playwright/test';

test.describe('Textarea Component', () => {
  test('Textarea story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-textarea--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Textarea renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-textarea--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const textarea = page.locator('textarea:visible').first();
    await expect(textarea).toBeVisible();
  });

  test('Textarea accepts text input', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-textarea--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const textarea = page.locator('textarea:visible').first();
    await textarea.fill('Test textarea content');
    const value = await textarea.inputValue();
    expect(value).toBe('Test textarea content');
  });

  test('Textarea is keyboard accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-textarea--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const textarea = page.locator('textarea:visible').first();
    await textarea.focus();
    const isFocused = await textarea.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('Textarea has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-textarea--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const textarea = page.locator('textarea:visible').first();
    const tagName = await textarea.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('textarea');
  });

  test('Textarea can be cleared', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-textarea--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const textarea = page.locator('textarea:visible').first();
    await textarea.fill('Test');
    await textarea.clear();
    const value = await textarea.inputValue();
    expect(value).toBe('');
  });

  test('Textarea has placeholder', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-textarea--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const textarea = page.locator('textarea:visible').first();
    const placeholder = await textarea.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
  });

  test('Disabled textarea is not interactive', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-textarea--disabled');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const textarea = page.locator('textarea:visible').first();
    const isDisabled = await textarea.isDisabled();
    expect(isDisabled).toBe(true);
  });
});
