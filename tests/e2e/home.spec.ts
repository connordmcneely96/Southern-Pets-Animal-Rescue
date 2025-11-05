import { test, expect } from '@playwright/test';

test('homepage renders hero content', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /rescue, rehabilitate/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /view adoptable pets/i })).toBeVisible();
});
