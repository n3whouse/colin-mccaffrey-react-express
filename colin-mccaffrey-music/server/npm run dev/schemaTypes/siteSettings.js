import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'bio', title: 'Bio'},
    {name: 'booking', title: 'Booking'},
  ],
  fields: [
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'object',
      fields: [
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
          validation: (rule) => rule.required().min(1).error('Bio cannot be blank.'),
        }),
        defineField({
          name: 'profilePicture',
          title: 'Profile Picture',
          type: 'image',
          options: {
            source: 'siteSettings',
            hotspot: 'true',
          },
        }),
      ],
    }),
    defineField({
      name: 'bookingAndContact',
      title: 'Booking & Contact',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (rule) => rule.required().email().error('A valid email is required.'),
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          validation: (rule) => rule.required().min(1).error('A valid phone number is required'),
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({
          name: 'address',
          title: 'Address',
          type: 'string',
        }),
        defineField({
          name: 'socialLinks',
          title: 'Social Links',
          type: 'array',
          of: [{type: 'url'}],
        }),
      ],
    }),
  ],
})
