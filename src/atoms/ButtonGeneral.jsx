import useGsap from "@/utils/useGsap";
import ArrowLink from "./ArrowLink";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap/dist/gsap";

export default function ButtonGeneral({ text, to, className, myKey, tabIndex, handleClick, children, ...props }) {
  let [hovering, setHovering] = useState(false);
  let [clicking, setClicking] = useState(false);
  const buttonRef = useRef();
  let ctx = useGsap();

  useEffect(() => {
    buttonRef?.current !== undefined &&
      ctx.add(() => {
        gsap.to(buttonRef.current, {
          duration: 0.5,
          scale: hovering ? (clicking ? 0.95 : 1.05) : 1,
          transformOrigin: "50% 50%",
          ease: "elastic.out(1, 0.5)",
        });
      });
  }, [hovering, clicking]);

  return (
    <button
      ref={buttonRef}
      key={myKey}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setClicking(false);
      }}
      onClick={handleClick}
      onMouseDown={() => setClicking(true)}
      onMouseUp={() => setClicking(false)}
      tabIndex={tabIndex === undefined ? -1 : tabIndex}
      className={twMerge(`group relative max-w-fit cursor-pointer rounded-md bg-green fill-white px-4 py-2 font-bel text-white shadow-lg transition-shadow duration-200`, className)}
      {...props}
    >
      {children}
    </button>
  );
}
