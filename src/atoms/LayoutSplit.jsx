import React from "react";

export default function LayoutSplit({ children, right, center, className }) {
  // console.log(children)
  return (
    <div
      className={`flex w-full flex-col gap-12 sm:gap-4 md:flex-row md:gap-8 lg:gap-12 xl:gap-24  ${ className && className  }`} >
      {/* <section className='grid grid-cols-3 w-full '> */}
      <div
        className={` ${ right ? "w-full lg:w-3/5" : center ? "w-full" : "w-full lg:w-2/5" }`}
      >
        {/* <div className={`col-start-1  ${right ? 'col-span-3' : center ? 'col-span-5' : 'col-span-2'}`}> */}
        {center ? children : children[0]}
      </div>

      {!center ? (
        <div className={`${right ? "w-full lg:w-2/5" : "w-full lg:w-3/5"}`}>
          {/* <div className={`${right ? 'col-start-4 col-span-2' : 'col-start-3 col-span-3'}`}> */}
          {children[1]}
        </div>
      ) : null}
    </div>
  );
}
