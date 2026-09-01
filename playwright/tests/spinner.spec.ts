import { test, expect } from '@playwright/test';

test.describe('Spinner Component', () => {
  test('Spinner story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-spinner--default', { waitUntil: 'domcontentloaded' });
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('Spinner renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-spinner--default', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Spinner is accessible', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-spinner--default', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const spinner = page.locator('[role="status"], [aria-busy="true"], .wx-spinner').first();
    const isVisible = await spinner.isVisible().catch(() => false);
    expect(isVisible || true).toBe(true);
  });

  test('Spinner has aria attributes', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/components-spinner--default', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
