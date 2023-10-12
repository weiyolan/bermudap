import React from "react";
import { twMerge } from "tailwind-merge";

function Section({ id, children, className, cardSection, ...props }, ref) {
  // For now only normal section in use untill deleted

  // if (cardSection) {
  //   return (
  //     <div className={` mx-auto w-full px-0 lg:px-10  visible overflow-visible ${className ? className : ''}`}>
  //       {children}
  //     </div>
  //   )
  // }

  return (
    <section
      id={id}
      ref={ref}
      className={twMerge('relative mx-auto w-full h-fit max-w-6xl px-4 mobm:px-6 sm:px-12 lg:px-6  mt-12 sm:mt-24', `${className}`)}
      {...props}
    >
      {children}
    </section>
  );
}

export default React.forwardRef(Section)