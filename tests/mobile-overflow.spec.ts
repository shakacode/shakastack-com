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
    await expect(page.locator(".nav-cta").getByRole("link", { name: "Book a free call" })).toBeVisible();
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
    const galleryFilter = page.getByRole("button", { name: /^E2E on Rails/ });
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
    const bookLink = menu.getByRole("link", { name: "Book a free call" });
    await bookLink.scrollIntoViewIfNeeded();
    await expect(bookLink).toBeVisible();
    await expect(page.evaluate(() => document.documentElement.scrollWidth)).resolves.toBe(320);
  });

  test("scrolls the expanded menu in a short landscape viewport", async ({ page }) => {
    await page.setViewportSize({ width: 568, height: 320 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation menu" }).click();

    const menu = page.getByLabel("Mobile navigation");
    await expect(menu).toHaveCSS("overflow-y", "auto");
    await expect(menu.evaluate((element) => element.scrollHeight > element.clientHeight)).resolves.toBe(true);
    const bookLink = menu.getByRole("link", { name: "Book a free call" });
    await bookLink.scrollIntoViewIfNeeded();
    await expect(bookLink).toBeVisible();
    await expect(page.evaluate(() => document.documentElement.scrollWidth)).resolves.toBe(568);
  });
});

test.describe("home page IA", () => {
  test("surfaces the stack structure and official starter guides", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#stakes")).toHaveCount(0);
    await expect(
      page.getByText("Four phases, four open-source projects", { exact: false })
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

  test("shows the ShakaPerf command and artifact-specific license records", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /ShakaPerf repository source and exact package records/
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      "content",
      /ShakaPerf repository source and exact package records/
    );
    await expect(page.locator("body")).not.toContainText(/source-available ShakaPerf/i);

    const shakaPerfTab = page.getByRole("tab", { name: /ShakaPerf/ });
    const stackExplorer = shakaPerfTab.locator("xpath=ancestor::astro-island");

    await shakaPerfTab.scrollIntoViewIfNeeded();
    await expect(stackExplorer).not.toHaveAttribute("ssr", "");
    await shakaPerfTab.click();

    const panel = page.getByRole("tabpanel");
    await expect(panel.getByText("yarn shaka-perf compare", { exact: true })).toBeVisible();
    await expect(
      panel.getByRole("link", { name: "Repository source · ShakaPerf License" })
    ).toHaveAttribute(
      "href",
      "https://github.com/shakacode/shakaperf/blob/f054e87b5d2712b78ed5e352ee31c6b44ea7e712/LICENSE.md"
    );
    await expect(page.getByRole("heading", { name: "ShakaPerf by artifact" })).toBeVisible();
    await expect(
      page.getByText("The repository source uses the ShakaPerf License.", { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText(
        "npm registry JSON metadata for shaka-perf 0.1.3 and shaka-bundle-size 0.0.12 reports MIT.",
        { exact: false }
      )
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "shaka-perf 0.1.3 registry JSON" })).toHaveAttribute(
      "href",
      "https://registry.npmjs.org/shaka-perf/0.1.3"
    );
    await expect(
      page.getByRole("link", { name: "shaka-bundle-size 0.0.12 registry JSON" })
    ).toHaveAttribute(
      "href",
      "https://registry.npmjs.org/shaka-bundle-size/0.0.12"
    );
  });

  test("shows the statically curated maturity snapshot and primary records", async ({ page }) => {
    await page.goto("/");

    const snapshot = page.locator(".maturity-snapshot");
    await expect(snapshot.getByText("2026-07-15 UTC", { exact: true })).toBeVisible();

    const expectedProjects = [
      {
        id: "ror",
        name: "React on Rails",
        version: "v16.6.0 stable",
        release: "https://github.com/shakacode/react_on_rails/releases/tag/v16.6.0",
        stars: "5,190 stars",
        since: "Public repo since 2015",
        metadata: "https://api.github.com/repos/shakacode/react_on_rails",
      },
      {
        id: "shakapacker",
        name: "Shakapacker",
        version: "v10.3.0",
        release: "https://github.com/shakacode/shakapacker/releases/tag/v10.3.0",
        stars: "490 stars",
        since: "Public repo since 2017",
        metadata: "https://api.github.com/repos/shakacode/shakapacker",
      },
      {
        id: "e2e",
        name: "E2E on Rails",
        version: "v1.20.1",
        release:
          "https://github.com/shakacode/cypress-playwright-on-rails/releases/tag/v1.20.1",
        stars: "453 stars",
        since: "Public repo since 2017",
        metadata:
          "https://api.github.com/repos/shakacode/cypress-playwright-on-rails",
      },
      {
        id: "shakaperf",
        name: "ShakaPerf",
        version: "shaka-perf@0.1.3 package record",
        release: "https://registry.npmjs.org/shaka-perf/0.1.3",
        stars: "0 stars",
        since: "Public repo since 2026",
        metadata: "https://api.github.com/repos/shakacode/shakaperf",
      },
      {
        id: "cpflow",
        name: "Control Plane Flow",
        version: "v5.2.0",
        release:
          "https://github.com/shakacode/control-plane-flow/releases/tag/v5.2.0",
        stars: "51 stars",
        since: "Public repo since 2022",
        metadata: "https://api.github.com/repos/shakacode/control-plane-flow",
      },
    ];

    await expect(snapshot.locator(".maturity-snapshot-card")).toHaveCount(5);
    for (const project of expectedProjects) {
      const card = snapshot.locator(`[data-project="${project.id}"]`);
      await expect(card.getByRole("heading", { name: project.name })).toBeVisible();
      await expect(card.getByRole("link", { name: project.version })).toHaveAttribute(
        "href",
        project.release
      );
      const metadataEvidence = card.getByRole("link", {
        name: `${project.stars} · ${project.since} GitHub repository metadata JSON`,
        exact: true,
      });
      await expect(metadataEvidence).toHaveAttribute(
        "href",
        project.metadata
      );
      await expect(
        card.locator(`.maturity-snapshot-facts a[href="${project.metadata}"]`)
      ).toHaveCount(1);
    }

    const shakapacker = snapshot.locator('[data-project="shakapacker"]');
    await expect(
      shakapacker.getByRole("link", { name: "Official Webpacker successor" })
    ).toHaveAttribute(
      "href",
      "https://github.com/shakacode/shakapacker/blob/5485afe290d8f489f973c78420470c1b72dcd10c/README.md"
    );
    await expect(
      snapshot.locator('[data-project="shakaperf"]').getByText("New public repository", {
        exact: true,
      })
    ).toBeVisible();
  });

  test("filters to the public ShakaPerf report proof", async ({ page }) => {
    await page.goto("/");

    const demoCard = page.getByRole("article").filter({
      has: page.getByRole("heading", { name: "Marketplace" }),
    });
    await expect(
      demoCard.getByRole("img", {
        name: "React on Rails Performance Demo landing page with the headline Make Your Rails App 2x Faster",
      })
    ).toHaveAttribute("src", "/examples/marketplace.webp");
    const demoLink = demoCard.getByRole("link", { name: "Live demo" });
    await expect(demoLink).toHaveClass("live");
    await expect(demoLink.locator("svg path")).toHaveAttribute(
      "d",
      "M6 4l14 8-14 8V4z"
    );

    const evidence = page.locator(".maturity-card-perf");
    await expect(evidence.getByRole("link", { name: "Report snapshot" })).toHaveAttribute(
      "href",
      "https://github.com/shakacode/shakaperf/blob/f054e87b5d2712b78ed5e352ee31c6b44ea7e712/integration-tests/snapshots/audit-results/client__01-overview.png"
    );
    await expect(evidence.getByRole("link", { name: "Report gallery" })).toHaveAttribute(
      "href",
      "https://github.com/shakacode/shakaperf/tree/f054e87b5d2712b78ed5e352ee31c6b44ea7e712/integration-tests/snapshots/audit-results"
    );

    const filter = page.getByRole("button", { name: /^ShakaPerf/ });
    const galleryIsland = filter.locator("xpath=ancestor::astro-island");
    await filter.scrollIntoViewIfNeeded();
    await expect(galleryIsland).not.toHaveAttribute("ssr", "");
    await expect(filter.locator(".ct")).toHaveText("1");
    await filter.click();

    const proofCard = page.getByRole("article").filter({
      has: page.getByRole("heading", { name: "ShakaPerf audit report" }),
    });
    await expect(proofCard).toBeVisible();
    const proofPreview = proofCard.getByRole("img", {
      name: "ShakaPerf audit report preview unavailable",
    });
    await expect(proofPreview).toBeVisible();
    await expect(proofPreview.getByText("View report snapshot", { exact: true })).toBeVisible();
    const artifactLink = proofCard.getByRole("link", { name: "View report snapshot" });
    await expect(artifactLink).toHaveAttribute(
      "href",
      "https://github.com/shakacode/shakaperf/blob/f054e87b5d2712b78ed5e352ee31c6b44ea7e712/integration-tests/snapshots/audit-results/client__01-overview.png"
    );
    await expect(artifactLink).toHaveClass("live");
    await expect(artifactLink.locator("svg path")).toHaveAttribute(
      "d",
      "M7 17L17 7M9 7h8v8"
    );
    await expect(proofCard.getByRole("link", { name: "Source" })).toHaveAttribute(
      "href",
      "https://github.com/shakacode/shakaperf/tree/f054e87b5d2712b78ed5e352ee31c6b44ea7e712/integration-tests/snapshots/audit-results"
    );
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
    await expect(page.locator(".nav-cta").getByRole("link", { name: "GitHub" })).toBeVisible();
    await expect(
      page.locator(".nav-cta").getByRole("link", { name: "Book a free call" })
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
        page.locator(".nav-cta").getByRole("link", { name: "Book a free call" })
      ).toBeVisible();
      await expect(page.evaluate(() => document.documentElement.scrollWidth)).resolves.toBe(width);

      await context.close();
    }
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
