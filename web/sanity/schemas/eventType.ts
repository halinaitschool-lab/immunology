import { defineField, defineType } from "sanity";

export const eventTypeSchema = defineType({
  name: "eventType",
  title: "Event Type",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
