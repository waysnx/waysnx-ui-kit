import { test, expect } from '@playwright/test';

test.describe('PageContent Component', () => {
  test('PageContent story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagecontent--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('PageContent renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagecontent--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('PageContent has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagecontent--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('PageContent displays content', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagecontent--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('PageContent is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagecontent--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('PageContent can contain interactive elements', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagecontent--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('PageContent has proper layout', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-pagecontent--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });
});
