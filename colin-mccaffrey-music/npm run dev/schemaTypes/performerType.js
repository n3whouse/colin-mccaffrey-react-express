import {defineField, defineType} from 'sanity'

export const performerType = defineType({
  name: 'performer',
  title: 'Performer',
  __experimental_formPreviewTitle: false,
  type: 'document',
  groups: [
    {name: 'upcomingShows', title: 'Upcoming Shows'},
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
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'addShow',
          title: 'Add Show',
          type: 'reference',
          to: [{type: 'show'}],
        }),
      ],
      group: 'upcomingShows',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'object',
      fields: [
        defineField({
          name: 'mediaHeadline',
          title: 'Headline',
          type: 'string',
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
            accept: 'audio/mp3',
          },
          hidden: ({document}) => document?.media?.mediaType !== 'audio',
        }),
        defineField({
          name: 'videoFile',
          title: 'Video File',
          type: 'file',
          options: {
            accept: 'video/mp4',
          },
          hidden: ({document}) => document?.media?.mediaType !== 'video',
        }),
        defineField({
          name: 'youtubeUrl',
          title: 'YouTube URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
          hidden: ({document}) => document?.media?.mediaType !== 'youtube',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'publishedAt',
          title: 'Published At',
          type: 'datetime',
        }),
      ],
      group: 'media',
    }),
  ],
})
