import {defineArrayMember, defineType} from 'sanity'

/** Rich text: paragraphs, lists, bold, links — renders correctly on the site via Portable Text */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Текст',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Звичайний', value: 'normal'},
        {title: 'Заголовок 2', value: 'h2'},
        {title: 'Заголовок 3', value: 'h3'},
      ],
      lists: [
        {title: 'Маркований', value: 'bullet'},
        {title: 'Нумерований', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Жирний', value: 'strong'},
          {title: 'Курсив', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Посилання',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (rule) =>
                  rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
              },
            ],
          },
        ],
      },
    }),
  ],
})
