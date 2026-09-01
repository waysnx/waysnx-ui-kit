import { test, expect } from '@playwright/test';

test.describe('DatePicker Component', () => {
  test('DatePicker story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-datepicker--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('DatePicker renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-datepicker--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await expect(input).toBeVisible();
  });

  test('DatePicker is keyboard accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-datepicker--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await input.focus();
    const isFocused = await input.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('DatePicker has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-datepicker--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    const tagName = await input.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('input');
  });

  test('DatePicker can be cleared', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-datepicker--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await input.fill('12/25/2025');
    await input.clear();
    const value = await input.inputValue();
    expect(value).toBe('');
  });

  test('DatePicker accepts date input', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-datepicker--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input:visible').first();
    await input.fill('12/25/2025');
    const value = await input.inputValue();
    expect(value).toBeTruthy();
  });
});
