import { test, expect } from '@playwright/test';

test.describe('Input Component', () => {
  test('Input story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-input--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Input renders in story', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-input--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input').first();
    await expect(input).toBeVisible({ timeout: 5000 });
  });

  test('Input accepts text', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-input--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input').first();
    await input.fill('Test input');
    const value = await input.inputValue();
    expect(value).toBe('Test input');
  });

  test('Input can be cleared', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-input--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input').first();
    await input.fill('Test');
    await input.clear();
    const value = await input.inputValue();
    expect(value).toBe('');
  });

  test('Input is keyboard accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-input--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input').first();
    await input.focus();
    const isFocused = await input.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('Disabled input is not interactive', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-input--disabled');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input').first();
    const isDisabled = await input.isDisabled();
    expect(isDisabled).toBe(true);
  });

  test('Input with error shows validation state', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-input--with-error');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input').first();
    const ariaInvalid = await input.getAttribute('aria-invalid');
    expect(ariaInvalid).toBe('true');
  });

  test('Input has label', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-input--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const label = page.locator('label').first();
    await expect(label).toBeVisible({ timeout: 5000 });
  });

  test('Input has placeholder', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-input--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input').first();
    const placeholder = await input.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
  });

  test('Input is semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-input--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const input = page.locator('input').first();
    const tagName = await input.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('input');
  });
});
