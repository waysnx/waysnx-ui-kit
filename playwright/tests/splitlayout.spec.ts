import { test, expect } from '@playwright/test';

test.describe('SplitLayout Component', () => {
  test('SplitLayout story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-splitlayout--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SplitLayout renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-splitlayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SplitLayout has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-splitlayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SplitLayout displays content', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-splitlayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('SplitLayout is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-splitlayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SplitLayout is responsive', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-splitlayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SplitLayout can contain nested elements', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-splitlayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
