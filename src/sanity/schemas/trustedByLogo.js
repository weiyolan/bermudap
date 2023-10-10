import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'trustedByLogo',
  title: 'Logo',
  type: 'object',
  fields: [
    defineField({
      name: 'name', title: 'Name', type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image', title: 'Image', type: 'image',
      options: {
        hotspot: false,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'link', title: 'Official webpage', type: 'string',
      validation: Rule => Rule.required()
    })
  ]
})
