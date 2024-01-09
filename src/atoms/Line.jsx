// import { usePageContext } from "@/utils/pageContext";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Line = forwardRef(
  function Line({ className }, ref) {
    // let {darkMode} = usePageContext();
    let darkMode = false;
    return (
      <div ref={ref}
        className={twMerge('h-0 border rounded-xl', darkMode
          ? "border-primary"
          : "border-darkPrimary" + "w-full", className
        )}
      />
    );
  })

export default Line