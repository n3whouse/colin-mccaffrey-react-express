import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: [
    {name: 'bio', title: 'Bio'},
    {name: 'bookingAndContact', title: 'Booking & Contact'},
    {name: 'customization', title: 'Customization'},
  ],
  // Beginning of "Bio" field ----------------------------
  fields: [
    defineField({
      name: 'linkNames',
      title: 'Links',
      type: 'object',
      fields: [
        defineField({
          name: 'home',
          title: 'Home Link',
          type: 'string',
        }),
        defineField({
          name: 'linkOne',
          title: 'Link One',
          type: 'string',
        }),
        defineField({
          name: 'linkTwo',
          title: 'Link Two',
          type: 'string',
        }),
        defineField({
          name: 'linkThree',
          title: 'Link Three',
          type: 'string',
        }),
        defineField({
          name: 'linkFour',
          title: 'Link Four',
          type: 'string',
        }),
        defineField({
          name: 'linkFive',
          title: 'Link Five',
          type: 'string',
        }),
        defineField({
          name: 'linkSix',
          title: 'Link Six',
          type: 'string',
        }),
      ],
      group: 'customization',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required().min(1).error('Bio cannot be blank.'),
      group: 'bio',
    }),
    defineField({
      name: 'profilePicture',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'bio',
    }),
    defineField({
      name: 'bookingAndContactInfo',
      title: 'Booking & Contact',
      type: 'reference',
      to: [{type: 'bookingAndContactInfo'}],
      group: 'bookingAndContact',
    }),
  ],
})
