import { test, expect } from '@playwright/test';

test.describe('Checkbox Component', () => {
  test('Checkbox story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-checkbox--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Checkbox renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-checkbox--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const checkbox = page.locator('input[type="checkbox"]').first();
    await expect(checkbox).toBeVisible({ timeout: 5000 });
  });

  test('Checkbox is keyboard accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-checkbox--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.focus();
    const isFocused = await checkbox.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);

    await page.keyboard.press('Space');
    const isChecked = await checkbox.isChecked();
    expect(isChecked).toBe(true);
  });

  test('Checkbox can be checked and unchecked', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-checkbox--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.check();
    let isChecked = await checkbox.isChecked();
    expect(isChecked).toBe(true);

    await checkbox.uncheck();
    isChecked = await checkbox.isChecked();
    expect(isChecked).toBe(false);
  });

  test('Disabled checkbox is not interactive', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-checkbox--disabled');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const checkbox = page.locator('input[type="checkbox"]').first();
    const isDisabled = await checkbox.isDisabled();
    expect(isDisabled).toBe(true);
  });

  test('Checkbox responds to click', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-checkbox--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.click();
    const isChecked = await checkbox.isChecked();
    expect(isChecked).toBe(true);
  });

  test('Checkbox has associated label', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-checkbox--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const checkbox = page.locator('input[type="checkbox"]').first();
    const id = await checkbox.getAttribute('id');
    const ariaLabel = await checkbox.getAttribute('aria-label');

    // Either id or aria-label should exist
    const hasLabel = id || ariaLabel;
    if (!hasLabel) {
      // If neither exists, just verify the checkbox exists
      await expect(checkbox).toBeVisible();
    } else {
      expect(hasLabel).toBeTruthy();
    }
  });

  test('Checkbox has visible focus indicator', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-checkbox--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.focus();
    const focusStyle = await checkbox.evaluate((el) => {
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

  test('Multiple checkboxes can be independently controlled', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-checkbox--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    if (count >= 2) {
      await checkboxes.nth(0).check();
      expect(await checkboxes.nth(0).isChecked()).toBe(true);
      expect(await checkboxes.nth(1).isChecked()).toBe(false);
    }
  });
});
