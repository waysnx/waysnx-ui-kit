import { test, expect } from '@playwright/test';

const storyUrl = (story: string) => `/iframe.html?path=/story/${story}`;

test.describe('Data - MarkdownEditor', () => {
  test('renders textarea and preview', async ({ page }) => {
    await page.goto(storyUrl('data-markdowneditor--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-markdown-editor__input')).toBeVisible();
    await expect(page.locator('.wx-adv-markdown-editor__preview')).toBeVisible();
  });

  test('shows toolbar buttons', async ({ page }) => {
    await page.goto(storyUrl('data-markdowneditor--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const toolbar = page.locator('.wx-adv-toolbar');
    await expect(toolbar).toBeVisible();
    const buttons = toolbar.locator('.wx-adv-toolbar__btn');
    expect(await buttons.count()).toBeGreaterThan(3);
  });

  test('shows word and line count', async ({ page }) => {
    await page.goto(storyUrl('data-markdowneditor--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-markdown-editor__footer')).toBeVisible();
    await expect(page.getByText(/Words:/)).toBeVisible();
  });

  test('no preview in editor only mode', async ({ page }) => {
    await page.goto(storyUrl('data-markdowneditor--editor-only'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const preview = page.locator('.wx-adv-markdown-editor__preview');
    expect(await preview.count()).toBe(0);
  });
});

test.describe('Data - JSONEditor', () => {
  test('renders textarea with line numbers', async ({ page }) => {
    await page.goto(storyUrl('data-jsoneditor--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-json-editor__textarea')).toBeVisible();
    await expect(page.locator('.wx-adv-json-editor__line-numbers')).toBeVisible();
  });

  test('shows status bar', async ({ page }) => {
    await page.goto(storyUrl('data-jsoneditor--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-json-editor__status')).toBeVisible();
    await expect(page.getByText('UTF-8')).toBeVisible();
  });

  test('readonly textarea is not editable', async ({ page }) => {
    await page.goto(storyUrl('data-jsoneditor--read-only'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const textarea = page.locator('.wx-adv-json-editor__textarea');
    await expect(textarea).toHaveAttribute('readonly');
  });
});

test.describe('Data - CodeViewer', () => {
  test('renders code with line numbers', async ({ page }) => {
    await page.goto(storyUrl('data-codeviewer--type-script'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-code-viewer__code')).toBeVisible();
    await expect(page.locator('.wx-adv-code-viewer__lines')).toBeVisible();
  });

  test('shows language in header', async ({ page }) => {
    await page.goto(storyUrl('data-codeviewer--type-script'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-code-viewer__header')).toBeVisible();
    await expect(page.getByText('typescript')).toBeVisible();
  });

  test('no line numbers when disabled', async ({ page }) => {
    await page.goto(storyUrl('data-codeviewer--no-line-numbers'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const lines = page.locator('.wx-adv-code-viewer__lines');
    expect(await lines.count()).toBe(0);
  });
});
