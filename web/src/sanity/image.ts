import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImage } from "./types";
import { sanityConfig } from "./client";

const builder = createImageUrlBuilder(sanityConfig);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
