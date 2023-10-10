import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export default defineType({
  name: "cpNumbers",
  title: "Fun Facts Section",
  type: "document",
  icon: BlockElementIcon,
  groups: [
    {
      name: "fact1",
      title: "Fact 1",
      // options: { collapsible: true, collapsed: false }
    },
    {
      name: "fact2",
      title: "Fact 2",
      // options: { collapsible: true, collapsed: false }
    },
    {
      name: "fact3",
      title: "Fact 3",
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
      name: "fact1",
      title: "Fact 1",
      type: "funFact",
      group: "fact1",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fact2",
      title: "Fact 2",
      type: "funFact",
      group: "fact2",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fact3",
      title: "Fact 3",
      type: "funFact",
      group: "fact3",
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
