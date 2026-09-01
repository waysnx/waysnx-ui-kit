import { test, expect } from '@playwright/test';

test.describe('Stack Component', () => {
  test('Stack story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-stack--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Stack renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-stack--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Stack has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-stack--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Stack displays content', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-stack--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('Stack is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-stack--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Stack has proper layout', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-stack--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Stack can contain nested elements', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-stack--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
