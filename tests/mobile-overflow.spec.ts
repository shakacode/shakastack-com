import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

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

test.describe("mobile navigation", () => {
  test("is closed by default and supports keyboard open and close", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const menuButton = page.locator(".nav-toggle");
    const menu = page.getByLabel("Mobile navigation");

    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeHidden();

    await menuButton.focus();
    await page.keyboard.press("Enter");

    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("button", { name: "Close navigation menu" })).toBeVisible();
    await expect(menu).toBeVisible();
    await expect(page.evaluate(() => document.documentElement.scrollWidth)).resolves.toBe(375);
    await expect(menu.getByRole("link", { name: "vs Next.js" })).toHaveAttribute(
      "href",
      "/vs-nextjs"
    );

    await page.keyboard.press("Escape");

    await expect(menu).toBeHidden();
    await expect(menuButton).toBeFocused();
  });

  test("preserves desktop navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/");

    await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeHidden();
    await expect(page.locator(".nav-links").getByRole("link", { name: "Why" })).toBeVisible();
    await expect(page.locator(".nav-cta").getByRole("link", { name: "Starter code" })).toHaveAttribute(
      "href",
      "https://github.com/shakacode/react-on-rails-starter-tanstack"
    );
  });

  test("moves focus to visible navigation when resizing to desktop", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.getByLabel("Mobile navigation").getByRole("link", { name: "Why" }).focus();
    await page.setViewportSize({ width: 1200, height: 800 });

    await expect(page.getByRole("link", { name: "ShakaStack home" }).first()).toBeFocused();
    await expect(page.getByLabel("Mobile navigation")).toBeHidden();
  });

  test("returns focus to the toggle after keyboard link activation", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Open navigation menu" });
    await menuButton.click();
    await page.getByLabel("Mobile navigation").getByRole("link", { name: "Why" }).focus();
    await page.keyboard.press("Enter");

    await expect(page.getByLabel("Mobile navigation")).toBeHidden();
    await expect(menuButton).toBeFocused();
  });

  test("closes the menu and retains brand focus after brand activation", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const brand = page.getByRole("link", { name: "ShakaStack home" }).first();
    await brand.focus();
    await page.keyboard.press("Enter");

    await expect(page.getByLabel("Mobile navigation")).toBeHidden();
    await expect(brand).toBeFocused();
  });

  test("does not force brand focus when the menu is already closed", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/");
    await expect(page.locator("nav.nav")).toHaveClass(/nav-hydrated/);

    const brand = page.getByRole("link", { name: "ShakaStack home" }).first();
    await brand.evaluate((element) => {
      element.addEventListener("click", (event) => event.preventDefault(), { once: true });
      (element as HTMLElement).click();
    });
    await page.evaluate(() => new Promise(requestAnimationFrame));

    await expect(brand).not.toBeFocused();
  });

  test("leaves the menu open when Escape is pressed outside navigation", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const galleryFilter = page.getByRole("button", { name: /^React on Rails/ });
    await galleryFilter.focus();
    await page.keyboard.press("Escape");

    await expect(page.getByLabel("Mobile navigation")).toBeVisible();
    await expect(galleryFilter).toBeFocused();
  });

  test("keeps the expanded menu usable on narrow phones", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation menu" }).click();

    const menu = page.getByLabel("Mobile navigation");
    const starterLink = menu.getByRole("link", { name: "Starter code" });
    await starterLink.scrollIntoViewIfNeeded();
    await expect(starterLink).toBeVisible();
    await expect(page.evaluate(() => document.documentElement.scrollWidth)).resolves.toBe(320);
  });

  test("scrolls the expanded menu in a short landscape viewport", async ({ page }) => {
    await page.setViewportSize({ width: 568, height: 320 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation menu" }).click();

    const menu = page.getByLabel("Mobile navigation");
    await expect(menu).toHaveCSS("overflow-y", "auto");
    await expect(menu.evaluate((element) => element.scrollHeight > element.clientHeight)).resolves.toBe(true);
    const starterLink = menu.getByRole("link", { name: "Starter code" });
    await starterLink.scrollIntoViewIfNeeded();
    await expect(starterLink).toBeVisible();
    await expect(page.evaluate(() => document.documentElement.scrollWidth)).resolves.toBe(568);
  });
});

