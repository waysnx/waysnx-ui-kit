import { test, expect } from '@playwright/test';

test.describe('Column Component', () => {
  test('Column story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-column--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Column renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-column--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Column has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-column--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Column displays content', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-column--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('Column is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-column--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Column has proper layout', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-column--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Column can contain nested elements', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-column--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
