import { test, expect } from '@playwright/test';

const storyUrl = (story: string) => `/iframe.html?path=/story/${story}`;

test.describe('Maps - AddressSelector', () => {
  test('renders search input', async ({ page }) => {
    await page.goto(storyUrl('maps-addressselector--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const input = page.locator('input[aria-label="Address search"]');
    await expect(input).toBeVisible();
  });

  test('shows current location button', async ({ page }) => {
    await page.goto(storyUrl('maps-addressselector--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-address-selector__current-location')).toBeVisible();
  });

  test('shows selected address', async ({ page }) => {
    await page.goto(storyUrl('maps-addressselector--with-selected'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-adv-address-selector__selected')).toBeVisible();
  });
});
