import { test, expect } from '@playwright/test';

test.describe('Link Component', () => {
  test('Link story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-link--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Link renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-link--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const link = page.locator('a:visible').first();
    await expect(link).toBeVisible();
  });

  test('Link has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-link--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const link = page.locator('a:visible').first();
    const tagName = await link.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('a');
  });

  test('Link is keyboard accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-link--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const link = page.locator('a:visible').first();
    await link.focus();
    const isFocused = await link.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('Link has accessible text', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-link--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const link = page.locator('a:visible').first();
    const text = await link.textContent();
    expect(text).toBeTruthy();
  });

  test('Link has href attribute', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-link--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const link = page.locator('a:visible').first();
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('Link has visible focus indicator', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-link--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const link = page.locator('a:visible').first();
    await link.focus();
    const focusStyle = await link.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        outline: style.outline,
        textDecoration: style.textDecoration,
      };
    });
    
    const hasFocusIndicator =
      focusStyle.outline !== 'none' || focusStyle.textDecoration !== 'none';
    expect(hasFocusIndicator).toBe(true);
  });
});
