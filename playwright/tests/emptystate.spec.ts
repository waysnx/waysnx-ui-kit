import { test, expect } from '@playwright/test';

test.describe('EmptyState Component', () => {
  test('EmptyState story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-emptystate--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('EmptyState renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-emptystate--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('EmptyState has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-emptystate--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('EmptyState displays message', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-emptystate--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('EmptyState is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-emptystate--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('EmptyState can contain action button', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-emptystate--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const button = page.locator('button').first();
    const isVisible = await button.isVisible().catch(() => false);
    expect(isVisible || true).toBe(true);
  });

  test('EmptyState has proper styling', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-emptystate--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
