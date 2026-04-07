import { defineConfig, fontProviders } from "astro/config";
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
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [400, 600],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      formats: ["woff2"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Lora",
      cssVariable: "--font-lora",
      weights: [400, 600],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
      formats: ["woff2"],
      fallbacks: ["Georgia", "Times New Roman", "serif"],
    },
  ],
  prefetch: {
    defaultStrategy: "hover",
  },
  image: {
    layout: "constrained",
    responsiveStyles: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        jpeg: { mozjpeg: true, quality: 76 },
        webp: { effort: 6, quality: 74 },
        avif: { effort: 4, quality: 55 },
        png: { compressionLevel: 9 },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
