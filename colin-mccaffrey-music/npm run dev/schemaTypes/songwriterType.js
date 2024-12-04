import {defineField, defineType} from 'sanity'

export const songwriterType = defineType({
  name: 'songwriter',
  title: 'Songwriter',
  __experimental_formPreviewTitle: false,
  type: 'document',
  groups: [
    {name: 'linkOne', title: 'Link One'},
    {name: 'linkTwo', title: 'Link Two'},
  ],
  fields: [
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'object',
      fields: [
        defineField({
          name: 'linkTwoHeadline',
          title: 'Headline',
          type: 'string',
        }),
        defineField({
          name: 'details',
          title: 'Details',
          type: 'array',
          of: [{type: 'block'}],
          validation: (Rule) => Rule.required(),
        }),
      ],
      group: 'linkTwo',
    }),
    defineField({
      name: 'subnavLinks',
      title: 'Subnav Links',
      type: 'object',
      fields: [
        defineField({
          name: 'linkOne',
          title: 'Link One',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'linkTwo',
          title: 'Link Two',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineType({
      name: 'streaming',
      title: 'Streaming',
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
                  {title: 'Spotify', value: 'spotify'},
                  {title: 'Apple Music', value: 'appleMusic'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'Livestream', value: 'livestream'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'spotifyUrl',
              title: 'Spotify',
              type: 'url',
              validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
              hidden: ({document, parent}) => parent?.mediaType !== 'spotify',
            }),
            defineField({
              name: 'appleMusicUrl',
              title: 'Apple Music',
              type: 'url',
              validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
              hidden: ({document, parent}) => parent?.mediaType !== 'appleMusic',
            }),
            defineField({
              name: 'youtubeUrl',
              title: 'YouTube',
              type: 'url',
              validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
              hidden: ({document, parent}) => parent?.mediaType !== 'youtube',
            }),
            defineField({
              name: 'livestreamUrl',
              title: 'Live Stream',
              type: 'url',
              validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
              hidden: ({document, parent}) => parent?.mediaType !== 'livestream',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
        }),
      ],
      group: 'linkOne',
    }),
  ],
})
