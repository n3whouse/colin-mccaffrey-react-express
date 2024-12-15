import {defineField, defineType} from 'sanity'
import DynamicPanelName from './components/DynamicPanelName'

export const producerType = defineType({
  name: 'producer',
  title: 'Producer',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: [
    {name: 'studio', title: 'Studio'},
    {name: 'gearAndPrograms', title: 'Gear & Programs'},
    {name: 'productionCredits', title: 'Production Credits'},
  ],
  fields: [
    defineField({
      name: 'panelName',
      title: 'Panel Name',
      type: 'string',
      inputComponent: DynamicPanelName,
    }),
    defineField({
      name: 'studio',
      title: 'Studio',
      type: 'object',
      __experimental_formPreviewTitle: false,
      fields: [
        defineField({
          name: 'studioTitle',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required().min(1).error('Title must not be blank.'),
        }),
        defineField({
          name: 'studioPhoto',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: 'true',
          },
        }),
        defineField({
          name: 'studioBlurb',
          title: 'Studio Description',
          type: 'array',
          of: [{type: 'block'}],
          validation: (rule) => rule.required().min(1).error('Description cannot be blank'),
        }),
      ],
      group: 'studio',
    }),
    defineField({
      name: 'gearAndPrograms',
      title: 'Gear & Programs',
      type: 'object',
      fields: [
        defineField({
          name: 'gearHeadline',
          title: 'Headline',
          type: 'string',
        }),
        defineField({
          name: 'gearDescription',
          title: 'Description',
          type: 'array',
          of: [{type: 'block'}],
        }),
      ],
      group: 'gearAndPrograms',
    }),
    defineField({
      name: 'productionCredits',
      title: 'Production Credits',
      type: 'object',
      fields: [
        defineField({
          name: 'creditsHeadline',
          title: 'Headline',
          type: 'string',
        }),
        defineField({
          name: 'creditsDescription',
          title: 'Description',
          type: 'array',
          of: [{type: 'block'}],
        }),
      ],
      group: 'productionCredits',
    }),
  ],
})
