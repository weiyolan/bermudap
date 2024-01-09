import useGsap from "@/utils/useGsap";
import ArrowLink from "./ArrowLink";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import Line from "./Line";

export default function ButtonComp({ children, className, myKey, tabIndex, handleClick, ...props }) {
  let [hovering, setHovering] = useState(false);
  let [clicking, setClicking] = useState(false);
  const buttonRef = useRef();
  const lineRef = useRef();
  let ctx = useGsap();
  let darkMode = true;
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
    gsap.to(lineRef.current, {
      width: hovering ? "100%" : 0,
      borderColor:
        hovering
          ? darkMode
            ? "#FFF5EA"
            : "#000000"
          : "transparent",
      duration: 0.2,
      ease: 'expo.out',
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
      className={twMerge(`group relative max-w-fit cursor-pointer rounded-md  fill-white px-4 py-2 font-bel text-white `, className)}
      {...props}
    >
      {children}
      <Line ref={lineRef} className={`mx-auto w-0 border-transparent`} />
    </button>
  );
}
