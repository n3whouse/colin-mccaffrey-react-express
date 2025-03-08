import {defineField, defineType} from 'sanity'
import ReorderReleases from './components/ReorderReleases'
import {ReleaseInfo} from './components/ReleaseInfo'

export const releaseType = defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: [
    {name: 'releaseInfo', title: 'Release Info'},
    {name: 'customization', title: 'Customization'},
  ],
  fields: [
    defineField({
      name: 'info',
      type: 'string',
      components: {
        field: ReleaseInfo,
      },
      readOnly: true,
    }),
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
              name: 'releaseType',
              type: 'string',
              options: {
                list: [
                  {title: 'Single', value: 'single'},
                  {title: 'Album', value: 'album'},
                ],
                layout: 'radio',
              },
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
            defineField({
              name: 'hostedButtonId',
              title: 'Paypal Hosted Button ID',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'number',
              description:
                'Set the price of the release. The price will be displayed dynamically per release in each store modal.',
              hidden: ({parent}) => parent?.releaseType === 'single',
              validation: (rule) => rule.min(0).error('Price must be a positive number.'),
            }),
          ],
        },
      ],
    }),
  ],
})
