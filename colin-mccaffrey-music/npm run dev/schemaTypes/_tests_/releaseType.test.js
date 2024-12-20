import {defineField, defineType, useDateTimeFormat} from 'sanity'

export const testReleaseType = defineType({
  name: 'testRelease',
  title: 'Test Release',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'releaseList',
      title: 'Release List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'releaseTitle',
              title: 'Release Title',
              type: 'string',
              description: 'Title of release',
              validation: (Rule) => Rule.required().error('Release Title cannot be blank.'),
            }),
            defineField({
              name: 'releaseYear',
              title: 'Release Year',
              type: 'date',
              options: {
                dateFormat: 'YYYY',
              },
              description: 'Year of release',
              validation: (rule) => rule.required().error('Release Year required.'),
            }),
            defineField({
              name: 'coverArt',
              title: 'Cover Art',
              type: 'image',
              description: 'Cover art of release',
              options: {
                hotspot: true,
              },
              validation: (rule) =>
                rule.required().error('A cover photo is required for the store page.'),
            }),
            defineField({
              name: 'releaseDescription',
              title: 'Release Description',
              type: 'array',
              of: [{type: 'block'}],
            }),
            defineField({
              name: 'purchaseLink',
              title: 'Purchase Link',
              type: 'url',
              description: 'Link to purchase release',
            }),
          ],
        },
      ],
    }),
  ],
})
