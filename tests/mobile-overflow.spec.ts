import { expect, test } from "@playwright/test";

const phoneViewports = [
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPhone 15", width: 393, height: 852 },
  { name: "large phone", width: 430, height: 932 },
];

test.describe("mobile layout", () => {
  for (const viewport of phoneViewports) {
    test(`does not horizontally overflow on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      await page.goto("/");
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
});
