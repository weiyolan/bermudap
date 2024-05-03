// import {cn} from "@/lib/utils"
// import { localeType } from "@/sanity/lib/interface"
import { PortableText as DefaultPortableText } from "@portabletext/react"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
// import Typography from "./Typography"
// import Link from "next/link"
import ConditionalLink from "./ConditionalLink"

// export interface PortableTextProps extends React.HTMLAttributes<HTMLDivElement> {
//   locale: localeType
//   value: any
// }

export default function PortableText({ value, locale, ...props }) {
  return <DefaultPortableText value={value} components={components(locale)} {...props} />
}

const components = (locale) => {
  return {
    // types: {
    //   // normal:({children})=><Typography variant={'p'} affects={"withPMargin"}>{children}</Typography>,
    //   accordion: ({ value: { items } }) => (
    //     <Accordion type="single" collapsible className=" w-full ">
    //       {items.map((item, i) => (
    //         <AccordionItem key={item.title?.[locale] + i} value={`item-${i}`} className="border-nu-black/30">
    //           <AccordionTrigger>{item.title?.[locale]}</AccordionTrigger>
    //           <AccordionContent>{item.description?.[locale]}</AccordionContent>
    //         </AccordionItem>
    //       ))}
    //     </Accordion>
    //   ),
    // },

    list: {
      bullet: ({ children }) => <ul className="my-6 ml-12 list-disc [&>li]:mt-2">{children}</ul>,
    },
    block: {
      normal: ({ children }) => (
        <p className="font-raj font-normal text-base">
          {children}
        </p>
      ),
      small: ({ children }) => (
        <p className="font-raj font-normal text-sm">
          {children}
        </p>
      ),
      // subTitle: ({ children }) => (
      //   <Typography variant={"p"} affects={"subTitle"} className="text-nu-black">
      //     {children}
      //   </Typography>
      // ),
      blockquote: ({ children }) => {
        return (
          <blockquote className="border-brown/60 border-l-4 pl-4 [&:not(:first-child)]:mt-6">
            <p className="font-raj font-semibold italic">
              {children}
            </p>
          </blockquote>
        )
      },
    },
    marks: {
      // strong: ()=>{}
      // link? list?
      link: ({ children, text, value: { url } }) => {
        return (
          <ConditionalLink
            href={url}
            title={locale === "fr" ? `Allez vers le site de ${text}` : `Go to ${text}`}
            className="text-black font-raj hover:text-brown cursor-pointer underline "
          >
            {children}
          </ConditionalLink>
        )
      },
    },
  }
}
