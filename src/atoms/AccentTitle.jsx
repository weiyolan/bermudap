import { usePageContext } from "@/utils/pageContext";

export default function AccentTitle({ text, className, style }) {
  // let {darkMode} =usePageContext();
  // console.log(darkMode)
  // ${small?'text-sm lg:text-base':
  return (
    <h3
      style={style}
      className={`font-bel inline-flex font-semibold text-black text-base lg:text-lg mb-4 mt-2 ${
        className && className
      }`}
    >
      {text}
    </h3>
  );
}
