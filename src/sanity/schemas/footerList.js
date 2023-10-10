import { defineType, defineField } from "sanity";
// import { supportedLanguages } from "./supportedLanguages";

export default defineType({
  title: "List",
  name: "footerList",
  type: "object",
  options: { collapsible: true, collapsed: true },
  groups: [{ name: "image", title: "Image" }],
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
      of: [{ type: "link" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
