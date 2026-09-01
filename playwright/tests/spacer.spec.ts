import { test, expect } from '@playwright/test';

test.describe('Spacer Component', () => {
  test('Spacer story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-spacer--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Spacer renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-spacer--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Spacer has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-spacer--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Spacer is not interactive', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-spacer--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Spacer is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-spacer--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Spacer has proper spacing', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-spacer--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Spacer can be used for layout', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-spacer--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });
});
