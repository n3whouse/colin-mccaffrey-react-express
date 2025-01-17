import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'
import {DoorsOpenInput} from './components/DoorsOpenInput'
export const showType = defineType({
  name: 'show',
  title: 'Show',
  icon: CalendarIcon,
  type: 'document',
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],
  fields: [
    defineField({
      name: 'showType',
      type: 'string',
      options: {
        list: ['in-person', 'virtual'],
        layout: 'radio',
      },
      group: 'details',
    }),
    defineField({
      name: 'name',
      type: 'string',
      group: ['details', 'editorial'],
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      group: 'details',
    }),
    defineField({
      name: 'price',
      type: 'number',
      group: 'details',
      validation: (rule) =>
        rule.required().min(0).error('A price is required. If event is free, enter 0.'),
    }),
    defineField({
      name: 'doorsOpen',
      description: 'Number of minutes before the start time for admission',
      type: 'number',
      initialValue: 60,
      group: 'details',
      components: {
        input: DoorsOpenInput,
      },
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
      readOnly: ({value, document}) => !value && document?.eventType === 'virtual',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value && context?.document?.eventType === 'virtual') {
            return 'Virtual events cannot have a venue.'
          }
          return true
        }),
    }),
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'editorial',
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
      group: 'editorial',
    }),
    defineType({
      name: 'tickets',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      venue: 'venue.name',
      artist: 'headline.name',
      date: 'date',
      media: 'image',
    },
    prepare({name, venue, artist, date, image}) {
      const nameFormatted = name || 'Untitled event'
      const dateFormatted = date
        ? new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        : 'No date'

      return {
        title: artist ? `${nameFormatted}: featuring ${artist}` : nameFormatted,
        subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
        media: image || CalendarIcon,
      }
    },
  },
})
