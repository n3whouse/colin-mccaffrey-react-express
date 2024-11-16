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
        source: 'siteSettings',
        hotspot: 'true',
      },
      group: 'bio',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email().error('A valid email is required.'),
      group: 'bookingAndContact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (rule) => rule.required().min(1).error('A valid phone number is required'),
      group: 'bookingAndContact',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      group: 'bookingAndContact',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'text',
      group: 'bookingAndContact',
    }),
  ],
})
