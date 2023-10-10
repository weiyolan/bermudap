// import { usePageContext } from '@/utils/pageContext'
import Link from "next/link";
// import { useState } from 'react'
import { BsArrowRightShort } from "react-icons/bs";

const ArrowLink = ({
  text,
  to,
  ext,
  inherit,
  inText,
  tabIndex,
  title,
  className,
  containerClass,
}) => {
  // let [hovering, setHovering] = useState(false)
  // let { darkMode } = usePageContext();
  let darkMode = false;

  return (
    <Link
      tabIndex={tabIndex}
      className={`block group relative text-inherit fill-inherit decoration-inherit min-[460px]:whitespace-pre-wrap sm:whitespace-nowrap cursor-pointer ${
        containerClass && containerClass
      }  `}
      href={to}
      title={title}
      rel={ext ? "noopener noreferrer" : undefined}
      target={ext ? "_blank" : undefined}
    >
      <div
        className={`inline-flex items-center relative ${
          className && className
        }`}
      >
        <span className="align-middle">{text}</span>
        <Arrow />
      </div>
    </Link>
  );
};

export default ArrowLink;
function Arrow() {
  return (
    <span className=" align-middle flex text-inherit my-auto fill-inherit transition-transform duration-300 relative -mr-[1.5rem]">
      <BsArrowRightShort
        alt=""
        className={`duration-300 left-0 -translate-x-[100%] group-hover:translate-x-1/4 group-hover:scale-125 group-hover:opacity-100 group-focus-within:translate-x-1/4 group-focus-within:opacity-100 opacity-0  `}
      />
      <BsArrowRightShort
        alt=""
        className={`duration-300 left-0 -translate-x-[100%] group-hover:translate-x-full group-hover:scale-105 group-hover:opacity-0 group-focus:scale-105 group-focus:opacity-0 `}
      />
    </span>
  );
}
