import {defineField, defineType} from 'sanity'

export const releaseType = defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  groups: [{name: 'releaseInfo', title: 'Release Info'}],
  fields: [
    defineField({
      name: 'releaseTitle',
      title: 'Release Title',
      type: 'string',
      validation: (rule) => rule.required().min(1).error('Release name cannot be blank.'),
      group: 'releaseInfo',
    }),
    defineField({
      name: 'coverArt',
      title: 'Cover Art',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'releaseInfo',
    }),
    defineField({
      name: 'releaseDescription',
      title: 'Release Description',
      type: 'text',
      group: 'releaseInfo',
    }),
    defineType({
      name: 'purchaseLink',
      title: 'Purchase Link',
      type: 'url',
      group: 'releaseInfo',
    }),
  ],
})
