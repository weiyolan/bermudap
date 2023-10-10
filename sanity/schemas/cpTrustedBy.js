import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export default defineType({
  name: 'cpTrustedBy',
  title: 'Trusted By Section',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'enabled', title: 'Publish Section', type: 'boolean', 
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title', title: 'Section Title', type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'partners', title: 'Partner Logos', type: 'array', of: [{ type: 'trustedByLogo' }],
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: 'Trusted By Section' }
    },
  },
})