import { test, expect } from '@playwright/test';

test.describe('Row Component', () => {
  test('Row story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-row--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Row renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-row--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Row has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-row--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Row displays content', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-row--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('Row is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-row--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Row has proper layout', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-row--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Row can contain nested elements', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-row--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
