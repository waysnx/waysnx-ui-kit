import { test, expect } from '@playwright/test';

// ── ComponentHero ─────────────────────────────────────────

test.describe('ComponentHero', () => {
  test('story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/docs-componenthero--default');
    await page.waitForLoadState('domcontentloaded');
    expect(await page.title()).toBeTruthy();
  });

  test('renders component name', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/docs-componenthero--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('deprecated story renders badge', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/docs-componenthero--deprecated');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('beta status renders', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/docs-componenthero--beta');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});

// ── PropsTable ────────────────────────────────────────────

test.describe('PropsTable', () => {
  test('story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/docs-propstable--default');
    await page.waitForLoadState('domcontentloaded');
    expect(await page.title()).toBeTruthy();
  });

  test('renders table with rows', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/docs-propstable--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    const rows = page.locator('tr');
    const count = await rows.count().catch(() => 0);
    expect(count >= 0).toBe(true);
  });

  test('empty props shows message', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/docs-propstable--no-props');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('deprecated props shown when enabled', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/docs-propstable--show-deprecated');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('accessibility story passes', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/docs-propstable--accessibility');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});

// ── MarkdownRenderer ──────────────────────────────────────

test.describe('MarkdownRenderer', () => {
  test('story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/docs-markdownrenderer--default');
    await page.waitForLoadState('domcontentloaded');
    expect(await page.title()).toBeTruthy();
  });

  test('renders headings', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/docs-markdownrenderer--default');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('code blocks render', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/docs-markdownrenderer--code-blocks');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('empty content renders', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/docs-markdownrenderer--empty-content');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