test.describe("home page IA", () => {
  test("leads with the starter and removes the licensing taxonomy", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Give coding agents a public Rails 8/
    );
    const hero = page.locator("#top");
    await expect(
      hero.getByRole("heading", {
        name: "Build ambitious Rails + React apps with AI. Prove every improvement.",
      })
    ).toBeVisible();
    await expect(hero.getByRole("link", { name: "Clone the starter" })).toHaveAttribute(
      "href",
      "https://github.com/shakacode/react-on-rails-starter-tanstack"
    );
    await expect(hero.getByRole("link", { name: "View the live demo" })).toHaveAttribute(
      "href",
      "https://starter.reactonrails.com"
    );

    const starter = page.locator("#starter");
    await expect(starter.getByRole("heading", { name: "Clone the Rails + React starter." })).toBeVisible();
    await expect(starter.getByRole("link", { name: "Clone the starter" })).toHaveAttribute(
      "href",
      "https://github.com/shakacode/react-on-rails-starter-tanstack"
    );
    await expect(starter.getByRole("link", { name: "View the live demo" })).toHaveAttribute(
      "href",
      "https://starter.reactonrails.com"
    );
    await expect(starter.getByRole("link", { name: "shadcn/ui" })).toHaveAttribute(
      "href",
      "https://ui.shadcn.com/"
    );
    await expect(starter).toContainText(
      "buttons, dialogs, inputs, tables, tabs, and toasts styled with Tailwind CSS"
    );

    const sectionIds = await page
      .locator("main > section[id], main > header[id]")
      .evaluateAll((elements) => elements.map((element) => element.id));
    expect(sectionIds.indexOf("starter")).toBeLessThan(sectionIds.indexOf("stack"));

    for (const removedCopy of [
      "ShakaPerf repository source and exact package records",
      "Community path",
      "Commercial path",
      "Newer proof layer",
      "Project maturity snapshot",
      "ShakaPerf by artifact",
      "0 GitHub stars",
      "Try the starter",
      "Pick the project you need",
    ]) {
      await expect(page.locator("body")).not.toContainText(removedCopy);
    }
  });

  test("documents the legacy tutorial capture as historical", async () => {
    const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");

    expect(readme).toContain("four linked live demos plus one historical legacy capture");
    expect(readme).toContain(
      "The legacy capture remains as a historical local asset; the current gallery retains the stable source link while suppressing the unavailable live endpoint."
    );
    expect(readme).not.toContain("five linked live demos");
    expect(readme.toLowerCase()).not.toContain(["react", "rails.com"].join(""));
  });

  test("surfaces the project plan and official starter guides", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#stakes")).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: "Give your agents a proven Rails + React toolkit." })
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

  test("uses React on Rails 17.0.0 and gem-download evidence", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("body")).not.toContainText("16.6.0");
    await expect(page.getByText("12.5M+")).toBeVisible();
    await expect(page.getByText("React on Rails gem downloads")).toBeVisible();
    await expect(page.getByText("11.4M+")).toBeVisible();
    await expect(page.getByText("Shakapacker gem downloads")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "RubyGems" }).first()
    ).toHaveAttribute("href", "https://rubygems.org/gems/react_on_rails");
    await expect(
      page.getByRole("link", { name: "RubyGems" }).last()
    ).toHaveAttribute("href", "https://rubygems.org/gems/shakapacker");

    const reactOnRailsTab = page.getByRole("tab", { name: /React on Rails/ });
    await reactOnRailsTab.scrollIntoViewIfNeeded();
    await reactOnRailsTab.click();
    await expect(page.getByRole("tabpanel")).toContainText("React on Rails 17.0.0");
    await expect(page.getByRole("tabpanel")).toContainText(
      "supported GA React Server Components"
    );
    await expect(page.getByRole("tabpanel").getByRole("link", { name: "v17.0.0" })).toHaveAttribute(
      "href",
      "https://github.com/shakacode/react_on_rails/releases/tag/v17.0.0"
    );
  });

  test("keeps ShakaPerf honest and sends product links to ShakaPerf.com", async ({ page }) => {
    await page.goto("/");
    const shakaPerfTab = page.getByRole("tab", { name: /ShakaPerf/ });
    const stackExplorer = shakaPerfTab.locator("xpath=ancestor::astro-island");

    await shakaPerfTab.scrollIntoViewIfNeeded();
    await expect(stackExplorer).not.toHaveAttribute("ssr", "");
    await shakaPerfTab.click();

    const panel = page.getByRole("tabpanel");
    await expect(panel.getByText("yarn shaka-perf compare", { exact: true })).toBeVisible();
    await expect(panel).not.toContainText("GitHub stars");
    await expect(
      panel.getByRole("link", { name: "Source available" })
    ).toHaveAttribute(
      "href",
      "https://shakaperf.com/license"
    );
    await expect(
      panel.getByRole("link", { name: "Visit shakaperf.com" })
    ).toHaveAttribute("href", "https://shakaperf.com");
    await expect(panel.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "href",
      "https://shakaperf.com/docs/"
    );
    await expect(panel.getByRole("link", { name: "Methodology" })).toHaveAttribute(
      "href",
      "https://shakaperf.com/docs/"
    );
    await expect(page.getByRole("button", { name: /^ShakaPerf/ })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "ShakaPerf audit report" })).toHaveCount(0);
  });

  test("keeps the legacy tutorial source without claiming a live demo", async ({ page }) => {
    await page.goto("/");

    const legacyCard = page.getByRole("article").filter({
      has: page.getByRole("heading", { name: "Legacy Tutorial App" }),
    });

    await expect(legacyCard.getByRole("link")).toHaveCount(1);
    await expect(legacyCard.getByText("Demo unavailable", { exact: true })).toBeVisible();
    await expect(legacyCard.getByRole("link", { name: "Live demo" })).toHaveCount(0);
    await expect(legacyCard.getByRole("link", { name: "Source" })).toHaveAttribute(
      "href",
      "https://github.com/shakacode/react-webpack-rails-tutorial"
    );
  });

  test("reserves unavailable copy for real thumbnail load failures", async ({ page }) => {
    await page.route("**/examples/marketplace.webp", (route) => route.abort());
    await page.goto("/");

    const demoCard = page.getByRole("article").filter({
      has: page.getByRole("heading", { name: "Marketplace" }),
    });
    await demoCard.scrollIntoViewIfNeeded();

    const failedPreview = demoCard.getByRole("img", {
      name: "Marketplace preview unavailable",
    });
    await expect(failedPreview).toBeVisible();
    await expect(failedPreview.getByText("Live demo", { exact: true })).toBeVisible();
    await expect(
      failedPreview.getByText("Preview temporarily unavailable", { exact: true })
    ).toBeVisible();
    await expect(failedPreview).not.toContainText("Pinned public proof");
  });

  test("shows the unavailable fallback for the legacy demo without a thumbnail", async ({ page }) => {
    await page.addInitScript(() => {
      const removeLegacyDemoThumbnail = (node: Node) => {
        if (!(node instanceof Element)) return;

        const islands = node.matches("astro-island")
          ? [node]
          : [...node.querySelectorAll("astro-island")];

        for (const island of islands) {
          if (!island.getAttribute("component-url")?.includes("GalleryGrid")) continue;

          const rawProps = island.getAttribute("props");
          if (!rawProps) continue;

          const props = JSON.parse(rawProps);
          type SerializedExample = [
            number,
            { name?: [number, string]; thumbnail?: unknown },
          ];
          const serializedExamples = props.examples?.[1];
          const legacyDemo = serializedExamples?.find(
            (entry: SerializedExample) => entry?.[1]?.name?.[1] === "Legacy Tutorial App"
          )?.[1];
          if (!legacyDemo?.thumbnail) continue;

          delete legacyDemo.thumbnail;
          island.setAttribute("props", JSON.stringify(props));
          island.setAttribute("data-legacy-thumbnail-removed", "true");
        }
      };

      new MutationObserver((records) => {
        for (const record of records) {
          for (const node of record.addedNodes) removeLegacyDemoThumbnail(node);
        }
      }).observe(document, { childList: true, subtree: true });
    });
    await page.goto("/");

    const legacyCard = page.getByRole("article").filter({
      has: page.getByRole("heading", { name: "Legacy Tutorial App" }),
    });
    const galleryIsland = legacyCard.locator("xpath=ancestor::astro-island");
    await legacyCard.scrollIntoViewIfNeeded();
    await expect(galleryIsland).toHaveAttribute("data-legacy-thumbnail-removed", "true");
    await expect(galleryIsland).not.toHaveAttribute("ssr", "");

    const missingPreview = legacyCard.getByRole("img", {
      name: "Legacy Tutorial App preview unavailable",
    });
    await expect(missingPreview).toBeVisible();
    await expect(missingPreview.getByText("Demo unavailable", { exact: true })).toBeVisible();
    await expect(missingPreview.getByText("Live demo", { exact: true })).toHaveCount(0);
    await expect(
      missingPreview.getByText("Preview temporarily unavailable", { exact: true })
    ).toBeVisible();
    await expect(missingPreview).not.toContainText("Pinned public proof");
  });

  test("keeps core content visible without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 320, height: 568 },
    });
    const page = await context.newPage();

    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "AI can write the code. How do you know it made the app better?",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Give your agents a proven Rails + React toolkit." })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "See what the projects can build." })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Clone the Rails + React starter." })
    ).toBeVisible();
    await expect(page.locator(".nav-cta").getByRole("link", { name: "GitHub" })).toBeVisible();
    await expect(
      page.locator(".nav-cta").getByRole("link", { name: "Starter code" })
    ).toBeVisible();
    await expect(page.locator(".nav-toggle")).toBeHidden();
    await expect(page.locator(".mobile-navigation")).toBeHidden();
    await expect(page.evaluate(() => document.documentElement.scrollWidth)).resolves.toBe(320);

    await context.close();
  });

  test("keeps the fallback navigation within its mobile breakpoint", async ({ browser }) => {
    for (const width of [361, 600, 601]) {
      const context = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width, height: 667 },
      });
      const page = await context.newPage();

      await page.goto("/");

      await expect(page.locator(".nav-cta").getByRole("link", { name: "GitHub" })).toBeVisible();
      await expect(
        page.locator(".nav-cta").getByRole("link", { name: "Starter code" })
      ).toBeVisible();
      await expect(page.evaluate(() => document.documentElement.scrollWidth)).resolves.toBe(width);

      await context.close();
    }
  });

  test("supports keyboard-operated example filters", async ({ page }) => {
    await page.goto("/");

    const allFilter = page.getByRole("button", { name: /^All/ });
    const filter = page.getByRole("button", { name: /^Shakapacker/ });
    const galleryIsland = filter.locator("xpath=ancestor::astro-island");

    await filter.scrollIntoViewIfNeeded();
    await expect(galleryIsland).not.toHaveAttribute("ssr", "");
    await expect(allFilter).toHaveAttribute("aria-pressed", "true");
    await expect(filter).toHaveAttribute("aria-pressed", "false");
    await filter.focus();
    await page.keyboard.press("Enter");

    await expect(filter).toHaveClass(/active/);
    await expect(allFilter).toHaveAttribute("aria-pressed", "false");
    await expect(filter).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".cards .card")).toHaveCount(2);
  });
});
