import { defineField, defineType } from "sanity";
import { InlineElementIcon } from "@sanity/icons";

export default defineType({
  name: "card",
  title: "Value Card",
  type: "object",
  options: { collapsible: true, collapsed: true },
  icon: InlineElementIcon,

  fields: [
    defineField({
      name: "title",
      title: "Value Title",
      initialValue: {en:'Creativity',nl:'Creativity'},
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subTitle",
      title: "Subtitle",
      initialValue: {en:'A new concept. Every time.',nl:'Een nieuw concept naar jouw behoefte. Altijd.'},
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Description",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
  ],
  // preview: {
  //   prepare() {
  //     return { title: "Fun Facts" };
  //   },
  // },
});
