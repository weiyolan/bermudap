import { defineType, defineField } from "sanity";
// import { supportedLanguages } from "./supportedLanguages";
import { LinkIcon } from "@sanity/icons";

export default defineType({
  name: "link",
  title: "Link",
  type: "object",
  options: { collapsible: true, collapsed: true },
  icon: LinkIcon,
  fields: [
    defineField({
      name: "ext",
      title: "External",
      description: "Aanzetten als de link naar een externe site verwijst.",
      type: "boolean",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "localeString",
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
  preview: {
    select: {
      text: "text",
      url: "url",
    },
    prepare(selection) {
      const { text } = selection;
      // return { title: text?.en ? `${text?.en} - url: ${url}` : "loading.." };
      return { title: text?.en ? `${text?.en}` : "loading.." };
    },
  },
});
