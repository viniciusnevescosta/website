import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { remarkObsidianImages } from "./src/lib/remark-obsidian-images.ts";

export default defineConfig({
  site: "https://viniciusnevescosta.com",
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkObsidianImages],
  },
  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: true,
  },
  image: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        jpeg: { mozjpeg: true, quality: 80 },
        webp: { effort: 4, quality: 80 },
        avif: { effort: 4, quality: 65 },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: "lightningcss",
    },
  },
});
