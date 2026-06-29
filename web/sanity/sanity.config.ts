import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import {
  articleSchema,
  conferenceSchema,
  guideSchema,
  lectureSchema,
} from "./schemas";

export default defineConfig({
  name: "default",
  title: "Immunology Studio",
  projectId: "6ug4wlfa",
  dataset: "production",
  basePath: "/",
  plugins: [structureTool()],
  schema: {
    types: [lectureSchema, guideSchema, articleSchema, conferenceSchema],
  },
});
