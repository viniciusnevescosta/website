## Preview

<img width="2048" height="1123" alt="image" src="https://github.com/user-attachments/assets/63f57edb-0ddd-46e2-b904-ddaaed067be3" />

## About

This is my personal website, built on top of [Mark Horn’s Astro Nano theme](https://github.com/markhorn-dev/astro-nano).

I adapted it to fit my own needs, adding a few features and UX improvements along the way.

What I changed / added:

- [Tailwind v4](https://tailwindcss.com) for the user interface;
- [Bun](https://bun.sh) for runtime and package manager;
- My personal [Still Orbit](https://still-orbit.viniciusnevescosta.com) theme;
- Custom Obsidian plugin to edit content from the app;
- Jamstack Photo Gallery powered by the Unsplash API;
- Image viewer component with EXIF metadata support;
- RSS reader improvements and small fixes for better compatibility;
- Other small changes...

## Unsplash Jamstack Integration

The `/photos` page uses a custom Jamstack approach to fetch and display my photography directly from Unsplash.

Instead of manually managing Markdown files and local images, there is a custom Ts script (`src/scripts/fetch_unsplash.ts`) that runs before the build process. It:

1. Fetches all photo IDs and their specific EXIF metadata (Camera, Lens, Aperture, Shutter Speed, and ISO) from the Unsplash API.
2. Uses an incremental local caching system (`src/data/photos.json`) to safely bypass the Unsplash Demo API rate limit (saving progress step-by-step).
3. Allows Astro to statically generate a highly optimized Masonry gallery at build time, using Unsplash's native CDNs and blur-up placeholders.

### Local Setup

To run the fetch script or build the project locally, you will need Unsplash API credentials.

Rename the `.env.example` file to `.env` (or create one in the root of the project) and fill in your details:

```env
UNSPLASH_ACCESS_KEY=
UNSPLASH_USERNAME=
```

## License

Feel free to fork this repository and use it as a base for your own personal website.

> **Note:** The source code of this website is released under the MIT License.  
> All content (blog posts, projects, text, images) is proprietary and may not be reused without explicit permission.