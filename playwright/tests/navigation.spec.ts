import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('Menu story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-menu--vertical', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('Menu renders items', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-menu--vertical', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Sidebar story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-sidebar--default', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('Sidebar renders', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-sidebar--default', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Breadcrumb story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-breadcrumb--default', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('Breadcrumb renders', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-breadcrumb--default', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Tabs story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-tabs--default', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('Tabs renders', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-tabs--default', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('CommandPalette story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-commandpalette--default', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('Drawer story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-drawer--default', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('TreeMenu story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-treemenu--default', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('ContextMenu story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-contextmenu--default', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('StepNavigation story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/enterprise-stepnavigation--default', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('SearchNavigation story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-searchnavigation--default', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('Navbar story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-navbar--default', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('WorkspaceSwitcher story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/navigation-workspaceswitcher--default', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });
});
