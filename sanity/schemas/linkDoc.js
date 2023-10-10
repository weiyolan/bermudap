import { defineType, defineField } from "sanity";
// import { supportedLanguages } from "./supportedLanguages";
import { LinkIcon } from "@sanity/icons";

export default defineType({
  name: "linkDoc",
  title: "Document",
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
      title: "Document",
      type: "reference",
      to: [{ type: "legalDoc" }],
      validation: (Rule) =>
        Rule.required()
    }),
  ],
  preview: {
    select: {
      text: "text",
      // url: "url",
    },
    prepare(selection) {
      const { text } = selection;
      // return { title: text?.en ? `${text?.en} - url: ${url}` : "loading.." };
      return { title: text?.en  };
    },
  },
});
