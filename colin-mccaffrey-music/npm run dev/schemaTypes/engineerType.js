import {defineField, defineType} from 'sanity'

export const engineerType = defineType({
  name: 'engineer',
  title: 'Engineer',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: [
    {name: 'studio', title: 'Studio'},
    {name: 'gearAndSoftware', title: 'Gear & Software'},
    {name: 'productionCredits', title: 'Production Credits'},
    {name: 'customization', title: 'Customization'},
  ],
  fields: [
    defineField({
      name: 'studio',
      title: 'Studio',
      type: 'object',
      __experimental_formPreviewTitle: false,
      fields: [
        defineField({
          name: 'studioTitle',
          title: 'Headline',
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
          title: 'Studio Details',
          type: 'array',
          of: [{type: 'block'}],
          validation: (rule) => rule.required().min(1).error('Description cannot be blank'),
        }),
      ],
      group: 'studio',
    }),
    defineField({
      name: 'gearAndPrograms',
      title: 'Gear & Software',
      type: 'object',
      fields: [
        defineField({
          name: 'gearHeadline',
          title: 'Headline',
          type: 'string',
        }),
        defineField({
          name: 'gearPhoto',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: 'true',
          },
        }),
        defineField({
          name: 'gearDetails',
          title: 'Details',
          type: 'array',
          of: [{type: 'block'}],
        }),
      ],
      group: 'gearAndSoftware',
    }),
    defineField({
      name: 'productionCredits',
      title: 'Production Credits',
      type: 'object',
      fields: [
        defineField({
          name: 'productionHeadline',
          title: 'Headline',
          type: 'string',
        }),
        defineField({
          name: 'creditsPhoto',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: 'true',
          },
        }),
        defineField({
          name: 'productionDetails',
          title: 'Details',
          type: 'array',
          of: [{type: 'block'}],
        }),
      ],
      group: 'productionCredits',
    }),
    defineField({
      name: 'subnavLinks',
      title: 'Subnav Links',
      type: 'object',
      fields: [
        defineField({
          name: 'subLinkOne',
          title: 'Link One',
          type: 'string',
        }),
        defineField({
          name: 'subLinkTwo',
          title: 'Link Two',
          type: 'string',
        }),
        defineField({
          name: 'subLinkThree',
          title: 'Link Three',
          type: 'string',
        }),
      ],
      group: 'customization',
    }),
  ],
})
