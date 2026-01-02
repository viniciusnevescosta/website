import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { remarkObsidianImages } from "./src/lib/remark-obsidian-images.js";

export default defineConfig({
  site: "https://viniciusnevescosta.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkObsidianImages],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});