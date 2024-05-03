// import { cn } from "@/lib/utils";
import Link, {LinkProps} from "next/link"

// export type ConditionalLinkProps =
//   | ({
//       href?: never
//       title?: never
//       children?: React.ReactNode
//       openNewTab?: boolean
//       className?: string
//     } & React.ComponentPropsWithoutRef<"div">)
//   | ({
//       href: string
//       children?: React.ReactNode
//       title?: string
//       openNewTab?: boolean
//       className?: string
//     } & React.ComponentPropsWithoutRef<"a"> &
//       LinkProps)

// export interface ConditionalLinkType extends LinkProps {
//         linkProps: Cpond
//       }

export default function ConditionalLink({children, title, href, openNewTab, className, ...props}) {
  const isNewTab = openNewTab !== undefined ? openNewTab : href && !href.startsWith("/") && !href.startsWith("#")

  if (href === undefined) {
    return (
      <span className={"cursor-default " + className} {...props}>
        {children}
      </span>
    )
  } else if (!isNewTab) {
    return (
      <Link title={title && title} href={href} className={className} {...props}>
        {children}
      </Link>
    )
  } else {
    return (
      <Link title={title && title} target="_blank" rel="noopener noreferrer" href={href} {...props} className={className}>
        {children}
      </Link>
    )
  }
}
