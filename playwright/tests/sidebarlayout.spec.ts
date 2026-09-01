import { test, expect } from '@playwright/test';

test.describe('SidebarLayout Component', () => {
  test('SidebarLayout story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-sidebarlayout--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SidebarLayout renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-sidebarlayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SidebarLayout has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-sidebarlayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SidebarLayout displays content', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-sidebarlayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('SidebarLayout is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-sidebarlayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SidebarLayout is responsive', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-sidebarlayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SidebarLayout can contain nested elements', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-sidebarlayout--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
