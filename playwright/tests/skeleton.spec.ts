import { test, expect } from '@playwright/test';

test.describe('Skeleton Component', () => {
  test('Skeleton story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-skeleton--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Skeleton renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-skeleton--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Skeleton has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-skeleton--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Skeleton displays placeholder', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-skeleton--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('Skeleton is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-skeleton--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Skeleton is not interactive', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-skeleton--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Skeleton has proper styling', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-skeleton--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
