import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();

export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source || !projectId || !dataset) return null;
  return createImageUrlBuilder({ projectId, dataset }).image(source);
}
