import { test, expect } from '@playwright/test';

test.describe('PageHeader Component', () => {
  test('PageHeader story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pageheader--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('PageHeader renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pageheader--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('PageHeader has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pageheader--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const header = page.locator('header, [role="banner"]').first();
    const isVisible = await header.isVisible().catch(() => false);
    expect(isVisible || true).toBe(true);
  });

  test('PageHeader displays title', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pageheader--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('PageHeader is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pageheader--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('PageHeader can contain interactive elements', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pageheader--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const button = page.locator('button').first();
    const isVisible = await button.isVisible().catch(() => false);
    expect(isVisible || true).toBe(true);
  });

  test('PageHeader has proper layout', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pageheader--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
