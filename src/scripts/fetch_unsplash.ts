/// <reference types="bun-types" />

/**
 * src/scripts/fetch_unsplash.ts
 *
 * Usage: bun src/scripts/fetch_unsplash.ts
 * Output: src/data/photos.json
 *
 * Required environment variables (.env):
 * UNSPLASH_ACCESS_KEY=your_key_here
 * UNSPLASH_USERNAME=your_username_here
 */

import { write, file } from "bun";
import { resolve } from "path";
import { mkdirSync, existsSync } from "fs";

const DATA_DIR = resolve(import.meta.dir, "../data");
const OUTPUT_PATH = resolve(DATA_DIR, "photos.json");

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const USERNAME = process.env.UNSPLASH_USERNAME;
const API_BASE = "https://api.unsplash.com";
const PER_PAGE = 30;

interface Photo {
  id: string;
  url: string;
  urlFull: string;
  urlThumb: string;
  publishedAt: string;
  camera: string | null;
  lens: string | null;
  aperture: string | null;
  shutterSpeed: string | null;
  iso: number | null;
  authorName: string;
  authorLink: string;
  altText: string | null;
  width: number;
  height: number;
  color: string | null;
}

function validate() {
  if (!ACCESS_KEY) {
    console.error("Error: UNSPLASH_ACCESS_KEY is not set.");
    process.exit(1);
  }
  if (!USERNAME) {
    console.error("Error: UNSPLASH_USERNAME is not set.");
    process.exit(1);
  }
}

async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });

  if (!res.ok) {
    throw new Error(`Unsplash API ${res.status}: ${res.statusText} — ${endpoint}`);
  }

  return res.json() as Promise<T>;
}

async function fetchAllPhotos() {
  mkdirSync(DATA_DIR, { recursive: true });

  const cachedMap = new Map<string, Photo>();
  if (existsSync(OUTPUT_PATH)) {
    try {
      const cacheData: Photo[] = await file(OUTPUT_PATH).json();
      for (const photo of cacheData) cachedMap.set(photo.id, photo);
      console.log(`Cache: ${cachedMap.size} photo(s) loaded from disk.`);
    } catch (e) {
      console.warn("Warning: Could not parse existing cache, starting fresh. ", e);
    }
  }

  console.log(`Fetching photo IDs from @${USERNAME}...`);

  const currentIds: string[] = [];
  let page = 1;

  while (true) {
    try {
      const list = await apiFetch<{ id: string }[]>(
        `/users/${USERNAME}/photos?per_page=${PER_PAGE}&page=${page}&order_by=latest`,
      );

      if (!Array.isArray(list) || list.length === 0) break;

      currentIds.push(...list.map((p) => p.id));
      console.log(`  Page ${page} — ${currentIds.length} ID(s) found`);

      if (list.length < PER_PAGE) break;
      page++;
    } catch (err) {
      console.error(
        `\nError fetching list on page ${page}:`,
        err instanceof Error ? err.message : err,
      );
      if (currentIds.length === 0) throw err;
      break;
    }
  }

  if (currentIds.length === 0) {
    console.warn("Warning: No photos found for this user.");
    return;
  }

  const idsToFetch = currentIds.filter((id) => !cachedMap.has(id));

  if (idsToFetch.length > 0) {
    console.log(`\nFetching metadata for ${idsToFetch.length} new photo(s)...`);

    for (const [i, id] of idsToFetch.entries()) {
      try {
        const detail = await apiFetch<any>(`/photos/${id}`);

        const newPhoto: Photo = {
          id: detail.id,
          url: detail.urls.regular,
          urlFull: detail.urls.full,
          urlThumb: detail.urls.thumb,
          publishedAt: detail.created_at,
          camera: detail.exif?.model ?? null,
          lens: detail.exif?.name ?? null,
          aperture: detail.exif?.aperture ?? null,
          shutterSpeed: detail.exif?.exposure_time ?? null,
          iso: detail.exif?.iso ?? null,
          authorName: detail.user.name,
          authorLink: detail.user.links.html,
          altText: detail.alt_description ?? null,
          width: detail.width,
          height: detail.height,
          color: detail.color ?? null,
        };

        cachedMap.set(id, newPhoto);

        const currentData = currentIds.map((cid) => cachedMap.get(cid)).filter(Boolean) as Photo[];
        await write(OUTPUT_PATH, JSON.stringify(currentData, null, 2));

        process.stdout.write(`\r  ${i + 1}/${idsToFetch.length} saved.`);
      } catch (err) {
        console.error(`\n\nError fetching photo ${id}:`, err instanceof Error ? err.message : err);
        console.log(
          `Script stopped, but progress up to photo ${i} was safely saved to ${OUTPUT_PATH}.`,
        );
        break;
      }
    }
    console.log("\nFinished fetching new photos.");
  } else {
    console.log("\nNo new photos to fetch. Cache is up to date.");
  }

  const finalPhotos = currentIds.map((cid) => cachedMap.get(cid)).filter(Boolean) as Photo[];
  await write(OUTPUT_PATH, JSON.stringify(finalPhotos, null, 2));

  console.log(`Done: ${finalPhotos.length} photo(s) available in ${OUTPUT_PATH}`);
}

validate();

fetchAllPhotos().catch((err) => {
  console.error("Fatal Error:", err instanceof Error ? err.message : err);
  process.exit(1);
});
