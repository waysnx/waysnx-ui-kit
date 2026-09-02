import { test, expect } from '@playwright/test';

/**
 * P0 remediation regression suite (Batches 1-4).
 *
 * These tests assert observable release contracts — not implementation details
 * and not merely that the Storybook iframe loaded. Each navigates to a specific
 * story and makes meaningful, auto-waiting assertions.
 */

const storyUrl = (id: string) => `/iframe.html?path=/story/${id}`;

// Storybook renders story content inside #storybook-root within the iframe.
const ROOT = '#storybook-root';

test.describe('P0 — Markdown sanitization (ui-data)', () => {
  test('MarkdownViewer strips <script> and event handlers but keeps safe content', async ({ page }) => {
    const flags: boolean[] = [];
    page.on('dialog', (d) => d.dismiss());
    await page.goto(storyUrl('data-markdownviewer--malicious-html'));
    await page.waitForLoadState('networkidle');

    const root = page.locator(ROOT);
    // Safe content survives sanitization.
    await expect(root).toContainText('Safe Heading');
    await expect(root).toContainText('Trailing');

    // The injected script must not have executed.
    const executed = await page.evaluate(() => (window as any).__xss_markdown_viewer === true);
    expect(executed).toBe(false);

    // No <script> element and no onerror attribute survived into the DOM.
    expect(await root.locator('script').count()).toBe(0);
    const onerrorCount = await page.evaluate(
      (sel) => document.querySelectorAll(`${sel} [onerror]`).length,
      ROOT
    );
    expect(onerrorCount).toBe(0);
  });

  test('MarkdownEditor preview sanitizes malicious markdown', async ({ page }) => {
    await page.goto(storyUrl('data-markdowneditor--malicious-html'));
    await page.waitForLoadState('networkidle');

    const executed = await page.evaluate(() => (window as any).__xss_markdown_editor === true);
    expect(executed).toBe(false);

    const preview = page.locator('.wx-adv-markdown-editor__preview');
    await expect(preview).toBeVisible();
    expect(await preview.locator('script').count()).toBe(0);
    const onerrorCount = await page.evaluate(
      () => document.querySelectorAll('.wx-adv-markdown-editor__preview [onerror]').length
    );
    expect(onerrorCount).toBe(0);
  });
});

