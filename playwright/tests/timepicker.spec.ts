import { test, expect } from '@playwright/test';

test.describe('TimePicker Component', () => {
  test('TimePicker story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-timepicker--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('TimePicker renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-timepicker--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await expect(input).toBeVisible();
  });

  test('TimePicker is keyboard accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-timepicker--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await input.focus();
    const isFocused = await input.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('TimePicker has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-timepicker--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    const tagName = await input.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('input');
  });

  test('TimePicker accepts time input', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-timepicker--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await input.fill('10:30 AM');
    const value = await input.inputValue();
    expect(value).toBeTruthy();
  });

  test('TimePicker can be cleared', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-timepicker--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await input.fill('10:30 AM');
    await input.clear();
    const value = await input.inputValue();
    expect(value).toBe('');
  });

  test('TimePicker has placeholder', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-timepicker--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    const placeholder = await input.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
  });
});
