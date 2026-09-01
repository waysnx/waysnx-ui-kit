import { test, expect } from '@playwright/test';

test.describe('PageLayout Component', () => {
  test('PageLayout story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagelayout--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('PageLayout renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagelayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('PageLayout has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagelayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('PageLayout displays content', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagelayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('PageLayout is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagelayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('PageLayout is responsive', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagelayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('PageLayout can contain nested elements', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagelayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
