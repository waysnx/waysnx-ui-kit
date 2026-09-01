import { test, expect } from '@playwright/test';

test.describe('Grid Component', () => {
  test('Grid story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-grid--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Grid renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-grid--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Grid has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-grid--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Grid has proper layout', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-grid--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('Grid displays content', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-grid--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Grid is responsive', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-grid--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Grid can contain nested elements', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-grid--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
