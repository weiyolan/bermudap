// import { usePageContext } from "@/utils/pageContext";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function Line({ className }) {
  // let {darkMode} = usePageContext();
  let darkMode = false;
  return (
    <div
      className={twMerge('h-0 border rounded-xl', darkMode
        ? "border-primary"
        : "border-darkPrimary" + "w-full", className
      )}
    />
  );
}
