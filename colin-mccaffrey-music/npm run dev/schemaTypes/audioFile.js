export default {
  name: 'audioFile',
  title: 'Audio File',
  type: 'file',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'creditLine',
      title: 'Artist',
      type: 'reference',
      to: {
        type: 'artist',
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'albumArt',
      title: 'Album Art',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}
