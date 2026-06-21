// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build
export default defineConfig({
  site: "https://shakastack.com",
  integrations: [react(), sitemap()],
  build: {
    inlineStylesheets: "auto",
  },
});
