import { expect, test } from "@playwright/test";

const phoneViewports = [
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPhone 15", width: 393, height: 852 },
  { name: "large phone", width: 430, height: 932 },
];

const routes = [
  { name: "home page", path: "/" },
  { name: "Next.js comparison page", path: "/vs-nextjs" },
];

test.describe("mobile layout", () => {
  for (const route of routes) {
    for (const viewport of phoneViewports) {
      test(`${route.name} does not horizontally overflow on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });

        await page.goto(route.path);
        await page.waitForLoadState("networkidle");

        const overflow = await page.evaluate(() => {
          const viewportWidth = document.documentElement.clientWidth;
          const scrollWidth = document.documentElement.scrollWidth;
          const overflowing = [...document.body.querySelectorAll("*")]
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                className: element.className?.toString() ?? "",
                tagName: element.tagName.toLowerCase(),
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
              };
            })
            .filter(
              (rect) => rect.width > 0 && (rect.left < -1 || rect.right > viewportWidth + 1)
            )
            .sort((a, b) => b.right - a.right);

          return {
            viewportWidth,
            scrollWidth,
            extraWidth: scrollWidth - viewportWidth,
            overflowing: overflowing.slice(0, 5),
          };
        });

        expect(overflow.extraWidth, JSON.stringify(overflow, null, 2)).toBe(0);
      });
    }
  }
});

test.describe("home page IA", () => {
  test("surfaces the stack structure and official starter guides", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#stakes")).toHaveCount(0);
    await expect(
      page.getByText("Four phases, five open-source projects", { exact: false })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "TanStack Router guide" })).toHaveAttribute(
      "href",
      "https://reactonrails.com/docs/building-features/tanstack-router"
    );
    await expect(page.getByRole("link", { name: "TanStack Query guide" })).toHaveAttribute(
      "href",
      "https://reactonrails.com/docs/building-features/tanstack-query"
    );
    await expect(page.getByRole("link", { name: "vs Next.js" }).first()).toHaveAttribute(
      "href",
      "/vs-nextjs"
    );
  });

  test("keeps core content visible without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "Modern React on Rails is harder than it should be.",
      })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Build → test → prove → deploy." })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Live demos & starters, with source." })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Start from a working app, not a slide deck." })
    ).toBeVisible();

    await context.close();
  });

  test("supports keyboard-operated example filters", async ({ page }) => {
    await page.goto("/");

    const filter = page.getByRole("button", { name: /^E2E on Rails/ });
    const galleryIsland = filter.locator("xpath=ancestor::astro-island");

    await filter.scrollIntoViewIfNeeded();
    await expect(galleryIsland).not.toHaveAttribute("ssr", "");
    await filter.focus();
    await page.keyboard.press("Enter");

    await expect(filter).toHaveClass(/active/);
    await expect(
      page.getByText("More E2E on Rails demos are on the way.", { exact: false })
    ).toBeVisible();
  });
});
