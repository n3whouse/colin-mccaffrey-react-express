import {defineField, defineType} from 'sanity'

export const performerType = defineType({
  name: 'performer',
  title: 'Performer',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: [
    {name: 'calendar', title: 'Calendar'},
    {name: 'media', title: 'Media'},
    {name: 'customization', title: 'Customization'},
  ],
  fields: [
    defineField({
      name: 'upcomingShows',
      title: 'Upcoming Shows',
      type: 'object',
      fields: [
        defineField({
          name: 'upcomingShowsHeadline',
          title: 'Headline',
          type: 'string',
        }),
        defineField({
          name: 'upcomingShowsSubtitle',
          title: 'Subtitle',
          type: 'string',
        }),
        defineField({
          name: 'addShow',
          title: 'Add Show',
          type: 'reference',
          to: [{type: 'show'}],
        }),
      ],
      group: 'calendar',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({
              name: 'mediaHeadline',
              title: 'Headline',
              type: 'array',
              of: [{type: 'block'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'mediaType',
              title: 'Media Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Audio (MP3)', value: 'audio'},
                  {title: 'Video (MP4)', value: 'video'},
                  {title: 'YouTube', value: 'youtube'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'audioFile',
              title: 'Audio File',
              type: 'file',
              options: {
                accept: '.mp3',
              },
              hidden: ({document, parent}) => parent?.mediaType !== 'audio',
            }),
            defineField({
              name: 'videoFile',
              title: 'Video File',
              type: 'file',
              options: {
                accept: 'video/mp4',
              },
              hidden: ({document, parent}) => parent?.mediaType !== 'video',
            }),
            defineField({
              name: 'youtubeUrl',
              title: 'YouTube URL',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https'],
                }),
              hidden: ({document, parent}) => parent?.mediaType !== 'youtube',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{type: 'block'}],
            }),
            defineField({
              name: 'publishedAt',
              title: 'Published At',
              type: 'datetime',
            }),
          ],
        }),
      ],
      group: 'media',
    }),
  ],
})
