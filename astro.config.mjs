import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { remarkObsidianImages } from "./src/lib/remark-obsidian-images.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const viteEnvPath = require.resolve("vite/dist/client/env.mjs");
const viteClientPath = require.resolve("vite/dist/client/client.mjs");

export default defineConfig({
  site: "https://viniciusnevescosta.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkObsidianImages],
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        { find: /^\/?@vite\/env/, replacement: viteEnvPath },
        { find: /^\/?@vite\/client/, replacement: viteClientPath },
      ],
    },
  },
});