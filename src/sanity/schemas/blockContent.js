import { defineType, defineArrayMember } from "sanity";
// import { CustomBlockTitle } from "../lib/localeCustomTitle";

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  // components:{field:CustomBlockTitle},
  of: [
    defineArrayMember({
      type: "block",
      // components:{field:CustomBlockTitle},

      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: "Normal", value: "normal"},
        {title: "Small", value: "small"},
        // {title: "Subtitle", value: "subTitle"},
        // { title: "H1", value: "h1" },
        // { title: "H2", value: "h2" },
        // { title: "H3", value: "h3" },
        // { title: "H4", value: "h4" },
        {title: "Quote", value: "blockquote"},
      ],
      lists: [{title: "Bullet", value: "bullet"}],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          {title: "Strong", value: "strong"},
          {title: "Emphasis", value: "em"},
          {title: "Underline", value: "underline"},
        ],

        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "url",
                name: "url",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
              // {
              //   title: "Lien externe",
              //   name: "ext",
              //   type: "boolean",
              //   initialValue: false,
              // },
              // {
              //   title: "Titre",
              //   name: "title",
              //   type: "localeString",
              // },
            ],
            preview: {
              select: {url: "url"},
              prepare({url}) {
                // const {date, completion} = selection
                return {title: "Lien", subtitle: url}
              },
            },
          },
        ],
      },
    }),

    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.

    // defineArrayMember({
    //   type: "accordion",
    // }),

    // defineArrayMember({
    //   type: "image",
    //   options: { hotspot: true },
    //   fields: [
    //     {
    //       name: "alt",
    //       type: "string",
    //       title: "Alternative Text ",
    //     },
    //   ],
    // }),
  ],
})
