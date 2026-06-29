import { createClient } from "next-sanity";

export const sanityConfig = {
  projectId: "6ug4wlfa",
  dataset: "production",
  apiVersion: "2024-03-01",
} as const;

export const client = createClient({
  ...sanityConfig,
  useCdn: false,
});
