import { defineArrayMember, defineField } from "sanity";

export const slugField = defineField({
  name: "slug",
  title: "URL slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (Rule) => Rule.required(),
});

export const coverImageField = defineField({
  name: "coverImage",
  title: "Cover image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text (UK)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "altEn", title: "Alt text (EN)", type: "string" }),
  ],
});

export const excerptFields = [
  defineField({
    name: "excerpt",
    title: "Short summary (UK)",
    type: "text",
    rows: 3,
    description: "Shown on list cards and under the title",
    validation: (Rule) => Rule.required().max(300),
  }),
  defineField({
    name: "excerptEn",
    title: "Short summary (EN)",
    type: "text",
    rows: 3,
    validation: (Rule) => Rule.max(300),
  }),
];

export const metaFields = [
  defineField({
    name: "publishedAt",
    title: "Published date",
    type: "datetime",
    initialValue: () => new Date().toISOString(),
  }),
  defineField({
    name: "readingTimeMinutes",
    title: "Reading time (minutes)",
    type: "number",
    validation: (Rule) => Rule.min(1).max(120),
  }),
  defineField({
    name: "featured",
    title: "Featured on list page",
    type: "boolean",
    initialValue: false,
  }),
];

export const bodyField = defineField({
  name: "body",
  title: "Main content (UK)",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
    }),
    defineArrayMember({
      name: "callout",
      title: "Callout box",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string", title: "Title" }),
        defineField({ name: "text", type: "text", title: "Text", rows: 3 }),
      ],
      preview: {
        select: { title: "title" },
        prepare: ({ title }) => ({ title: title || "Callout" }),
      },
    }),
  ],
});

export const bodyEnField = defineField({
  name: "bodyEn",
  title: "Main content (EN)",
  type: "array",
  of: bodyField.of,
});

export const titleFields = [
  defineField({
    name: "title",
    title: "Title (UK)",
    type: "string",
    validation: (Rule) => Rule.required(),
  }),
  defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),
];
