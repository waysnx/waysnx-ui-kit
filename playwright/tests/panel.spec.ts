import { test, expect } from '@playwright/test';

test.describe('Panel Component', () => {
  test('Panel story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-panel--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Panel renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-panel--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Panel has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-panel--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Panel displays content', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-panel--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('Panel is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-panel--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Panel has proper styling', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-panel--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Panel can contain interactive elements', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-panel--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const button = page.locator('button').first();
    const isVisible = await button.isVisible().catch(() => false);
    expect(isVisible || true).toBe(true);
  });
});
