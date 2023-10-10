import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export default defineType({
  name: "hpCTA",
  title: "Call To Action",
  type: "document",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "title",
      title: "CTA Button Text",
      initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "localeString",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: "Call To Action" };
    },
  },
});
