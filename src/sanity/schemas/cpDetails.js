import { defineField, defineType } from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export default defineType({
  name: 'cpDetails',
  title: 'Contact Details Section',
  type: 'document',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'address',
      title: 'Address',
    },
    {
      name: 'details',
      title: 'Contact Details',
    }
  ],  fields: [
    defineField({
      name: 'title', title: 'Section Title', type: 'localeString',
      validation: Rule => Rule.required()
    }),
    // defineField({
    //   name: 'subTitle', title: 'Intro Title', type: 'localeString',
    //   validation: Rule => Rule.required()
    // }),
    defineField({
      name: 'text', title: 'Intro Text', type: 'localeText',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'altImage', title: 'Image', type: 'altImage',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'companyName', title: 'Company Name', type: 'string', group:'details',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'phone', title: 'Phone Number', type: 'string', group:'details',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email', title: 'E-mail', type: 'string', group:'details',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'vat', title: 'VAT', type: 'string', group:'details',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'address1', title: 'Address Line 1', type: 'string',group:'address',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'address2', title: 'Address Line 2', type: 'string',group:'address',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'country', title: 'Country', type: 'string',group:'address',
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
  prepare() {
    return {title: 'Contact Details Section'}
  },
},
})