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

export const guideSchema = defineType({
  name: "guide",
  title: "Guide",
  type: "document",
  icon: () => "📋",
  fields: [
    ...titleFields,
    slugField,
    ...excerptFields,
    coverImageField,
    ...metaFields,
    defineField({
      name: "targetAudience",
      title: "Who is this for? (UK)",
      type: "string",
      description: "e.g. Parents of children with food allergies",
    }),
    defineField({
      name: "targetAudienceEn",
      title: "Who is this for? (EN)",
      type: "string",
    }),
    defineField({
      name: "steps",
      title: "Step-by-step overview",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "title", title: "Step title (UK)", type: "string" }),
            defineField({ name: "titleEn", title: "Step title (EN)", type: "string" }),
            defineField({
              name: "description",
              title: "Step description (UK)",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "descriptionEn",
              title: "Step description (EN)",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "title" },
            prepare: ({ title }) => ({ title: title || "Step" }),
          },
        }),
      ],
    }),
    defineField({
      name: "relatedConditions",
      title: "Related conditions / topics",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "downloadUrl",
      title: "PDF download URL",
      type: "url",
      description: "Optional printable version",
    }),
    bodyField,
    bodyEnField,
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
    prepare: ({ title, media }) => ({ title, media }),
  },
});
