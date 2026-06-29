import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6ug4wlfa",
  dataset: "production",
  apiVersion: "2024-03-01",
  useCdn: false,
});
