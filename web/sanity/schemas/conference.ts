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

export const conferenceSchema = defineType({
  name: "conference",
  title: "Conference",
  type: "document",
  icon: () => "🎤",
  fields: [
    ...titleFields,
    slugField,
    ...excerptFields,
    coverImageField,
    ...metaFields,
    defineField({
      name: "eventDate",
      title: "Event date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location (UK)",
      type: "string",
      description: 'e.g. "Київ, офлайн" or "Онлайн"',
    }),
    defineField({
      name: "locationEn",
      title: "Location (EN)",
      type: "string",
    }),
    defineField({
      name: "organizer",
      title: "Organizer",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Your role",
      type: "string",
      options: {
        list: [
          { title: "Speaker", value: "speaker" },
          { title: "Participant", value: "participant" },
          { title: "Organizer", value: "organizer" },
        ],
      },
    }),
    defineField({
      name: "presentationTitle",
      title: "Presentation title (UK)",
      type: "string",
    }),
    defineField({
      name: "presentationTitleEn",
      title: "Presentation title (EN)",
      type: "string",
    }),
    defineField({
      name: "presentationTopics",
      title: "Key topics covered",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration / event URL",
      type: "url",
    }),
    defineField({
      name: "slidesUrl",
      title: "Slides / materials URL",
      type: "url",
    }),
    bodyField,
    bodyEnField,
  ],
  preview: {
    select: { title: "title", date: "eventDate", media: "coverImage" },
    prepare: ({ title, date, media }) => ({
      title,
      media,
      subtitle: date ? new Date(date).toLocaleDateString("uk-UA") : "",
    }),
  },
});
