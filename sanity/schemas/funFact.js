import { defineType, defineField } from "sanity";
// import { supportedLanguages } from "./supportedLanguages";

export default defineType({
  name: "funFact",
  title: "Fun Fact",
  type: "object",
  options: { collapsible: true, collapsed: true },

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "number",
      title: "Number",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "unit",
      title: "Unit",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Description",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Source URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
  ],
});
