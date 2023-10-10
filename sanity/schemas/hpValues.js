import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export default defineType({
  name: "hpValues",
  title: "Values Section",
  type: "document",
  icon: BlockElementIcon,
  groups: [
    {
      name: "val1",
      title: "Card One",
      // options: { collapsible: true, collapsed: false }
    },
    {
      name: "val2",
      title: "Card Two",
      // options: { collapsible: true, collapsed: false }
    },
    {
      name: "val3",
      title: "Card Three",
      // options: { collapsible: true, collapsed: false }
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "localeString",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "val1",
      group:'val1',
      title: "Card One",
      type: "card",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "val2",
      group: "val2",
      title: "Card Two",
      type: "card",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "val3",
      group: "val3",
      title: "Card Three",
      type: "card",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: "Fun Facts" };
    },
  },
});
