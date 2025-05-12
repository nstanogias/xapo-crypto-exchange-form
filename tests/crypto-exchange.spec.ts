import { test, expect } from "@playwright/test";

test.describe("Crypto Exchange", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should display the exchange interface", async ({ page }) => {
    await expect(page.getByText("BTC ⟷ USD Exchange")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Sell Bitcoin" })
    ).toBeVisible();
    await expect(page.getByText("Current Exchange Rate")).toBeVisible();
  });

  test("should allow entering BTC amount and calculate USD", async ({
    page,
  }) => {
    const btcInput = page.getByLabel("You Send", { exact: true });
    const usdInput = page.getByLabel("You Receive", { exact: true });

    await btcInput.fill("1");
    await expect(usdInput).toHaveValue("40,000.00");
  });

  test("should allow entering USD amount and calculate BTC", async ({
    page,
  }) => {
    const btcInput = page.getByLabel("You Send", { exact: true });
    const usdInput = page.getByLabel("You Receive", { exact: true });

    await usdInput.fill("40000");
    await expect(btcInput).toHaveValue(/^\d+\.\d{8}$/);
  });

  test("should swap values and currencies when clicking swap button", async ({
    page,
  }) => {
    const btcInput = page.getByLabel("You Send", { exact: true });
    const usdInput = page.getByLabel("You Receive", { exact: true });

    await btcInput.fill("1");
    const initialUsdValue = await usdInput.inputValue();

    await page.getByRole("button", { name: "Swap currencies" }).click();

    // After swap, the values should be swapped and the currencies should be swapped
    await expect(btcInput).toHaveValue(initialUsdValue);
    await expect(usdInput).toHaveValue("1");
  });

  test("should show success message after confirmation", async ({ page }) => {
    const btcInput = page.getByLabel("You Send", { exact: true });
    await btcInput.fill("1");

    await page.getByRole("button", { name: "Sell Bitcoin" }).click();

    // Wait for success message
    await expect(page.getByText("Swap successful!")).toBeVisible();
  });
});
