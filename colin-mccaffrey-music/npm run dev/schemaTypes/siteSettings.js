import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: [
    {name: 'bio', title: 'Bio'},
    {name: 'bookingAndContact', title: 'Booking & Contact'},
  ],
  // Beginning of "Bio" field ----------------------------
  fields: [
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
      name: 'bookingAndContactInfo', // Reference to the Booking & Contact Info document
      title: 'Booking & Contact',
      type: 'reference', // Use reference type
      to: [{type: 'bookingAndContactInfo'}], // Reference to the bookingContactInfo document
      group: 'bookingAndContact',
    }),
  ],
})
