import {defineField, defineType} from 'sanity'

export const textItem = defineType({
  name: 'textItem',
  title: 'Пункт',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Текст',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'text'},
  },
})

export const guideStep = defineType({
  name: 'guideStep',
  title: 'Крок',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок кроку',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Фото',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'content',
      title: 'Текст',
      type: 'blockContent',
      description: 'Enter — новий абзац; списки та жирний текст підтримуються на сайті',
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Орієнтовний час',
      type: 'string',
      description: 'Наприклад: 5 хв',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'estimatedTime', media: 'image'},
  },
})

export const titledBlock = defineType({
  name: 'titledBlock',
  title: 'Блок',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Текст',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})

export const guideFaqItem = defineType({
  name: 'guideFaqItem',
  title: 'Питання',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Питання',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Відповідь',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'question'},
  },
})

export const checklistItem = defineType({
  name: 'checklistItem',
  title: 'Пункт чекліста',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Емодзі / іконка',
      type: 'string',
      description: 'Наприклад: 📄',
    }),
    defineField({
      name: 'item',
      title: 'Назва',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'item', subtitle: 'icon'},
    prepare({title, subtitle}) {
      return {title: subtitle ? `${subtitle} ${title}` : title}
    },
  },
})
