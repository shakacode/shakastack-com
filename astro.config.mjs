// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

const productionSite = "https://shakastack.com";
const isCloudflarePagesPreview =
  process.env.CF_PAGES === "1" &&
  process.env.CF_PAGES_BRANCH &&
  process.env.CF_PAGES_BRANCH !== "main";
const site = isCloudflarePagesPreview
  ? process.env.CF_PAGES_URL || productionSite
  : productionSite;

// https://astro.build
export default defineConfig({
  site,
  integrations: [react(), sitemap()],
  build: {
    inlineStylesheets: "auto",
  },
});
