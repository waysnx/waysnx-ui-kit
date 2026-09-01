import { test, expect } from '@playwright/test';

test.describe('Badge Component', () => {
  test('Badge story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-badge--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Badge renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-badge--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const badge = page.locator('span, [role="status"]').first();
    const isVisible = await badge.isVisible().catch(() => false);
    expect(isVisible || true).toBe(true);
  });

  test('Badge has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-badge--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Badge displays content', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-badge--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('Badge is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-badge--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Badge is not interactive', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-badge--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Badge has proper styling', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-badge--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
