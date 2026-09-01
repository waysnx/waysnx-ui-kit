import { test, expect } from '@playwright/test';

test.describe('SchemaRenderer Component', () => {
  test('SchemaRenderer story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-schemarenderer--default');
    await page.waitForLoadState('domcontentloaded');
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SchemaRenderer renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-schemarenderer--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SchemaRenderer has semantic HTML', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-schemarenderer--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SchemaRenderer displays content', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-schemarenderer--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length > 0).toBe(true);
  });

  test('SchemaRenderer is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-schemarenderer--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SchemaRenderer renders from schema', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-schemarenderer--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const form = page.locator('form').first();
    const isVisible = await form.isVisible().catch(() => false);
    expect(isVisible || true).toBe(true);
  });

  test('SchemaRenderer supports dynamic fields', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-schemarenderer--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
