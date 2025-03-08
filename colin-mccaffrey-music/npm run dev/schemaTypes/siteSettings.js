import {defineField, defineType} from 'sanity'
import {SiteInfo} from './components/SiteInfo'

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
      name: 'info',
      type: 'string',
      components: {
        field: SiteInfo,
      },
      readOnly: true,
    }),
    defineField({
      name: 'homeImage',
      title: 'Home Image',
      type: 'image',
      description:
        'This is the image that will greet visitors front-and-center when navigating to your home page.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'linkNames',
      title: 'Links',
      description:
        'The header links are divided into two sections. Links One through Three control the top row of links. Links Four through Six control the second row of links.',
      type: 'object',
      fields: [
        defineField({
          name: 'home',
          title: 'Home Link',
          type: 'string',
          description: 'The first link in the top row. This link is Home by default.',
        }),
        defineField({
          name: 'linkOne',
          title: 'Link One',
          type: 'string',
          description: 'The first link after Home in the top row. This link is BIO by default.',
        }),
        defineField({
          name: 'linkTwo',
          title: 'Link Two',
          type: 'string',
          description: 'The second link after Home in the top row. This link is STORE by default.',
        }),
        defineField({
          name: 'linkThree',
          title: 'Link Three',
          type: 'string',
          description:
            'The third link after Home in the top row. This link is BOOKING & CONTACT by default.',
        }),
        defineField({
          name: 'linkFour',
          title: 'Link Four',
          type: 'object',
          description:
            'The first link in the bottom row. This link is PERFORMER by default and has two sublinks.',
          fields: [
            defineField({
              name: 'mainLink',
              title: 'Main Link Name',
              type: 'string',
            }),
            defineField({
              name: 'subLinks',
              title: 'Sub Links',
              description: 'Subnavigation links for the first main link of the second row.',
              type: 'array',
              of: [
                defineField({
                  name: 'Sub Link',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Sub Link Title',
                      type: 'string',
                      description: 'Sublink beneath default PERFORMER Main Link',
                    }),
                    defineField({
                      name: 'url',
                      title: 'Sub Link URL',
                      type: 'string',
                      description:
                        'I will leave this as editable, but please do NOT change without consulting me.',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'linkFive',
          title: 'Link Five',
          type: 'object',
          description: 'The first link in the bottom row. This link is set to PRODUCER by default.',
          fields: [
            defineField({
              name: 'mainLink',
              title: 'Main Link Name',
              type: 'string',
            }),
            defineField({
              name: 'subLinks',
              title: 'Sub Links',
              type: 'array',
              of: [
                defineField({
                  name: 'Sub Link',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Sub Link Title',
                      type: 'string',
                      description:
                        'Changing this will change the title of the corresponding sublink underneath the default PRODUCER link.',
                    }),
                    defineField({
                      name: 'url',
                      title: 'Sub Link URL',
                      type: 'string',
                      description: 'Please do NOT change without consult.',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'linkSix',
          title: 'Link Six',
          type: 'object',
          description:
            'The last link in the bottom row. This link is set to SONGWRITER by default.',
          fields: [
            defineField({
              name: 'mainLink',
              title: 'Main Link Name',
              type: 'string',
            }),
            defineField({
              name: 'subLinks',
              title: 'Sub Links',
              type: 'array',
              of: [
                defineField({
                  name: 'Sub Link',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Sub Link Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'url',
                      title: 'Sub Link URL',
                      type: 'string',
                    }),
                  ],
                }),
              ],
            }),
          ],
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
      title: 'Bio Picture',
      type: 'image',
      description: 'This image will appear on the BIO page',
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
