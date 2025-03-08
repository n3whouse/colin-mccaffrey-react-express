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
          description: 'The headline above the show calendar',
        }),
        defineField({
          name: 'upcomingShowsSubtitle',
          title: 'Subtitle',
          type: 'string',
          description: 'Optional subtitle below the headline',
        }),
      ],
      group: 'calendar',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      description:
        'Add, edit, or delete media items under the Media sublink. This can be either uploaded video or a YouTube link. For uploading or changing mp3 files for the audio player, use the Audio Files tab on the left.',
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
                  {title: 'Video (MP4)', value: 'video'},
                  {title: 'YouTube', value: 'youtube'},
                ],
              },
              validation: (Rule) => Rule.required(),
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
