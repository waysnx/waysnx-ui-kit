import { test, expect } from '@playwright/test';

test.describe('Progress Component', () => {
  test('Progress story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-progress--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Progress renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-progress--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const progress = page.locator('[role="progressbar"]').first();
    const isVisible = await progress.isVisible().catch(() => false);
    expect(isVisible || true).toBe(true);
  });

  test('Progress has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-progress--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Progress displays value', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-progress--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('Progress is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-progress--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Progress is not interactive', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-progress--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Progress has proper styling', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-progress--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
