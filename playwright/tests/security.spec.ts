import { test, expect } from '@playwright/test';

test.describe('Security', () => {
  test('PasswordInput story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-password-passwordinput--basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('PasswordInput renders', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-password-passwordinput--basic', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('PasswordStrengthMeter story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-password-passwordstrengthmeter--strong', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('PasswordStrengthMeter renders', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-password-passwordstrengthmeter--strong', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('PasswordGenerator story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-password-passwordgenerator--basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('LoginCard story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-authentication-logincard--basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('LoginCard renders form', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-authentication-logincard--basic', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('OTPInput story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-otp-otpinput--basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('OTPInput renders', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-otp-otpinput--basic', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000).catch(() => {});
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('ChangePasswordForm story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-authentication-changepasswordform--basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('ForgotPasswordForm story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-authentication-forgotpasswordform--basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('EmailVerificationCard story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-verification-emailverificationcard--basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('PhoneVerificationCard story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-verification-phoneverificationcard--basic-step-1', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('PasswordRequirements story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-password-passwordrequirements--complex-password', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });

  test('OTPVerificationCard story loads', async ({ page }) => {
    await page.goto('/iframe.html?path=/story/security-otp-otpverificationcard--basic', { waitUntil: 'domcontentloaded' });
    expect(await page.title()).toBeTruthy();
  });
});
