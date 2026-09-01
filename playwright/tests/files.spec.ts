import { test, expect } from '@playwright/test';

const storyUrl = (story: string) => `/iframe.html?path=/story/${story}`;

test.describe('Files - PDFViewer', () => {
  test('renders toolbar with page navigation', async ({ page }) => {
    await page.goto(storyUrl('files-pdfviewer--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-pdf-viewer__toolbar')).toBeVisible();
    await expect(page.locator('.wx-adv-pdf-viewer__page-info')).toBeVisible();
  });

  test('no toolbar when disabled', async ({ page }) => {
    await page.goto(storyUrl('files-pdfviewer--no-toolbar'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const toolbar = page.locator('.wx-adv-pdf-viewer__toolbar');
    expect(await toolbar.count()).toBe(0);
  });
});
