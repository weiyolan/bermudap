import { defineType, defineField } from "sanity";
// import { supportedLanguages } from "./supportedLanguages";
import {TriangleOutlineIcon} from "@sanity/icons";
import {UsersIcon} from '@sanity/icons'

export default defineType({
  title: "Network Members",
  name: "member",
  type: "document",
  icon: UsersIcon,
  options: { collapsible: true, collapsed: true },
  preview: {
    select: {
      name: 'name',
      func: 'func',
      media: 'altImage',
    },

    prepare(selection) {
      const { name, func, media } = selection
      return { title: name, subtitle: func?.en || 'loading..', media: media?.image }
    },
  },
  groups: [{name:'image',title:'Image'}],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "func",
      title: "Function",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Quote",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "altImage",
      title: "Image",
      group:'image',
      type: "altImage",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
