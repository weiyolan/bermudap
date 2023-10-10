import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";
import { supportedLanguages } from "../supportedLanguages";

export default defineType({
  name: "hpNetwork",
  title: "Bermuda Network",
  type: "document",
  icon: BlockElementIcon,

  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    // We envision a world where photography is not just a means of capturing a moment, but a way of experiencing life's beauty. Through our lens, we want to inspire people to see the world in a new light, appreciate the little things in life, and cherish the
    
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: "Bermuda Network" };
    },
  },
});
