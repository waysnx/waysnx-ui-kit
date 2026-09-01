import { test, expect } from '@playwright/test';

const storyUrl = (story: string) => `/iframe.html?path=/story/${story}`;

test.describe('Media - QRCode', () => {
  test('renders canvas element', async ({ page }) => {
    await page.goto(storyUrl('media-qrcode--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const canvas = page.locator('canvas[aria-label]');
    await expect(canvas).toBeVisible();
  });

  test('shows download button', async ({ page }) => {
    await page.goto(storyUrl('media-qrcode--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const btn = page.locator('.wx-adv-qr__download-btn');
    await expect(btn).toBeVisible();
    await expect(btn).toContainText('Download PNG');
  });

  test('no download button when showDownload false', async ({ page }) => {
    await page.goto(storyUrl('media-qrcode--no-download'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const btn = page.locator('.wx-adv-qr__download-btn');
    await expect(btn).not.toBeVisible();
  });
});

test.describe('Media - Barcode', () => {
  test('renders SVG element', async ({ page }) => {
    await page.goto(storyUrl('media-barcode--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const svg = page.locator('svg[aria-label]');
    await expect(svg).toBeVisible();
  });

  test('shows download SVG button', async ({ page }) => {
    await page.goto(storyUrl('media-barcode--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const btn = page.locator('.wx-adv-barcode__download-btn');
    await expect(btn).toBeVisible();
    await expect(btn).toContainText('Download SVG');
  });
});

test.describe('Media - SignaturePad', () => {
  test('renders canvas', async ({ page }) => {
    await page.goto(storyUrl('media-signaturepad--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const canvas = page.locator('.wx-adv-signature-pad__canvas');
    await expect(canvas).toBeVisible();
  });

  test('has clear and save buttons', async ({ page }) => {
    await page.goto(storyUrl('media-signaturepad--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.getByRole('button', { name: 'Clear' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save Signature' })).toBeVisible();
  });
});

test.describe('Media - SignatureViewer', () => {
  test('shows verified badge', async ({ page }) => {
    await page.goto(storyUrl('media-signatureviewer--verified'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-signature-viewer__badge')).toBeVisible();
    await expect(page.locator('.wx-adv-signature-viewer__badge')).toContainText('Verified');
  });

  test('shows signer name', async ({ page }) => {
    await page.goto(storyUrl('media-signatureviewer--verified'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.getByText('John Doe')).toBeVisible();
  });
});

test.describe('Media - ColorPicker', () => {
  test('renders spectrum and swatches', async ({ page }) => {
    await page.goto(storyUrl('media-colorpicker--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-color-picker__spectrum')).toBeVisible();
    const swatches = page.locator('.wx-adv-color-picker__swatch');
    expect(await swatches.count()).toBeGreaterThan(0);
  });

  test('shows hex input', async ({ page }) => {
    await page.goto(storyUrl('media-colorpicker--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const input = page.locator('.wx-adv-color-picker__hex-input');
    await expect(input).toBeVisible();
    const value = await input.inputValue();
    expect(value).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  test('no swatches when disabled', async ({ page }) => {
    await page.goto(storyUrl('media-colorpicker--no-swatches'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const swatches = page.locator('.wx-adv-color-picker__swatch');
    expect(await swatches.count()).toBe(0);
  });
});

test.describe('Media - VideoPlayer', () => {
  test('renders player container', async ({ page }) => {
    await page.goto(storyUrl('media-videoplayer--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-video-player')).toBeVisible();
  });

  test('shows title overlay', async ({ page }) => {
    await page.goto(storyUrl('media-videoplayer--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.getByText('Product Demo.mp4')).toBeVisible();
  });
});

test.describe('Media - AudioPlayer', () => {
  test('renders play button and info', async ({ page }) => {
    await page.goto(storyUrl('media-audioplayer--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-audio-player__play-btn')).toBeVisible();
    await expect(page.locator('.wx-adv-audio-player__title')).toBeVisible();
    await expect(page.getByText('Audio Track')).toBeVisible();
  });

  test('shows progress bar', async ({ page }) => {
    await page.goto(storyUrl('media-audioplayer--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-audio-player__progress')).toBeVisible();
  });
});

test.describe('Media - ImageViewer', () => {
  test('renders main image and thumbnails', async ({ page }) => {
    await page.goto(storyUrl('media-imageviewer--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-image-viewer__main')).toBeVisible();
    const thumbnails = page.locator('.wx-adv-image-viewer__thumbnail');
    expect(await thumbnails.count()).toBe(3);
  });

  test('shows navigation buttons', async ({ page }) => {
    await page.goto(storyUrl('media-imageviewer--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-image-viewer__nav-btn--next')).toBeVisible();
  });
});
