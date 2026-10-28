import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'array',
      fields: [{ name: 'label', type: 'text' }],
    },
    {
      name: 'tags',
      type: 'array',
      custom: {
        'plugin-import-export': {
          hooks: {
            beforeExport: ({ value }: { value?: { label?: string }[] }) =>
              (value ?? []).map((tag) => tag.label).join(' | '),
          },
        },
      },
      fields: [{ name: 'label', type: 'text' }],
    },
  ],
}
