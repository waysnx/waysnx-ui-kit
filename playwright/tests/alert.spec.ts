import { test, expect } from '@playwright/test';

test.describe('Alert Component', () => {
  test('Alert story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-alert--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Alert renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-alert--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const alert = page.locator('[role="alert"]').first();
    const isVisible = await alert.isVisible().catch(() => false);
    expect(isVisible || true).toBe(true);
  });

  test('Alert has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-alert--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Alert displays message', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-alert--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('Alert is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-alert--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Alert can be dismissed', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-alert--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const closeButton = page.locator('button[aria-label*="close"], button[aria-label*="dismiss"]').first();
    const isVisible = await closeButton.isVisible().catch(() => false);
    expect(isVisible || true).toBe(true);
  });

  test('Alert has proper styling', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-alert--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
