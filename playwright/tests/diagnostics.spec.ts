import { test, expect } from '@playwright/test';

const DEFAULT_STORY =
  '/iframe.html?path=/story/diagnostics-diagnostics--default';
const HEALTHY_STORY =
  '/iframe.html?path=/story/diagnostics-diagnostics--healthy-child';

test.describe('Diagnostics', () => {
  test('Diagnostics story loads', async ({ page }) => {
    await page.goto(DEFAULT_STORY, { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('Provider renders its children (healthy path)', async ({ page }) => {
    await page.goto(HEALTHY_STORY, { waitUntil: 'domcontentloaded' });
    const child = page.getByTestId('child-ok');
    await expect(child).toBeVisible();
    await expect(child).toHaveText(/rendered successfully/i);
  });

  test('Demo renders inside the provider', async ({ page }) => {
    await page.goto(DEFAULT_STORY, { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('diagnostics-demo')).toBeVisible();
    await expect(page.getByTestId('child-ok')).toBeVisible();
  });

  test('Error boundary shows fallback UI when a child throws', async ({
    page,
  }) => {
    await page.goto(DEFAULT_STORY, { waitUntil: 'domcontentloaded' });

    await page.getByTestId('trigger-crash').click();

    const fallback = page.getByTestId('fallback');
    await expect(fallback).toBeVisible();
    await expect(fallback).toHaveAttribute('role', 'alert');
    await expect(page.getByTestId('fallback-message')).toContainText(
      'Simulated render failure',
    );
    // Child is no longer rendered once the boundary is in the error state.
    await expect(page.getByTestId('child-ok')).toHaveCount(0);
  });

  test('Render error is captured and reported', async ({ page }) => {
    await page.goto(DEFAULT_STORY, { waitUntil: 'domcontentloaded' });

    await page.getByTestId('trigger-crash').click();
    await expect(page.getByTestId('fallback')).toBeVisible();

    // The memory reporter surfaces captured events in the DOM.
    const count = page.getByTestId('captured-count');
    await expect(count).toHaveText(/[1-9]\d*/);

    const renderEvent = page.locator(
      '[data-testid="captured-item"][data-category="RENDER"]',
    );
    await expect(renderEvent.first()).toBeVisible();
  });

  test('Reset restores the child after an error', async ({ page }) => {
    await page.goto(DEFAULT_STORY, { waitUntil: 'domcontentloaded' });

    await page.getByTestId('trigger-crash').click();
    await expect(page.getByTestId('fallback')).toBeVisible();

    await page.getByTestId('reset').click();

    await expect(page.getByTestId('fallback')).toHaveCount(0);
    await expect(page.getByTestId('child-ok')).toBeVisible();
  });

  test('Manual capture records a component event', async ({ page }) => {
    await page.goto(DEFAULT_STORY, { waitUntil: 'domcontentloaded' });

    await page.getByTestId('manual-capture').click();
    // Refresh the visible list to reflect the reporter contents.
    await page.getByTestId('refresh').click();

    const componentEvent = page.locator(
      '[data-testid="captured-item"][data-category="COMPONENT"]',
    );
    await expect(componentEvent.first()).toBeVisible();
    await expect(componentEvent.first()).toContainText('Manual capture');
  });
});
