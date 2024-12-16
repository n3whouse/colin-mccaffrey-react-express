import {defineField, defineType} from 'sanity'

export const audioFile = defineType({
  name: 'audioFile',
  title: 'Audio File',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'audioFiles',
      title: 'Audio Files',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'creditLine',
              title: 'Artist',
              type: 'reference',
              to: {
                type: 'artist',
              },
            }),
            defineField({
              name: 'audioFile',
              title: 'Audio File',
              type: 'file',
              options: {
                accept: '.mp3',
              },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'albumArt',
              title: 'Album Art',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'album',
              title: 'Album',
              type: 'reference',
              to: {
                type: 'release',
              },
            }),
            defineField({
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
        }),
      ],
    }),
  ],
})
