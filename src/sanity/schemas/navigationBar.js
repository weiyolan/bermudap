import { defineType, defineField } from "sanity";
// import { supportedLanguages } from "./supportedLanguages";
import { InlineElementIcon } from "@sanity/icons";

export default defineType({
  name: "nav",
  title: "Navigation Bar",
  type: "document",
  fields: [
    defineField({
      name: "cta",
      title: "Big Button Text",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "links",
      title: "Buttons",
      type: "array",
      of: [{ type: "link" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: "Navigation Bar Section" };
    },
  },
});
