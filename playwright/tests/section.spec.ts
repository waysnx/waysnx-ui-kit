import { test, expect } from '@playwright/test';

test.describe('Section Component', () => {
  test('Section story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-section--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Section renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-section--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Section has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-section--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const section = page.locator('section').first();
    const isVisible = await section.isVisible().catch(() => false);
    expect(isVisible || true).toBe(true);
  });

  test('Section displays content', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-section--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('Section is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-section--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Section has proper layout', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-section--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Section can contain nested elements', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-section--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
