import { defineType, defineField } from "sanity";
// import { supportedLanguages } from "./supportedLanguages";
import { InlineElementIcon, LinkIcon } from "@sanity/icons";

export default defineType({
  name: "footerContent",
  title: "Footer",
  type: "document",
  // options: { collapsible: true, collapsed: false },
  groups: [
    { name: "group1", title: "Socials" },
    { name: "group2", title: "Navigate" },
    { name: "group3", title: "Contact" },
    { name: "group4", title: "Legal" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "News Letter Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "list1",
      title: "Socials",
      group: "group1",
      type: "footerList",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "list2",
      title: "Navigate",
      group: "group2",
      type: "footerList",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "list3",
      title: "Contact",
      group: "group3",
      type: "footerList",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "list4",
      title: "Legal",
      group: "group4",
      options: { collapsible: true, collapsed: true },
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "localeString",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          validation: (Rule) => Rule.required(),
          of: [{type:'linkDoc'},
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: "Footer Section" };
    },
  },
});
