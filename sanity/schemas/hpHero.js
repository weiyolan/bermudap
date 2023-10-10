import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";
import { supportedLanguages } from "../supportedLanguages";

export default defineType({
  name: "hpHero",
  title: "Hero Section",
  type: "document",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "altImage",
      title: "Main Image",
      type: "altImage",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: "Hero Section" };
    },
  },
});