test.describe('P0 — HtmlContent external-link safety (ui-core)', () => {
  test('target=_blank link gets noopener+noreferrer and preserves existing rel', async ({ page }) => {
    await page.goto(storyUrl('components-htmlcontent--blank-link-rel-preserved'));
    await page.waitForLoadState('networkidle');

    // id is not in HtmlContent's DOMPurify allow-list, so locate the anchor by
    // its target attribute (the security-relevant surface under test).
    const link = page.locator('a[target="_blank"]');
    await expect(link).toBeVisible();

    const rel = (await link.getAttribute('rel')) || '';
    const tokens = rel.split(/\s+/).filter(Boolean);
    expect(tokens).toContain('noopener');
    expect(tokens).toContain('noreferrer');
    // Legitimate pre-existing token is preserved, not overwritten.
    expect(tokens).toContain('author');
    // target is intact.
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('malicious HtmlContent is sanitized', async ({ page }) => {
    await page.goto(storyUrl('components-htmlcontent--malicious-html'));
    await page.waitForLoadState('networkidle');

    await expect(page.locator(ROOT).getByText('Safe content')).toBeVisible();

    const executed = await page.evaluate(() => (window as any).__xss_htmlcontent === true);
    expect(executed).toBe(false);
    expect(await page.locator(`${ROOT} script`).count()).toBe(0);
    const onerrorCount = await page.evaluate(
      (sel) => document.querySelectorAll(`${sel} [onerror]`).length,
      ROOT
    );
    expect(onerrorCount).toBe(0);
  });
});

test.describe('P0 — IFrame secure-by-default sandbox (ui-core)', () => {
  test('default IFrame renders with a restrictive sandbox that omits allow-same-origin', async ({ page }) => {
    await page.goto(storyUrl('components-iframe--default'));
    await page.waitForLoadState('networkidle');

    const frame = page.locator('iframe.wx-iframe');
    await expect(frame).toHaveCount(1);

    const sandbox = await frame.getAttribute('sandbox');
    expect(sandbox).not.toBeNull();
    const tokens = (sandbox || '').split(/\s+/).filter(Boolean);
    expect(tokens).toContain('allow-scripts');
    // Critical: default must NOT combine allow-scripts with allow-same-origin
    // (that combination lets framed content escape the sandbox).
    expect(tokens).not.toContain('allow-same-origin');
  });

  test('explicit sandbox override is honored', async ({ page }) => {
    await page.goto(storyUrl('components-iframe--custom-sandbox'));
    await page.waitForLoadState('networkidle');

    const frame = page.locator('iframe.wx-iframe');
    await expect(frame).toHaveAttribute('sandbox', 'allow-scripts');
  });
});

test.describe('P0 — Real QR generation (ui-media)', () => {
  test('QRCode canvas contains a genuine, non-trivial module matrix', async ({ page }) => {
    await page.goto(storyUrl('media-qrcode--default'));
    await page.waitForLoadState('networkidle');

    const canvas = page.locator('canvas[aria-label]');
    await expect(canvas).toBeVisible();

    // Inspect the actual pixels: a real QR has many dark modules spread across
    // the matrix (roughly 30-70% coverage), not a blank or near-empty canvas.
    const darkRatio = await canvas.evaluate((el: HTMLCanvasElement) => {
      const ctx = el.getContext('2d');
      if (!ctx) return -1;
      const { width, height } = el;
      const data = ctx.getImageData(0, 0, width, height).data;
      let dark = 0;
      let total = 0;
      for (let i = 0; i < data.length; i += 4) {
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        if (lum < 128) dark++;
        total++;
      }
      return dark / total;
    });

    expect(darkRatio).toBeGreaterThan(0.1);
    expect(darkRatio).toBeLessThan(0.7);
  });
});

test.describe('P0 — PDFViewer is an honest shell (ui-files)', () => {
  test('does not claim a fake page count and states it is a shell', async ({ page }) => {
    await page.goto(storyUrl('files-pdfviewer--default'));
    await page.waitForLoadState('networkidle');

    const root = page.locator(ROOT);
    // The previous placeholder advertised a hard-coded "24" page total.
    await expect(root).not.toContainText('/ 24');
    await expect(root).not.toContainText('of 24');
    // Shell messaging is present instead of pretend rendering.
    await expect(root).toContainText('not rendered');
  });
});

test.describe('P0 — OCRScanner does not fabricate results (ui-media)', () => {
  test('shows the dropzone and no fabricated extracted text on load', async ({ page }) => {
    await page.goto(storyUrl('media-ocrscanner--default'));
    await page.waitForLoadState('networkidle');

    await expect(page.locator('.wx-adv-ocr__dropzone')).toBeVisible();
    // No result panel with fabricated OCR output is shown before any real
    // integration produces text.
    expect(await page.locator('.wx-adv-ocr__result').count()).toBe(0);
  });
});

test.describe('P0 — Cropper documents its onCrop contract (ui-media)', () => {
  test('crop UI renders and reports the source-image limitation', async ({ page }) => {
    await page.goto(storyUrl('media-cropper--default'));
    await page.waitForLoadState('networkidle');

    // Crop action is available.
    await expect(page.locator('.wx-adv-cropper__crop-btn')).toBeVisible();
    // The UI states the documented 1.0.0 limitation (returns source, not pixels).
    await expect(page.locator(ROOT)).toContainText('not cropped pixels');
  });
});

test.describe('P0 — ui-maps is adapter-based (ui-maps)', () => {
  test('MapView shows the adapter-required placeholder rather than a real map', async ({ page }) => {
    await page.goto(storyUrl('maps-mapview--default'));
    await page.waitForLoadState('networkidle');

    await expect(page.locator(ROOT)).toContainText(/MapsAdapter/i);
  });
});
