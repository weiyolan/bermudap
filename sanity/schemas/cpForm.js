import { defineField, defineType } from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import { supportedLanguages } from '../supportedLanguages'

export default defineType({
  name: 'cpForm',
  title: 'Form Section',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'title', title: 'Section Title', type: 'localeString',
      // initialValue: ()=>{let obj = {}; supportedLanguages.forEach(lang=>{obj = {...obj, [lang]:'Get Your Experience'}}); return obj},
      validation: Rule => Rule.required()
    }),
   
  ],
  preview: {
  prepare() {
    return {title: 'Form Section'}
  },
},
})