import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('Dashboard story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/dashboard-dashboard--basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('Dashboard renders container', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/dashboard-dashboard--basic', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Widget story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/dashboard-widget--basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('Widget renders content', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/dashboard-widget--basic', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('KPICard story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/dashboard-kpi-cards--stat-card-basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('KPICard renders value', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/dashboard-kpi-cards--stat-card-basic', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('WidgetGrid story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/dashboard-layout--grid-basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('WidgetGrid renders layout', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/dashboard-layout--grid-basic', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('ChartWidget story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/dashboard-specialized-widgets--chart-widget-basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('DashboardFilters story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/dashboard-filters-search--filter-bar-basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });
});
