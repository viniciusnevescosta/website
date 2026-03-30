type PhotoVariantOptions = {
  width: number;
  quality?: number;
};

export function getPhotoVariant(source: string, { width, quality = 75 }: PhotoVariantOptions) {
  try {
    const url = new URL(source);

    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality));
    url.searchParams.set("auto", "format");

    return url.toString();
  } catch {
    return source;
  }
}
