import {defineField, defineType} from 'sanity'

export const guideType = defineType({
  name: 'guide',
  title: 'Гайд',
  type: 'document',
  groups: [
    {name: 'main', title: 'Основна інформація', default: true},
    {name: 'hero', title: 'Hero'},
    {name: 'quick', title: 'Швидка відповідь'},
    {name: 'audience', title: 'Для кого'},
    {name: 'steps', title: 'Покрокова інструкція'},
    {name: 'tips', title: 'Поради лікаря'},
    {name: 'warnings', title: 'Попередження'},
    {name: 'checklist', title: 'Що взяти'},
    {name: 'after', title: 'Після процедури'},
    {name: 'faq', title: 'FAQ'},
    {name: 'related', title: "Пов'язані матеріали"},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      group: 'main',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      group: 'main',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата публікації',
      type: 'datetime',
      group: 'main',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Оновлено',
      type: 'datetime',
      group: 'main',
      description: 'Показується в Hero як «Оновлено: …»',
    }),

    defineField({
      name: 'heroImage',
      title: 'Фото / ілюстрація',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
    }),
    defineField({
      name: 'subtitle',
      title: 'Підзаголовок (Hero)',
      type: 'string',
      group: 'hero',
      description: 'Наприклад: підготовка до МРТ',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Короткий опис',
      type: 'text',
      group: 'hero',
      rows: 3,
    }),
    defineField({
      name: 'readingTime',
      title: 'Час читання (хв)',
      type: 'number',
      group: 'hero',
      validation: (rule) => rule.min(1).max(120),
    }),
    defineField({
      name: 'downloadablePdf',
      title: 'PDF для завантаження',
      type: 'file',
      group: 'hero',
      options: {accept: 'application/pdf'},
    }),

    defineField({
      name: 'quickFacts',
      title: 'Швидка відповідь',
      description: 'Що потрібно знати? — короткі пункти з ✓',
      type: 'array',
      group: 'quick',
      of: [{type: 'textItem'}],
    }),

    defineField({
      name: 'whoIsFor',
      title: 'Коли цей гайд потрібний',
      description: 'Цей гайд буде корисним якщо…',
      type: 'array',
      group: 'audience',
      of: [{type: 'textItem'}],
    }),

    defineField({
      name: 'steps',
      title: 'Покрокова інструкція',
      type: 'array',
      group: 'steps',
      of: [{type: 'guideStep'}],
    }),

    defineField({
      name: 'tips',
      title: 'Поради лікаря',
      type: 'array',
      group: 'tips',
      of: [{type: 'titledBlock'}],
    }),

    defineField({
      name: 'warnings',
      title: 'Попередження',
      type: 'array',
      group: 'warnings',
      of: [{type: 'titledBlock'}],
    }),

    defineField({
      name: 'checklist',
      title: 'Що взяти із собою',
      type: 'array',
      group: 'checklist',
      of: [{type: 'checklistItem'}],
    }),

    defineField({
      name: 'afterProcedure',
      title: 'Після процедури',
      type: 'blockContent',
      group: 'after',
      description: 'Що робити після процедури — абзаци та списки',
    }),

    defineField({
      name: 'faq',
      title: 'Часті запитання',
      type: 'array',
      group: 'faq',
      of: [{type: 'guideFaqItem'}],
    }),

    defineField({
      name: 'relatedGuides',
      title: "Пов'язані гайди",
      description: 'Якщо порожньо — на сайті можна підтягнути інші гайди автоматично',
      type: 'array',
      group: 'related',
      of: [{type: 'reference', to: [{type: 'guide'}]}],
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO заголовок',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO опис',
      type: 'text',
      group: 'seo',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'readingTime',
      media: 'heroImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} хв читання` : undefined,
        media,
      }
    },
  },
})
