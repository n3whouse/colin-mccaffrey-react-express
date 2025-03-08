import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'
import {DoorsOpenInput} from './components/DoorsOpenInput'
import {ShowInfo} from './components/ShowInfo'
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
      name: 'info',
      type: 'string',
      components: {
        field: ShowInfo,
      },
      readOnly: true,
    }),
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
      description: 'Main title of the show (case-sensitive)',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      group: 'details',
      description: 'Set date and time',
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
      description: 'Choose a pre-created venue or create a new one',
    }),
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{type: 'artist'}],
      description: 'Typically who you are playing alongside',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'editorial',
      description:
        'This is the image that displays on the show modal when someone clicks on this show on the calendar',
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
      group: 'editorial',
      description: 'This description will show up when folks click this show on the calendar',
    }),
    defineType({
      name: 'tickets',
      type: 'url',
      description:
        'If you include a ticket link, a button for tickets will be enabled on both the calendar and the pop-up modals. If this is blank, the buttons will not appear',
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
