import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Контент')
    .items([
      S.listItem()
        .title('Для пацієнтів')
        .child(
          S.list()
            .title('Для пацієнтів')
            .items([
              S.listItem()
                .title('Гайди')
                .schemaType('guide')
                .child(S.documentTypeList('guide').title('Гайди')),
              S.listItem()
                .title('Лекції')
                .schemaType('post')
                .child(
                  S.documentList()
                    .title('Лекції')
                    .filter('_type == "post"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
                ),
            ]),
        ),
      S.listItem()
        .title('Для лікарів')
        .child(
          S.list()
            .title('Для лікарів')
            .items([
              S.listItem()
                .title('Наукові статті')
                .child(
                  S.documentList()
                    .title('Наукові статті')
                    .filter('_type == "post"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
                ),
              S.listItem()
                .title('Конференції')
                .child(
                  S.documentList()
                    .title('Конференції')
                    .filter('_type == "post"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
                ),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['guide', 'post'].includes(item.getId() ?? ''),
      ),
    ])
