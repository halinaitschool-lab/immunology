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

export const articleSchema = defineType({
  name: "article",
  title: "Scientific article",
  type: "document",
  icon: () => "🔬",
  fields: [
    ...titleFields,
    slugField,
    ...excerptFields,
    coverImageField,
    ...metaFields,
    defineField({
      name: "journal",
      title: "Journal / source",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "doi",
      title: "DOI",
      type: "string",
      description: "Digital Object Identifier",
    }),
    defineField({
      name: "abstract",
      title: "Abstract (UK)",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "abstractEn",
      title: "Abstract (EN)",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "externalUrl",
      title: "Link to full publication",
      type: "url",
    }),
    defineField({
      name: "clinicalRelevance",
      title: "Clinical relevance (UK)",
      type: "text",
      rows: 3,
      description: "Why this matters for your practice",
    }),
    defineField({
      name: "clinicalRelevanceEn",
      title: "Clinical relevance (EN)",
      type: "text",
      rows: 3,
    }),
    bodyField,
    bodyEnField,
  ],
  preview: {
    select: { title: "title", subtitle: "journal", media: "coverImage" },
  },
});
