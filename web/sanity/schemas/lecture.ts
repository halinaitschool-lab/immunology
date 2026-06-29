import { defineArrayMember, defineField, defineType } from "sanity";
import {
  bodyEnField,
  bodyField,
  coverImageField,
  excerptFields,
  metaFields,
  slugField,
  titleFields,
} from "./shared/fields";

export const lectureSchema = defineType({
  name: "lecture",
  title: "Lecture",
  type: "document",
  icon: () => "📚",
  fields: [
    ...titleFields,
    slugField,
    ...excerptFields,
    coverImageField,
    ...metaFields,
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube, Vimeo, or other video link",
    }),
    defineField({
      name: "duration",
      title: "Duration (UK)",
      type: "string",
      description: 'e.g. "45 хв"',
    }),
    defineField({
      name: "durationEn",
      title: "Duration (EN)",
      type: "string",
      description: 'e.g. "45 min"',
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: [
          { title: "For everyone", value: "basic" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
        layout: "radio",
      },
      initialValue: "basic",
    }),
    defineField({
      name: "learningOutcomes",
      title: "What you will learn (UK)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "learningOutcomesEn",
      title: "What you will learn (EN)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "topics",
      title: "Topics / tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    bodyField,
    bodyEnField,
  ],
  preview: {
    select: { title: "title", media: "coverImage", date: "publishedAt" },
    prepare: ({ title, media, date }) => ({
      title,
      media,
      subtitle: date ? new Date(date).toLocaleDateString("uk-UA") : "",
    }),
  },
});
